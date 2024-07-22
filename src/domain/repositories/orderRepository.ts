import { Order, OrderDetail } from 'src/infrastructure/database/schemas';
import { IRepository } from './repository';
import { BasePropsType } from 'src/shared/types';

// export type CreateOrder = {
//   order: BasePropsType<Order>,
//   detail: BasePropsType<OrderDetail>
// }

export interface IOrderRepository extends IRepository<Order> {}
