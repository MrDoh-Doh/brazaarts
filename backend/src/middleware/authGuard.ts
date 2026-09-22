import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { ApiError } from './errorHandler';

export type AuthenticatedRequest = Request & { user: { id: string; email: string } };

export function authGuard(request: Request, _response: Response, next: NextFunction) {
  const header = request.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) return next(new ApiError(401, 'Authentication required'));

  try {
    const payload = verifyAccessToken(token);
    (request as AuthenticatedRequest).user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired access token'));
  }
}
