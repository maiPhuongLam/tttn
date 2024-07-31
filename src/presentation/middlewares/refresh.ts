import { verifyRefreshTokenFromRequest } from 'src/shared/utils';
import { Request, Response, NextFunction } from 'express';

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  const decode = verifyRefreshTokenFromRequest(req);
  req.userId = decode.id;
  req.role = decode.role;
  next();
};
