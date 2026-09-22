import crypto from 'node:crypto';
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type AccessTokenPayload = JwtPayload & { sub: string; email: string; type: 'access' };

export function signAccessToken(user: { id: string; email: string }) {
  return jwt.sign({ sub: user.id, email: user.email, type: 'access' }, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL as SignOptions['expiresIn'],
  });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId, type: 'refresh' }, env.REFRESH_SECRET, {
    expiresIn: `${env.REFRESH_TOKEN_TTL_DAYS}d` as SignOptions['expiresIn'],
  });
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
  if (payload.type !== 'access' || typeof payload.sub !== 'string') throw new Error('Invalid access token');
  return payload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, env.REFRESH_SECRET) as JwtPayload & { sub: string; type: string };
  if (payload.type !== 'refresh' || typeof payload.sub !== 'string') throw new Error('Invalid refresh token');
  return payload;
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
