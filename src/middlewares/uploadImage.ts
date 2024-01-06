/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import path from 'node:path';

import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

export function uploadImage(req: Request, res: Response, next: NextFunction) {
  try {
    multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          callback(null, path.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    });

    next();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
