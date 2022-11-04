import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

const tokenValidation = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    next(createHttpError(401, 'unauthorized'));
  } else {
    const method: string = req.headers.authorization.split(' ')[0];
    const token: string = req.headers.authorization.split(' ')[1];

    if (method === 'Bearer' && token) {
      try {
        jwt.verify(token, TOKEN_SECRET);
        next();
      } catch {
        next(createHttpError(401, 'unauthorized'));
      }
    } else {
      next(createHttpError(401, 'unauthorized'));
    }
  }
};

export { tokenValidation };
