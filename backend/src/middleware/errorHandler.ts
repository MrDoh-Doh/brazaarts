import { z } from 'zod';
import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string, public readonly details?: unknown) { super(message); this.name = 'ApiError'; }
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ApiError) return response.status(error.statusCode).json({ error: error.message, details: error.details });
  if (error instanceof z.ZodError) return response.status(400).json({ error: 'Validation failed', details: error.flatten() });
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') return response.status(409).json({ error: 'A record with that value already exists' });
  console.error(error);
  return response.status(500).json({ error: 'Internal server error' });
}
