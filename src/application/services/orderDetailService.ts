import { inject, injectable } from 'inversify';
import { IOrderDetailRepository } from 'src/domain/repositories';
import { IOrderDetailService } from 'src/domain/services';
import { OrderDetail } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';
import { BasePropsType } from 'src/shared/types';

@injectable()
export class OrderDetailService implements IOrderDetailService {
  constructor(
    @inject(INTERFACE_NAME.OrderDetailRepository)
    private orderDetailRepository: IOrderDetailRepository,
  ) {}

  async createOrderDetail(createOrderDetailDto: BasePropsType<OrderDetail>): Promise<OrderDetail> {
    try {
      return await this.orderDetailRepository.add(createOrderDetailDto);
    } catch (error) {
      throw error;
    }
  }

  async getOrderDetails(orderId: number): Promise<OrderDetail[]> {
    try {
      return await this.orderDetailRepository.finByOrderId(orderId);
    } catch (error) {
      throw error;
    }
  }

  async getOneOrderDetail(id: number): Promise<OrderDetail> {
    try {
      const orderDetail = await this.orderDetailRepository.findById(id);
      if (!orderDetail) {
        throw new NotFoundError('Order detail not found');
      }

      return orderDetail;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderDetail(
    id: number,
    updateOrderDetailDto: Partial<BasePropsType<OrderDetail>>,
  ): Promise<OrderDetail> {
    try {
      await this.getOneOrderDetail(id);
      return await this.orderDetailRepository.update(id, updateOrderDetailDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrderDetail(id: number): Promise<OrderDetail> {
    try {
      await this.getOneOrderDetail(id);
      return await this.orderDetailRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
