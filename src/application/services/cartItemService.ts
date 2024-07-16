import { inject, injectable } from 'inversify';
import { CreateCartItemDto } from '../dtos';
import { ICartItemRepository } from 'src/domain/repositories';
import { ICartItemService, ICartService } from 'src/domain/services';
import { CartItem } from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME } from 'src/shared/constants';
import { NotFoundError } from 'src/shared/errors';

@injectable()
export class CartItemService implements ICartItemService {
  constructor(
    @inject(INTERFACE_NAME.CartItemRepository) private cartItemRepository: ICartItemRepository,
    @inject(INTERFACE_NAME.CartService) private cartService: ICartService,
  ) {}

  async getCartItems(cartId: number): Promise<CartItem[]> {
    try {
      await this.cartService.getOneCart(cartId);
      return await this.cartItemRepository.findByCartId(cartId);
    } catch (error) {
      logger.error('Error Get CartItems', error);
      throw error;
    }
  }

  async getOneCartItem(id: number): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findById(id);
      if (!cartItem) {
        throw new NotFoundError('Cart Item not found');
      }

      return cartItem;
    } catch (error) {
      logger.error('Error get cart item', error);
      throw error;
    }
  }

  async addCartItem(createCartDto: CreateCartItemDto): Promise<CartItem> {
    try {
      await this.cartService.getOneCart(createCartDto.cartId);
      return await this.cartItemRepository.add(createCartDto);
    } catch (error) {
      logger.error('Error Add CartItems', error);
      throw error;
    }
  }

  async deleteCartItem(id: number): Promise<CartItem> {
    try {
      await this.getOneCartItem(id);
      return await this.cartItemRepository.delete(id);
    } catch (error) {
      logger.error('Error Delete CartItems', error);
      throw error;
    }
  }
}
