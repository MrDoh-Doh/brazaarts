import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { authGuard } from '../../middleware/authGuard';
import { validate } from '../../middleware/validate';
import { getMyProfile, getProfile, upsertMyProfile } from './controller';
import { profileSchema } from './schema';

export const profileRouter = Router();
profileRouter.get('/me', authGuard, asyncHandler(getMyProfile));
profileRouter.put('/me', authGuard, validate(profileSchema), asyncHandler(upsertMyProfile));
profileRouter.get('/:id', asyncHandler(getProfile));
