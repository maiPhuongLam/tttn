import { injectable } from 'inversify';
import { Order, orderDetails, OrderDetail, orders } from '../schemas';
import { Repository } from './repository';
import { BasePropsType } from 'src/shared/types';
import { and, eq, or, sql } from 'drizzle-orm';
import { IOrderRepository } from 'src/domain/repositories';

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
export class OrderRepository extends Repository<Order> implements IOrderRepository {
  constructor() {
    super(orders);
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    try {
      return await this.db.select().from(orders).where(eq(orders.customerId, customerId)).execute();
    } catch (error) {
      throw error;
    }
  }
}
