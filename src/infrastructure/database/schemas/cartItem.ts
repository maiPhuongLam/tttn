import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  real,
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
  price: real('price').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type CartItem = InferSelectModel<typeof cartItems>;
