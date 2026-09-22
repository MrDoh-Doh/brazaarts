import type { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { ApiError } from '../../middleware/errorHandler';
import type { AuthenticatedRequest } from '../../middleware/authGuard';

function currentUserId(request: Request) {
  return (request as AuthenticatedRequest).user.id;
}

const listingInclude = {
  tags: true,
  media: true,
  creator: { include: { user: { select: { id: true, displayName: true, avatarUrl: true } } } },
} as const;

export async function listListings(request: Request, response: Response) {
  const { q, tag, category, availability, minPrice, maxPrice, minRating, page = '1', limit = '20' } = request.query;
  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(limit) || 20));
  const where = {
    status: 'PUBLISHED',
    ...(q ? { OR: [{ title: { contains: String(q), mode: 'insensitive' as const } }, { description: { contains: String(q), mode: 'insensitive' as const } }] } : {}),
    ...(tag ? { tags: { some: { name: { equals: String(tag), mode: 'insensitive' as const } } } } : {}),
    ...(category ? { category: String(category) } : {}),
    ...(availability ? { availability: String(availability) } : {}),
    ...(minPrice || maxPrice ? { price: { ...(minPrice ? { gte: Number(minPrice) } : {}), ...(maxPrice ? { lte: Number(maxPrice) } : {}) } } : {}),
    ...(minRating ? { creator: { ratingAverage: { gte: Number(minRating) } } } : {}),
  };
  const [listings, total] = await prisma.$transaction([
    prisma.listing.findMany({ where, include: listingInclude, orderBy: { createdAt: 'desc' }, skip: (pageNumber - 1) * pageSize, take: pageSize }),
    prisma.listing.count({ where }),
  ]);
  return response.json({ listings, pagination: { page: pageNumber, limit: pageSize, total, pages: Math.ceil(total / pageSize) } });
}

export async function getListing(request: Request, response: Response) {
  const listing = await prisma.listing.findUnique({ where: { id: request.params.id }, include: listingInclude });
  if (!listing) throw new ApiError(404, 'Listing not found');
  return response.json({ listing });
}

export async function createListing(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: currentUserId(request) } });
  if (!profile) throw new ApiError(400, 'Create a creator profile before publishing a listing');
  const { tags = [], ...data } = request.body;
  const listing = await prisma.listing.create({ data: { ...data, creatorId: profile.id, tags: { connectOrCreate: tags.map((name: string) => ({ where: { name }, create: { name } })) } }, include: listingInclude });
  return response.status(201).json({ listing });
}

export async function updateListing(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: currentUserId(request) } });
  const existing = await prisma.listing.findUnique({ where: { id: request.params.id } });
  if (!existing || !profile || existing.creatorId !== profile.id) throw new ApiError(404, 'Listing not found');
  const { tags, ...data } = request.body;
  const listing = await prisma.listing.update({ where: { id: existing.id }, data: { ...data, ...(tags ? { tags: { set: [], connectOrCreate: tags.map((name: string) => ({ where: { name }, create: { name } })) } } : {}) }, include: listingInclude });
  return response.json({ listing });
}

export async function deleteListing(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: currentUserId(request) } });
  const existing = await prisma.listing.findUnique({ where: { id: request.params.id } });
  if (!existing || !profile || existing.creatorId !== profile.id) throw new ApiError(404, 'Listing not found');
  await prisma.listing.delete({ where: { id: existing.id } });
  return response.status(204).send();
}

export async function hireCreator(request: Request, response: Response) {
  const listing = await prisma.listing.findUnique({ where: { id: request.params.id }, select: { creator: { select: { userId: true } } } });
  if (!listing) throw new ApiError(404, 'Listing not found');
  if (listing.creator.userId === currentUserId(request)) throw new ApiError(400, 'You cannot hire yourself');
  const conversation = await prisma.conversation.create({ data: { participants: { connect: [{ id: currentUserId(request) }, { id: listing.creator.userId }] } }, include: { participants: { select: { id: true, displayName: true, avatarUrl: true } } } });
  return response.status(201).json({ conversation });
}
