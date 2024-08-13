import { inject, injectable } from 'inversify';
import { StatisticService } from 'src/application/services';
import { Request, Response, NextFunction } from 'express';
import { RevenueType } from 'src/shared/enums';
import { AnyArn } from 'aws-sdk/clients/groundstation';
import { DB } from 'src/infrastructure/database/connect';
import { sql } from 'drizzle-orm'
import { warranties } from 'src/infrastructure/database/schemas/warranty';
import { orders } from 'src/infrastructure/database/schemas';
import { union } from 'drizzle-orm/pg-core';
@injectable()
export class StatisticController {
  constructor(@inject('StatisticService') private statisticService: StatisticService) {}

  async getDailyStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const type = <RevenueType>req.query.type;
      const payload = req.query;
      const data = await this.statisticService.getStastic(type, payload);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }


}
