import { inject, injectable } from 'inversify';
import { FindByCartIdResponse, ICartItemRepository } from 'src/domain/repositories';
import {
  ICartItemService,
  ICartService,
  ICustomerService,
  IProductItemService,
  CreateCartItemDto,
  GetCartItemsResponse,
  Item,
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

  async getCartItems(userId: number): Promise<GetCartItemsResponse> {
    try {
      const customer = await this.customerService.getByUserId(userId);
      if (!customer) {
        throw new ForbiddenError('Can not get cart');
      }

      const cart = await this.cartService.getCustomerCart(customer.id);
      await this.cartService.getOneCart(cart.id);
      const cartItems = await this.cartItemRepository.findByCartId(cart.id);

      const items: Item[] = await Promise.all(
        cartItems.map(async (item) => {
          const product = await this.productItemService.getProductItemDetail(item.productItemId);
          return {
            ...item,
            productItem: product,
          };
        }),
      );
      return { cartId: cart.id, items: items };
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

  async getOneCartItemByProductItemIdAndCartId(itemId: number, cartId: number): Promise<CartItem> {
    try {
      const cartItem = await this.cartItemRepository.findByproductItemIdAndCartId(itemId, cartId);
      return cartItem;
    } catch (error) {
      logger.error('Error get cart item ByProductItemId', error);
      throw error;
    }
  }

  async addCartItem(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    try {
      await this.cartService.getOneCart(createCartItemDto.cartId);
      const item = await this.getOneCartItemByProductItemIdAndCartId(
        createCartItemDto.productItemId,
        createCartItemDto.cartId,
      );

      if (item) {
        if (createCartItemDto.quantity === 0) {
          return await this.cartItemRepository.delete(item.id);
        }

        return await this.cartItemRepository.update(item.id, {
          quantity: item.quantity + 1,
          price: (parseFloat(item.price) + parseFloat(createCartItemDto.price)).toString()
        });
      }

      return await this.cartItemRepository.add(createCartItemDto);
    } catch (error) {
      throw error
    }
  }

  async updateCartItem(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    try {
      await this.cartService.getOneCart(createCartItemDto.cartId);
      const item = await this.getOneCartItemByProductItemIdAndCartId(
        createCartItemDto.productItemId,
        createCartItemDto.cartId,
      );
      if (item) {
        if (createCartItemDto.quantity === 0) {
          return await this.cartItemRepository.delete(item.id);
        }

        return await this.cartItemRepository.update(item.id, {
          quantity: createCartItemDto.quantity,
          price: createCartItemDto.price,
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
