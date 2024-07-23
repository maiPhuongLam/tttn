// export interface CheckoutDetailDto {
//   skuId: string;
//   skuPriceId: string;
//   quantity: number;

import { Order, OrderDetail } from 'src/infrastructure/database/schemas';
import { OrderStatusEnum } from 'src/shared/enums';

// }
export type CheckoutDto = {
  quantity: number;
  SKU: string;
}[];

export type OrderRepsonse = {
  order: Order;
  details: OrderDetail[];
};

export interface IOrderService {
  getOrders(filter: any): Promise<Order[]>;
  getOneOder(id: number): Promise<OrderRepsonse>;
  getCustomerOrders(userId: number): Promise<OrderRepsonse[]>;
  updateStatusOrder(id: number, status: OrderStatusEnum): Promise<any>;
  checkout(checkoutDto: CheckoutDto, customerId: number): Promise<string>;
  webhookHandler(body: any, sig: string): Promise<void>;
}
