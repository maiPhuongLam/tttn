import { injectable, inject } from 'inversify';
import Stripe from 'stripe';
import configuration from 'src/config/configuration';
import { INTERFACE_NAME } from 'src/shared/constants';
import { IOrderRepository } from 'src/domain/repositories';
import {
  CheckoutDto,
  ICustomerService,
  IOrderDetailService,
  IOrderService,
  IProductItemService,
  IProductSerialService,
  OrderRepsonse,
} from 'src/domain/services';
import { BadRequestError, NotFoundError } from 'src/shared/errors';
import { OrderStatusEnum, ProductSerialEnum } from 'src/shared/enums';
import logger from 'src/infrastructure/logger';
import { Order } from 'src/infrastructure/database/schemas';

@injectable()
export class OrderService implements IOrderService {
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

  async getOrders(filter: any): Promise<Order[]> {
    try {
      const orders = await this.orderRepository.findAll();
      return orders;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  }
  async getOneOder(id: number): Promise<OrderRepsonse> {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) {
        throw new NotFoundError('Order not found');
      }
      const orderDetails = await this.orderDetailService.getOrderDetails(order.id);
      return { order, details: orderDetails };
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  }
  async getCustomerOrders(userId: number): Promise<OrderRepsonse[]> {
    try {
      const customer = await this.customerService.getByUserId(userId);
      const orders = await this.orderRepository.findByCustomerId(customer.id);
      if (orders.length === 0) {
        throw new NotFoundError('Customer has no orders');
      }

      const orderResponses = await Promise.all(
        orders.map(async (order) => {
          const details = await this.orderDetailService.getOrderDetails(order.id);
          console.log(details);

          return { order, details };
        }),
      );

      return orderResponses;
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
  }
  async updateStatusOrder(id: number, status: OrderStatusEnum): Promise<Order> {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) {
        throw new NotFoundError('Order not found');
      }

      return await this.orderRepository.update(id, { orderStatus: status });
    } catch (error) {
      logger.error(`${error}`);
      throw error;
    }
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
            unit_amount: Math.round(Number(productItem.price) * 100),
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

  async webhookHandler(body: any, sig: string): Promise<void> {
    try {
      let event: Stripe.Event;

      try {
        event = this.stripe.webhooks.constructEvent(body, sig, configuration.WEBHOOK_SECRET);
      } catch (err: any) {
        logger.error(`Webhook Error: ${err.message}`);
        throw new BadRequestError(`Webhook Error: ${err.message}`);
      }
      logger.info('webhookHandler');
      logger.info(event.type);
      // Handle the event
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await this.handleCompletedCheckoutSession(session);
      }
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private async handleCompletedCheckoutSession(session: any): Promise<void> {
    const lineItems = await this.stripe.checkout.sessions.listLineItems(session.id);
    const orderData = {
      customerId: session.metadata.customer_id,
      totalPrice: (Number(session.amount_total) / 100).toString(),
      orderDate: new Date(),
      orderStatus: OrderStatusEnum.PROCESSING,
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
          price: (Number(item.price.unit_amount) / 100).toString(),
        };
        await this.orderDetailService.createOrderDetail(orderDetailData);
        for (let i = 0; i < item.quantity; i++) {
          await this.productSerialService.updateProductSerial(productSerials[i].id, {
            status: ProductSerialEnum.SOLD,
          });
        }
        const productItem = await this.productItemService.getOneProductItem(
          productSerials[0].productItemId,
        );
        await this.productItemService.updateProductItem(productSerials[0].productItemId, {
          quantityInStock: productItem.quantityInStock - item.quantity,
        });
      }
    }

    await this.orderRepository.update(order.id, { orderStatus: 'processing' });
  }
}
