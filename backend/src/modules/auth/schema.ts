import { z } from 'zod';

const email = z.string().trim().email().transform((value) => value.toLowerCase());
const password = z.string().min(8).max(72);

export const signupSchema = z.object({
  body: z.object({ email, password, displayName: z.string().trim().min(2).max(80) }),
  query: z.record(z.unknown()).optional(),
  params: z.record(z.unknown()).optional(),
});

export const loginSchema = z.object({
  body: z.object({ email, password }),
  query: z.record(z.unknown()).optional(),
  params: z.record(z.unknown()).optional(),
});

export const refreshSchema = z.object({
  body: z.object({ refreshToken: z.string().min(20).optional() }),
  query: z.record(z.unknown()).optional(),
  params: z.record(z.unknown()).optional(),
});
