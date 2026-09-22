import type { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: request.body, query: request.query, params: request.params });
    if (!result.success) return next(result.error);
    request.body = result.data.body;
    request.query = result.data.query as Request['query'];
    request.params = result.data.params as Request['params'];
    return next();
  };
}
