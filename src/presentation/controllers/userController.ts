import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { DB } from 'src/infrastructure/database/connect';
import { addresses, customers, users } from 'src/infrastructure/database/schemas';
import { BaseResponse } from 'src/shared/types/baseResponse';
import { eq } from 'drizzle-orm';

@injectable()
export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DB.select()
        .from(users)
        .innerJoin(addresses, eq(addresses.id, users.addressId))
        .execute();
      return res.status(200).json(BaseResponse.success('Get all user', data));
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const [data] = await DB.select()
        .from(users)
        .where(eq(users.id, +req.params.id))
        .innerJoin(addresses, eq(addresses.id, users.addressId))
        .execute();
      return res.status(200).json(BaseResponse.success('Get user', data));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await DB.delete(users).where(eq(users.id, +req.params.id)).returning().execute();
      return res.status(200).json(BaseResponse.success('Get user', data));
    } catch (error) {
      next(error);
    }
  }
}
