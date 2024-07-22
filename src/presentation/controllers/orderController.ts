import { inject, injectable } from 'inversify';
import { IOrderService } from 'src/domain/services';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { Request, Response, NextFunction } from 'express';
import logger from 'src/infrastructure/logger';
@injectable()
export class OrderController {
  constructor(@inject(INTERFACE_NAME.OrderService) private orderService: IOrderService) {}

  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const userId = req.userId;
      const data = await this.orderService.checkout(body, userId);
      const response = {
        success: true,
        message: 'Checkout success',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      let signature = req.headers["stripe-signature"] as string;
      const body = req.rawBody!
      console.log(body)
      console.log(signature)
      const data = await this.orderService.webhookHandler(body, signature);
      const response = {
        success: true,
        message: 'webhook handler success',
        data,
      };
      return res.status(STATUS_CODES.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  } 
}
