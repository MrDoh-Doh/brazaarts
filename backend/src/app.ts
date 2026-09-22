import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './modules/auth/routes';
import { listingRouter } from './modules/listings/routes';
import { profileRouter } from './modules/profiles/routes';
import { tagRouter } from './modules/tags/routes';
import { searchRouter } from './modules/search/routes';
import { conversationRouter } from './modules/conversations/routes';
import { messageRouter } from './modules/messages/routes';
import { mediaRouter } from './modules/media/routes';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'bazaarts-backend' }));
app.get('/api/v1/health', (_request, response) => response.json({ status: 'ok', version: 'v1' }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/media', mediaRouter);

app.use((_request, response) => response.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);
