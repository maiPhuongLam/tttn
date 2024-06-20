import { pgTable, serial, timestamp, integer, pgEnum, real } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shiped',
  'delivered',
  'cancelled',
  'refunded',
  'returned',
]);

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id, { onDelete: 'cascade' })
    .notNull(),
  totalAmount: real('total_amount').notNull(),
  orderDate: timestamp('order_date').notNull().defaultNow(),
  orderStatus: orderStatusEnum('order_status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Order = InferSelectModel<typeof orders>;
