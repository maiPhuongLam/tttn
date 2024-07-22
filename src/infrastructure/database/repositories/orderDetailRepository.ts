import { injectable } from 'inversify';
import { Order, orderDetails, orders, OrderDetail } from '../schemas';
import { Repository } from './repository';
import { BasePropsType } from 'src/shared/types';
import { and, eq, or, sql } from 'drizzle-orm';
import { IOrderRepository } from 'src/domain/repositories';
import { IOrderDetailRepository } from 'src/domain/repositories/orderDetailRepository';

interface OrderResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: number;
  totalPrice: number;
  orderDate: Date;
  orderStatus:
    | 'pending'
    | 'processing'
    | 'shiped'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
    | 'returned';
  checkoutSessionId: string;
  orderDetails: OrderDetail[];
}

@injectable()
export class OrderDetailRepository
  extends Repository<OrderDetail>
  implements IOrderDetailRepository
{
  constructor() {
    super(orderDetails);
  }

  async finByOrderId(orderId: number): Promise<OrderDetail[]> {
    try {
      return await this.db.select().from(orderDetails).where(eq(orderDetails.orderId, orderId));
    } catch (error) {
      throw error;
    }
  }
}
