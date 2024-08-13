import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateCartItemDto } from 'src/application/dtos';
import { ICartItemService, ICartService } from 'src/domain/services';
import logger from 'src/infrastructure/logger';
import { INTERFACE_NAME, STATUS_CODES } from 'src/shared/constants';

@injectable()
export class CartController {
  constructor(@inject(INTERFACE_NAME.CartItemService) private cartItemService: ICartItemService) {}

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const data = await this.cartItemService.getCartItems(+userId);
      const response = {
        success: true,
        message: 'Get Cart is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Error getCart', error);
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateCartItemDto>req.body;
      const data = await this.cartItemService.addCartItem(body);
      const response = {
        success: true,
        message: 'Add item to Cart is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Error add to cart', error);
    }
  }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const body = <CreateCartItemDto>req.body;
      const data = await this.cartItemService.updateCartItem(body);
      const response = {
        success: true,
        message: 'Update to Cart is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Error add to cart', error);
    }
  }

  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId } = req.params;
      const data = await this.cartItemService.deleteCartItem(+cartItemId);
      const response = {
        success: true,
        message: 'Remove item from Cart is successful',
        data,
      };
      return res.status(STATUS_CODES.OK).json(response);
    } catch (error) {
      logger.error('Error Remove item from Cart', error);
    }
  }
}
