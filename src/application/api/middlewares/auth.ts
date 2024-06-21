import { Request, Response, NextFunction } from 'express';
import { verifyAccessTokenFromRequest } from 'src/shared/utils';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const decode = verifyAccessTokenFromRequest(req);
  req.userId = decode.id;
  req.role = decode.role;
  next();
};
