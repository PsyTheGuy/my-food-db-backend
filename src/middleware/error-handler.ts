import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.statusCode).json({ error: err.message });
};

export { errorHandler };
