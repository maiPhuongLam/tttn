import { injectable } from 'inversify';
import { Order, orderDetails, orders, OrderDetail } from '../schemas';
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
}
