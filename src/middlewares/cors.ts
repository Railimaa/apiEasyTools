import { NextFunction, Request, Response } from 'express';

export function cors(req: Request, res: Response, next: NextFunction) {
  const allowedOrigins = [
    'http://localhost:5173',
  ];

  const origin = req.headers.origin as string | undefined;

  if (origin) {
    const isAllowed = allowedOrigins.includes(origin);

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Max-Age', '10');
    }
  }

  return next();
}
