import { inject, injectable } from 'inversify';
import { CheckoutDto, IOrderService } from 'src/domain/services';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';
import { Request, Response, NextFunction } from 'express';
import logger from 'src/infrastructure/logger';
import { DB } from 'src/infrastructure/database/connect';
import {
  customers,
  orderDetails,
  orders,
  productItems,
  products,
  productSerials,
  users,
} from 'src/infrastructure/database/schemas';
import { eq } from 'drizzle-orm';
import { BaseResponse } from 'src/shared/types/baseResponse';
type CombinedOrder = {
  id: number;
  totalPrice: string;
  orderDate: string;
  orderStatus: string;
  customer_name: string;
  customer_email: string;
  details: {
    product: string;
    storage: string;
    color: string;
    quantity: number;
  }[];
};
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

  async getAllOrders2(req: Request, res: Response, next: NextFunction) {
    try {
      const query = DB.select({
        id: orders.id,
        totalPrice: orders.totalPrice,
        orderDate: orders.orderDate,
        orderStatus: orders.orderStatus,
        customer_name: users.name,
        customer_email: users.email,
        product: products.name,
        storage: productItems.storage,
        color: productItems.color,
      })
        .from(orders)
        .$dynamic();

      query
        .innerJoin(orderDetails, eq(orderDetails.orderId, orders.id))
        .innerJoin(customers, eq(customers.id, orders.customerId))
        .innerJoin(users, eq(users.id, customers.userId))
        .innerJoin(productSerials, eq(productSerials.serialNumber, orderDetails.productSerial))
        .innerJoin(productItems, eq(productItems.id, productSerials.productItemId))
        .innerJoin(products, eq(products.id, productItems.productId));

      const data = await query;
      return res.status(STATUS_CODES.OK).json(BaseResponse.success('Get all order success', data));
    } catch (error) {
      next(error);
    }
  }

  async getOrderDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const orderMap = new Map<number, CombinedOrder>();
      const { id } = req.params;
      const query = DB.select({
        id: orderDetails.orderId,
        totalPrice: orders.totalPrice,
        orderDate: orders.orderDate,
        orderStatus: orders.orderStatus,
        customer_name: users.name,
        customer_email: users.email,
        product: products.name,
        storage: productItems.storage,
        color: productItems.color,
        quantity: orderDetails.quantity,
      })
        .from(orderDetails)
        .where(eq(orderDetails.orderId, +id))
        .$dynamic();

      query
        .innerJoin(orders, eq(orders.id, orderDetails.orderId))
        .innerJoin(customers, eq(customers.id, orders.customerId))
        .innerJoin(users, eq(users.id, customers.userId))
        .innerJoin(productSerials, eq(productSerials.serialNumber, orderDetails.productSerial))
        .innerJoin(productItems, eq(productItems.id, productSerials.productItemId))
        .innerJoin(products, eq(products.id, productItems.productId));

      const data = await query;
      data.forEach((order) => {
        if (!orderMap.has(order.id)) {
          orderMap.set(order.id, {
            id: order.id,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            orderStatus: order.orderStatus,
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            details: [],
          });
        }

        const combinedOrder = orderMap.get(order.id)!;
        combinedOrder.details.push({
          product: order.product,
          storage: order.storage,
          color: order.color,
          quantity: order.quantity,
        });
      });
      return res
        .status(STATUS_CODES.OK)
        .json(BaseResponse.success('Get order detail success', Array.from(orderMap.values())[0]));
    } catch (error) {
      next(error);
    }
  }

  // async deleteOrder(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params

  //     const [data] = await DB.delete(orders);
  //     return res.status(STATUS_CODES.OK).json(BaseResponse.success('Get order detail success', data))
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
