import { injectable, inject } from 'inversify';
import Stripe from 'stripe';
import configuration from 'src/config/configuration';
import { INTERFACE_NAME } from 'src/shared/constants';
import { IOrderRepository } from 'src/domain/repositories';
import { BasePropsType } from 'src/shared/types';
import {
  CheckoutDto,
  ICustomerService,
  IOrderDetailService,
  IProductItemService,
  IProductSerialService,
} from 'src/domain/services';
import { BadRequestError, NotFoundError } from 'src/shared/errors';
import { OrderStatusEnum, ProductSerialEnum } from 'src/shared/enums';
import logger from 'src/infrastructure/logger';

@injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @inject(INTERFACE_NAME.OrderRepository) private orderRepository: IOrderRepository,
    @inject(INTERFACE_NAME.ProductItemService) private productItemService: IProductItemService,
    @inject(INTERFACE_NAME.ProductSerialService)
    private productSerialService: IProductSerialService,
    @inject(INTERFACE_NAME.OrderDetailService) private orderDetailService: IOrderDetailService,
    @inject(INTERFACE_NAME.CustomerService) private customerService: ICustomerService,
  ) {
    this.stripe = new Stripe(configuration.SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async checkout(checkoutDto: CheckoutDto, userId: number): Promise<string> {
    try {
      const lineItems = [];
      for (let i = 0; i < checkoutDto.length; i++) {
        // const prodSeri = await this.productSerialService.getOneProductSerialBySerial(checkoutDto[i].productSerial)
        // const productItem = await this.productItemService.getOneProductItem(prodSeri.productItemId)
        const productItem = await this.productItemService.getOneProductitemBySku(
          checkoutDto[i].SKU,
        );
        lineItems.push({
          price_data: {
            currency: 'vnd',
            product_data: {
              name: productItem.name,
              metadata: { sku: productItem.SKU, prodictItemId: productItem.id },
            },
            unit_amount: Math.round(productItem.price * 100),
          },
          quantity: checkoutDto[i].quantity,
        });
      }

      if (lineItems.length < 1) {
        throw new BadRequestError('These products are not available right now');
      }

      const customer = await this.customerService.getByUserId(userId);
      const session = await this.stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
          customer_id: customer.id,
        },
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        success_url: configuration.SUCCESS_URL,
        cancel_url: configuration.CANCEL_URL,
      });
      console.log(session);
      
      return session.url || '';
    } catch (error) {
      throw error;
    }
  }

  async webhookHandler(body: any, sig: string) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(body, sig, configuration.WEBHOOK_SECRET);
    } catch (err: any) {
      logger.error(`Webhook Error: ${err.message}`)
      throw new BadRequestError(`Webhook Error: ${err.message}`)
    }
    logger.info('webhookHandler')
    logger.info(event.type)
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.handleCompletedCheckoutSession(session);
    }
  }

  private async handleCompletedCheckoutSession(session: any) {
    const lineItems = await this.stripe.checkout.sessions.listLineItems(session.id);
    const orderData = {
      customerId: session.metadata.customer_id,
      totalPrice: session.amount_total / 100,
      orderDate: new Date(),
      orderStatus: OrderStatusEnum.PENDING,
      checkoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
    };

    const order = await this.orderRepository.add(orderData);

    for (const item of lineItems.data) {
      // const productSerial = await this.productSerialService.getOneProductSerialBySerial(item.price?.product_data?.sku);
      if (item.price?.unit_amount && item.quantity) {
        const productSerials = await this.productSerialService.getProductSerials({
          productItemId: item.price?.metadata.productItemId,
          status: ProductSerialEnum.INVENTORY,
        });
        const orderDetailData = {
          orderId: order.id,
          productSerial: productSerials[0].serialNumber,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        };
        await this.orderDetailService.createOrderDetail(orderDetailData);
        await this.productSerialService.updateProductSerial(productSerials[0].id, {
          status: ProductSerialEnum.SOLD,
        });
        const productItem = await this.productItemService.getOneProductItem(productSerials[0].productItemId)
        await this.productItemService.updateProductItem(productSerials[0].productItemId, { quantityInStock: productItem.quantityInStock - item.quantity})
      }
    }

    await this.orderRepository.update(order.id, { orderStatus: 'processing' });
  }
}
