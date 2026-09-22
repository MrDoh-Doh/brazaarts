import type { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string, public readonly details?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({ error: error.message, details: error.details });
  }

  console.error(error);
  return response.status(500).json({ error: 'Internal server error' });
}
