import { pgTable, serial, timestamp, integer, pgEnum, decimal, index } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';
import { varchar } from 'drizzle-orm/pg-core';
export const paymentType = pgEnum('payment_type', ['online', 'Khi nhận hàng'])
export const orderStatusEnum = pgEnum('order_status', [
  'Đang chờ xử lý',
  'Đang xử lý',
  'Được xác nhận',
  'Đang vận chuyển',
  'Đã giao hàng',
  'Đã hủy',
  'Trả lại',
]);

export const orders = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    customerId: integer('customer_id')
      .references(() => customers.id, { onDelete: 'cascade' })
      .notNull(),
    totalPrice: decimal('total_price', { precision: 10, scale: 0 }).notNull(),
    orderDate: timestamp('order_date').notNull().defaultNow(),
    orderStatus: orderStatusEnum('order_status').notNull(),
    paymentType: paymentType('payment_type').notNull(),
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
