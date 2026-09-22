import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { createListing, deleteListing, getListing, hireCreator, listListings, updateListing } from './controller';
import { createListingSchema, updateListingSchema } from './schema';

export const listingRouter = Router();
listingRouter.get('/', asyncHandler(listListings));
listingRouter.get('/:id', asyncHandler(getListing));
listingRouter.post('/', authGuard, validate(createListingSchema), asyncHandler(createListing));
listingRouter.patch('/:id', authGuard, validate(updateListingSchema), asyncHandler(updateListing));
listingRouter.delete('/:id', authGuard, asyncHandler(deleteListing));
listingRouter.post('/:id/hire', authGuard, asyncHandler(hireCreator));
