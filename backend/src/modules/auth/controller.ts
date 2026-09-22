import type { Request, Response } from 'express';
import { prisma } from '../../db/prisma';
import { ApiError } from '../../middleware/errorHandler';
import { hashPassword, comparePassword } from '../../utils/password';
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { env } from '../../config/env';
import type { AuthenticatedRequest } from '../../middleware/authGuard';

const refreshCookie = 'bazaarts_refresh_token';

function setRefreshCookie(response: Response, token: string) {
  response.cookie(refreshCookie, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth',
  });
}

async function issueTokens(user: { id: string; email: string }) {
  const refreshToken = signRefreshToken(user.id);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000),
    },
  });
  return { accessToken: signAccessToken(user), refreshToken };
}

function publicUser(user: { id: string; email: string; displayName: string; avatarUrl: string | null }) {
  return { id: user.id, email: user.email, displayName: user.displayName, avatarUrl: user.avatarUrl };
}

export async function signup(request: Request, response: Response) {
  const { email, password, displayName } = request.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ApiError(409, 'An account with that email already exists');

  const user = await prisma.user.create({
    data: { email, displayName, passwordHash: await hashPassword(password) },
  });
  const tokens = await issueTokens(user);
  setRefreshCookie(response, tokens.refreshToken);
  return response.status(201).json({ user: publicUser(user), accessToken: tokens.accessToken });
}

export async function login(request: Request, response: Response) {
  const { email, password } = request.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = await issueTokens(user);
  setRefreshCookie(response, tokens.refreshToken);
  return response.json({ user: publicUser(user), accessToken: tokens.accessToken });
}

export async function refresh(request: Request, response: Response) {
  const token = request.cookies[refreshCookie] ?? request.body.refreshToken;
  if (!token) throw new ApiError(401, 'Refresh token required');

  try {
    const payload = verifyRefreshToken(token);
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(token) } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date() || stored.userId !== payload.sub) {
      throw new Error('Refresh token revoked');
    }

    await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
    const user = await prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) throw new Error('User not found');
    const tokens = await issueTokens(user);
    setRefreshCookie(response, tokens.refreshToken);
    return response.json({ user: publicUser(user), accessToken: tokens.accessToken });
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
}

export async function logout(request: Request, response: Response) {
  const token = request.cookies[refreshCookie] ?? request.body.refreshToken;
  if (token) await prisma.refreshToken.updateMany({ where: { tokenHash: hashToken(token), revokedAt: null }, data: { revokedAt: new Date() } });
  response.clearCookie(refreshCookie, { httpOnly: true, sameSite: 'lax', path: '/api/v1/auth' });
  return response.status(204).send();
}

export async function me(request: Request, response: Response) {
  const user = await prisma.user.findUnique({ where: { id: (request as AuthenticatedRequest).user.id } });
  if (!user) throw new ApiError(404, 'User not found');
  return response.json({ user: publicUser(user) });
}
