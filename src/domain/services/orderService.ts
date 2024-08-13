// export interface CheckoutDetailDto {
//   skuId: string;
//   skuPriceId: string;
//   quantity: number;

import { Order, OrderDetail } from 'src/infrastructure/database/schemas';
import { OrderStatusEnum } from 'src/shared/enums';

type ProductCartItem = {
  name: string;
  image: string;
  SKU: string;
  quantity: number;
  productItemId: number;
  price: string;
};

// }
export type CheckoutDto = {
  cartId?: number;
  productItems: ProductCartItem[];
};

export type OrderRepsonse = Order & { details: OrderDetail[] };

export interface IOrderService {
  getOrders(filter: any): Promise<Order[]>;
  getOneOder(id: number): Promise<OrderRepsonse>;
  getCustomerOrders(userId: number): Promise<OrderRepsonse[]>;
  updateStatusOrder(id: number, status: OrderStatusEnum): Promise<any>;
  checkout(checkoutDto: CheckoutDto, customerId: number, paymentType: string): Promise<string>;
  webhookHandler(body: any, sig: string): Promise<void>;
  historyCheckout(userId: number): Promise<any>;
}
