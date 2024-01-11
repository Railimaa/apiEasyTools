/* eslint-disable no-shadow */
import path from 'path';

import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

export function handleImageUpload(req: Request, res: Response, next: NextFunction) {
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, callback) {
        callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
      },
      filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

  upload.single('imagePath')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error in file upload' });
    }
    return next();
  });
}
