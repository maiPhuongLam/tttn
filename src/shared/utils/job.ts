import { DB } from 'src/infrastructure/database/connect';
import { CartStatus, UserRoles } from '../enums';
import {
  admins,
  carts,
  customers,
  ProductItem,
  products,
} from 'src/infrastructure/database/schemas';
import logger from 'src/infrastructure/logger';
import { Job } from 'bullmq';
import { eq } from 'drizzle-orm';
import { updateProductIndex } from './search';
import { productSerials } from 'src/infrastructure/database/schemas/productSerial';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
export const addRole = async (job: Job) => {
  try {
    const { role, userId } = job.data;
    if (role === UserRoles.CUSTOMER) {
      const [customer] = await DB.insert(customers).values({ userId }).returning().execute();
      logger.info('1000');
      const cart = await createCart({ customerId: customer.id, cartStatus: CartStatus.ACTIVE });
      logger.info('1000');
    } else {
      await DB.insert(admins).values({ userId }).execute();
    }
  } catch (error) {
    logger.error(`Error processing job ${job.id}:`, error);
    throw error; // This will make BullMQ handle retries, etc., based on your configuration
  }
};

export const uploadImageProduct = async (job: Job) => {
  try {
    const { imagePath, product } = job.data;
    const [updatedProduct] = await DB.update(products)
      .set({ image: imagePath })
      .where(eq(products.id, product.id))
      .returning()
      .execute();

    await updateProductIndex(updatedProduct);
  } catch (error) {
    console.error('Image upload failed:', error);
  }
};

export const createProductItemSerial = async (job: Job) => {
  try {
    const { productItemId, stock } = job.data;
    for (let i = 0; i < stock; i++) {
      const serialNumber = uuidv4().replace(/-/g, '').substring(0, 12);
      await DB.insert(productSerials).values({ productItemId, serialNumber, status: 'inventory' });
    }
  } catch (error) {
    logger.error(`Error processing job ${job.id}:`, error);
    throw error; // This will make BullMQ handle retries, etc., based on your configuration
  }
};

export const createCart = async (data: { customerId: number; cartStatus: CartStatus }) => {
  try {
    const { customerId, cartStatus } = data;
    await DB.insert(carts).values({ customerId, cartStatus }).execute();
  } catch (error) {
    throw error; // This will make BullMQ handle retries, etc., based on your configuration
  }
};
