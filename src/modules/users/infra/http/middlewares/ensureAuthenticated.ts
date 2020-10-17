import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const { sub } = decoded as TokenPayload;
    req.user = { id: sub };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
