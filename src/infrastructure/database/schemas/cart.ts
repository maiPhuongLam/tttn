import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';

export const cartStatusEnum = pgEnum('cart_status', ['active', 'inactive', 'expired', 'saved']);

export const carts = pgTable('carts', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id, { onDelete: 'cascade' })
    .notNull(),
  cartStatus: cartStatusEnum('cart_status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>;
