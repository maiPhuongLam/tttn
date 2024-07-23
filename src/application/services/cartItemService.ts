import { inject, injectable } from 'inversify';
import { ICartItemRepository } from 'src/domain/repositories';
import {
  ICartItemService,
  ICartService,
  ICustomerService,
  IProductItemService,
  CreateCartItemDto,
} from 'src/domain/services';
import { CartItem } from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME } from 'src/shared/constants';
import { ForbiddenError, NotFoundError } from 'src/shared/errors';

@injectable()
export class CartItemService implements ICartItemService {
  constructor(
    @inject(INTERFACE_NAME.CartItemRepository) private cartItemRepository: ICartItemRepository,
    @inject(INTERFACE_NAME.ProductItemService) private productItemService: IProductItemService,
    @inject(INTERFACE_NAME.CustomerService) private customerService: ICustomerService,
    @inject(INTERFACE_NAME.CartService) private cartService: ICartService,
  ) {}

  async getCartItems(userId: number): Promise<{ cartId: number; items: CartItem[] }> {
    try {
      const customer = await this.customerService.getByUserId(userId);
      if (!customer) {
        throw new ForbiddenError('Can not get cart');
      }

      const cart = await this.cartService.getCustomerCart(customer.id);
      await this.cartService.getOneCart(cart.id);
      const cartItems = await this.cartItemRepository.findByCartId(cart.id);
      return { cartId: cart.id, items: cartItems };
    } catch (error) {
      logger.error('Error Get CartItems', error);
      throw error;
    }
  }

  async getOneCartItem(id: number): Promise<CartItem> {
    try {
      logger.info(id);
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

  async getOneCartItemByProductItemId(itemId: number): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findByproductItemId(itemId);
      if (!cartItem) {
        throw new NotFoundError('Cart Item not found');
      }

      return cartItem;
    } catch (error) {
      logger.error('Error get cart item ByProductItemId', error);
      throw error;
    }
  }

  async addCartItem(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    try {
      await this.cartService.getOneCart(createCartItemDto.cartId);
      const item = await this.getOneCartItemByProductItemId(createCartItemDto.productItemId);
      if (item) {
        return await this.cartItemRepository.update(item.id, {
          quantity: item.quantity + createCartItemDto.quantity,
          price: item.price + createCartItemDto.price,
        });
      }
      return await this.cartItemRepository.add(createCartItemDto);
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
