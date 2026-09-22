import { Router } from 'express';
import { prisma } from '../../db/prisma';
import { asyncHandler } from '../../utils/asyncHandler';

export const searchRouter = Router();
searchRouter.get('/', asyncHandler(async (request, response) => {
  const query = String(request.query.q ?? '').trim();
  if (!query) return response.json({ listings: [], creators: [] });
  const [listings, creators] = await prisma.$transaction([
    prisma.listing.findMany({ where: { status: 'PUBLISHED', OR: [{ title: { contains: query, mode: 'insensitive' } }, { description: { contains: query, mode: 'insensitive' } }] }, take: 20, include: { tags: true } }),
    prisma.creatorProfile.findMany({ where: { OR: [{ bio: { contains: query, mode: 'insensitive' } }, { skills: { has: query } }] }, take: 20, include: { user: { select: { id: true, displayName: true, avatarUrl: true } } } }),
  ]);
  return response.json({ listings, creators });
}));
