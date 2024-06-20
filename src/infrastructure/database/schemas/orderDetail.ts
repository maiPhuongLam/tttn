import { pgTable, serial, timestamp, integer, pgEnum, real } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { orders } from './order';
import { productItems } from './productItem';

export const orderDetails = pgTable('order_details', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .references(() => orders.id)
    .notNull(),
  productItemId: integer('product_item_id')
    .references(() => productItems.id)
    .notNull(),
  quanity: integer('quanity').notNull(),
  price: real('price').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type OrderDetail = InferSelectModel<typeof orderDetails>;
