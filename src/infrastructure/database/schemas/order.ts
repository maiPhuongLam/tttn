import { pgTable, serial, timestamp, integer, pgEnum, real, index } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';
import { varchar } from 'drizzle-orm/pg-core';

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shiped',
  'delivered',
  'cancelled',
  'refunded',
  'returned',
]);

export const orders = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id')
      .references(() => customers.id, { onDelete: 'cascade' })
      .notNull(),
    totalPrice: real('total_price').notNull(),
    orderDate: timestamp('order_date').notNull().defaultNow(),
    orderStatus: orderStatusEnum('order_status').notNull(),
    checkoutSessionId: varchar('checkout_session_id').notNull(),
    stripePaymentIntentId: varchar('payment_intent_id').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('orders_id_idx').on(table.id),
      customerIdIdx: index('orders_customer_id_idx').on(table.id),
    };
  },
);

export type Order = InferSelectModel<typeof orders>;
