import express from 'express';
import multer from 'multer';
import { authGuard } from '../middleware/authGuard';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../db/prisma';
import { ApiError } from '../middleware/errorHandler';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export const mediaRouter = express.Router();

mediaRouter.post('/upload', authGuard, upload.single('file'), asyncHandler(async (request, response) => {
  const file = request.file;
  if (!file) throw new ApiError(400, 'No file uploaded');

  const asset = await prisma.mediaAsset.create({
    data: {
      ownerId: request.user.id,
      url: `https://localhost:4000/uploads/${Date.now()}-${file.originalname}`,
      storageKey: `${Date.now()}-${file.originalname}`,
      mimeType: file.mimetype,
      size: file.size,
    },
  });

  return response.status(201).json({ asset });
}));
