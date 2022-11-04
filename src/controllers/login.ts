import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, VALID_PASSWORD, VALID_USERNAME } from '../config';
import { isValidLoginJSON } from '../middleware/login-json-validation';

const login = (req: Request, res: Response, next: NextFunction): void => {
  if (isValidLoginJSON(req.body)) {
    if (req.body.username === VALID_USERNAME && req.body.password === VALID_PASSWORD) {
      const token = jwt.sign(req.body, TOKEN_SECRET);
      res.status(200).json({ token: token });
    } else {
      next(createHttpError(401, 'invalid login credential'));
    }
  } else {
    next(createHttpError(500, 'internal server error'));
  }
};

export { login };
