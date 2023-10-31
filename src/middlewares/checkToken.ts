/* eslint-disable no-shadow, no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
  }
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const secret = env.jwtSecret;

    const payload = jwt.verify(token, secret) as { sub: string };

    req.userId = payload.sub;

    return next();
  } catch {
    return res.status(500).json({ message: 'Invalid Token' });
  }
}
