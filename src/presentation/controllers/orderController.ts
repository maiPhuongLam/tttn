import { inject, injectable } from 'inversify';
import { CheckoutDto, IOrderService } from 'src/domain/services';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { Request, Response, NextFunction } from 'express';
import logger from 'src/infrastructure/logger';
@injectable()
export class OrderController {
  constructor(@inject(INTERFACE_NAME.OrderService) private orderService: IOrderService) {}
  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      logger.error(111);
      const userId = req.userId;
      const data = await this.orderService.historyCheckout(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const data = await this.orderService.getCustomerOrders(userId);
      const response = {
        success: true,
        message: 'Get orders of customer is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      throw error;
    }
  }

  async getDetailsOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.orderService.getOneOder(+id);
      const response = {
        success: true,
        message: 'Get orders detail of customer is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.orderService.getOrders('');
      const response = {
        success: true,
        message: 'Get orders is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      throw error;
    }
  }

  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const body = <CheckoutDto>req.body;
      const userId = req.userId;
      const data = await this.orderService.checkout(body, userId);
      const response = {
        success: true,
        message: 'Checkout is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error(`Error checkout ${error}`);
      next(error);
    }
  }

  async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      let signature = req.headers['stripe-signature'] as string;
      const body = req.rawBody!;
      const data = await this.orderService.webhookHandler(body, signature);
      const response = {
        success: true,
        message: 'webhook handler is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error(`Error webhook ${error}`);
      next(error);
    }
  }
}
