import { Request, Response, NextFunction } from 'express';
import { User } from 'src/infrastructure/database/schemas';

export const roles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.role;

    if (!roles.includes(role)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You do not have the necessary permissions' });
    }

    next();
  };
};
