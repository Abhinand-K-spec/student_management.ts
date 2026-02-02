import { Request, Response, NextFunction } from 'express';
import { HttpStatus, ErrorMessage } from '../utils/enums';

interface MongoError extends Error {
  code?: number;
}

export const errorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`Error: ${err.message}`);

  if (err.name === 'ValidationError') {
    res.status(HttpStatus.BAD_REQUEST).render('error', {
      title: 'Validation Error',
      message: err.message,
      error: err
    });
    return;
  }

  // Handle DB unique constraint violations
  if (err.code === 11000) {
    res.status(HttpStatus.BAD_REQUEST).render('error', {
      title: 'Duplicate Error',
      message: ErrorMessage.RECORD_ALREADY_EXISTS,
      error: err
    });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).render('error', {
    title: 'Server Error',
    message: ErrorMessage.SOMETHING_WENT_WRONG,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

