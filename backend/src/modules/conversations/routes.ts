import { Router } from 'express';
import { prisma } from '../../db/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { authGuard } from '../../middleware/authGuard';
import type { AuthenticatedRequest } from '../../middleware/authGuard';

export const conversationRouter = Router();
conversationRouter.get('/', authGuard, asyncHandler(async (request, response) => {
  const userId = (request as AuthenticatedRequest).user.id;
  const conversations = await prisma.conversation.findMany({ where: { participants: { some: { id: userId } } }, orderBy: { updatedAt: 'desc' }, include: { participants: { select: { id: true, displayName: true, avatarUrl: true } }, messages: { orderBy: { createdAt: 'desc' }, take: 1 } } });
  return response.json({ conversations });
}));
