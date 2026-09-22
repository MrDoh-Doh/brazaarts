import { z } from 'zod';

const shared = { query: z.record(z.unknown()).optional(), params: z.record(z.unknown()).optional() };
export const profileSchema = z.object({
  body: z.object({
    bio: z.string().max(2000).optional(),
    skills: z.array(z.string().trim().min(1).max(60)).max(30).default([]),
    availability: z.string().max(120).optional(),
    portfolioLinks: z.array(z.string().url()).max(30).default([]),
  }),
  ...shared,
});
