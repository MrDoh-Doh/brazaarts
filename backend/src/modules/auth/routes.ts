import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middleware/validate';
import { authGuard } from '../../middleware/authGuard';
import { login, logout, me, refresh, signup } from './controller';
import { loginSchema, refreshSchema, signupSchema } from './schema';

export const authRouter = Router();
authRouter.post('/signup', validate(signupSchema), asyncHandler(signup));
authRouter.post('/login', validate(loginSchema), asyncHandler(login));
authRouter.post('/refresh', validate(refreshSchema), asyncHandler(refresh));
authRouter.post('/logout', asyncHandler(logout));
authRouter.get('/me', authGuard, asyncHandler(me));
