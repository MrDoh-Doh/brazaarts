import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { prisma } from '../../db/prisma';

export const tagRouter = Router();
tagRouter.get('/', asyncHandler(async (_request, response) => {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' }, take: 100 });
  return response.json({ tags });
}));
