import { Router } from 'express';
import { prisma } from '../../db/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { authGuard } from '../../middleware/authGuard';
import type { AuthenticatedRequest } from '../../middleware/authGuard';

export const messageRouter = Router();

messageRouter.get('/:conversationId', authGuard, asyncHandler(async (request, response) => {
  const conversationId = request.params.conversationId;
  const page = Math.max(1, Number(request.query.page ?? 1));
  const limit = Math.min(50, Math.max(1, Number(request.query.limit ?? 20)));

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
    include: { sender: { select: { id: true, displayName: true, avatarUrl: true } } },
  });

  return response.json({ messages: messages.reverse() });
}));

messageRouter.post('/:conversationId', authGuard, asyncHandler(async (request, response) => {
  const { content } = request.body as { content: string };
  if (!content || !content.trim()) return response.status(400).json({ error: 'Message content required' });

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: request.params.conversationId,
      participants: { some: { id: (request as AuthenticatedRequest).user.id } },
    },
  });

  if (!conversation) return response.status(404).json({ error: 'Conversation not found' });

  const message = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: (request as AuthenticatedRequest).user.id,
      content: content.trim(),
    },
    include: { sender: { select: { id: true, displayName: true, avatarUrl: true } } },
  });

  await prisma.conversation.update({ where: { id: conversation.id }, data: { updatedAt: new Date() } });
  return response.status(201).json({ message });
}));

messageRouter.patch('/:conversationId/read', authGuard, asyncHandler(async (request, response) => {
  const userId = (request as AuthenticatedRequest).user.id;
  await prisma.message.updateMany({
    where: { conversationId: request.params.conversationId, senderId: { not: userId }, readAt: null },
    data: { readAt: new Date() },
  });
  return response.json({ ok: true });
}));
