import { z } from 'zod';

const shared = { query: z.record(z.unknown()).optional(), params: z.record(z.unknown()).optional() };
const tags = z.array(z.string().trim().min(1).max(40)).max(20).default([]);
const listingFields = {
  title: z.string().trim().min(3).max(140),
  description: z.string().trim().min(10).max(10000),
  category: z.string().trim().max(80).optional(),
  price: z.coerce.number().nonnegative(),
  currency: z.string().length(3).default('USD'),
  deliveryDays: z.coerce.number().int().positive().optional(),
  availability: z.string().max(120).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  portfolioLinks: z.array(z.string().url()).max(30).default([]),
  tags,
};
export const createListingSchema = z.object({ body: z.object(listingFields), ...shared });
export const updateListingSchema = z.object({ body: z.object(listingFields).partial(), ...shared });
