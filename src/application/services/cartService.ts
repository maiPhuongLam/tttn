import { inject, injectable } from 'inversify';
import { CreateCartDto, UpdateCartDto } from '../dtos';
import { ICartRepository } from 'src/domain/repositories';
import { ICartService } from 'src/domain/services';
import { Cart } from 'src/infrastructure/database/schemas';
import { INTERFACE_NAME } from 'src/shared/constants';
import { BadRequestError, NotFoundError } from 'src/shared/errors';

@injectable()
export class CartService implements ICartService {
  constructor(@inject(INTERFACE_NAME.CartRepository) private cartRepository: ICartRepository) {}

  async getCarts(): Promise<Cart[]> {
    try {
      return await this.cartRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getOneCart(id: number): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findById(id);
      if (!cart) {
        throw new NotFoundError('Cart Not Found');
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCustomerCart(customerId: number): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findByCustomerId(customerId);
      if (!cart) {
        throw new NotFoundError('Cart Not Found');
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async createCart(createCartDto: CreateCartDto, customerId: number): Promise<Cart> {
    try {
      const customerCartExisted = await this.getCustomerCart(customerId);
      if (customerCartExisted) {
        throw new BadRequestError(`Customer ${customerId} have another cart, can not create cart`);
      }

      return await this.cartRepository.add(createCartDto);
    } catch (error) {
      throw error;
    }
  }

  async updateCart(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      await this.getOneCart(id);
      return await this.cartRepository.update(id, updateCartDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id: number): Promise<Cart> {
    try {
      await this.getOneCart(id);
      return await this.cartRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
