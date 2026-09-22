import type { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { ApiError } from '../../middleware/errorHandler';
import type { AuthenticatedRequest } from '../../middleware/authGuard';

function userId(request: Request) {
  return (request as AuthenticatedRequest).user.id;
}

export async function getProfile(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.findUnique({
    where: { id: request.params.id },
    include: { user: { select: { id: true, displayName: true, avatarUrl: true } }, listings: { where: { status: 'PUBLISHED' }, include: { tags: true } } },
  });
  if (!profile) throw new ApiError(404, 'Creator profile not found');
  return response.json({ profile });
}

export async function getMyProfile(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.findUnique({ where: { userId: userId(request) }, include: { listings: true } });
  return response.json({ profile });
}

export async function upsertMyProfile(request: Request, response: Response) {
  const profile = await prisma.creatorProfile.upsert({
    where: { userId: userId(request) },
    update: request.body,
    create: { userId: userId(request), ...request.body },
  });
  return response.json({ profile });
}
