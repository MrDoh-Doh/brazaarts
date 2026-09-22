import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './modules/auth/routes';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'bazaarts-backend' }));
app.get('/api/v1/health', (_request, response) => response.json({ status: 'ok', version: 'v1' }));
app.use('/api/v1/auth', authRouter);
app.use((_request, response) => response.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);
