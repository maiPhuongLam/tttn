import { Order, OrderDetail } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';
import { BasePropsType } from 'src/shared/types';

export type CreateOrder = {
  order: BasePropsType<Order>;
  detail: BasePropsType<OrderDetail>;
};

export interface IOrderDetailRepository extends IRepository<OrderDetail> {
  finByOrderId(orderId: number): Promise<OrderDetail[]>;
}
