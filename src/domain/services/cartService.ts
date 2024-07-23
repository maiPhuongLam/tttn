import { Cart } from 'src/infrastructure/database/schemas';
import { BasePropsType } from 'src/shared/types';

export type CreateCartDto = {
  customerId: number;
  status: 'active' | 'inactive' | 'expired' | 'saved';
};
export type UpdateCartDto = Partial<CreateCartDto>;

export interface ICartService {
  getCarts(): Promise<Cart[]>;
  getOneCart(id: number): Promise<Cart>;
  getCustomerCart(customerId: number): Promise<Cart>;
  createCart(createCartDto: CreateCartDto, customerId: number): Promise<Cart>;
  updateCart(id: number, updateCartDto: UpdateCartDto): Promise<Cart>;
  deleteCart(id: number): Promise<Cart>;
}
