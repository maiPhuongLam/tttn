import { OrderDetail } from 'src/infrastructure/database/schemas';
import { ProductSerialEnum } from 'src/shared/enums';
import { BasePropsType } from 'src/shared/types';
import { ProductDetailResponse } from '../repositories';

export type CreateOrderDetailDto = {
  orderId: number;
  price: number;
  produdctSerialId: number;
  quanity: number;
};

export type UpdateOrderDetailDto = Partial<CreateOrderDetailDto>;

export interface IOrderDetailService {
  createOrderDetail(createOrderDetailDto: BasePropsType<OrderDetail>): Promise<OrderDetail>;
  getOrderDetails(orderId: number): Promise<OrderDetail[]>;
  getOneOrderDetail(id: number): Promise<OrderDetail>;
  // getOneOrderDetailBySerial(serial: string): Promise<OrderDetail | null>
  updateOrderDetail(id: number, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail>;
  deleteOrderDetail(id: number): Promise<OrderDetail>;
}
