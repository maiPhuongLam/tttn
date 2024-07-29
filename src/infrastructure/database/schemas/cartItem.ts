import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  decimal,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { carts } from './cart';
import { productItems } from './productItem';

export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id')
    .references(() => carts.id, { onDelete: 'cascade' })
    .notNull(),
  productItemId: integer('product_item_id')
    .references(() => productItems.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 0 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type CartItem = InferSelectModel<typeof cartItems>;
