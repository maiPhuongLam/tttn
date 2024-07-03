import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  real,
  index,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { products } from './product';

export const productItems = pgTable(
  'product_items',
  {
    id: serial('id').primaryKey(),
    SKU: varchar('name', { length: 256 }).notNull().unique(),
    quantityInStock: integer('qty_in_stock').notNull(),
    price: real('price').notNull(),
    image: text('image').notNull(),
    productId: integer('product_id').references(() => products.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('product_items_id_idx').on(table.id),
      SKUIdx: index('product_items_SKU_idx').on(table.SKU),
      productIdIdx: index('product_items_product_id_idx').on(table.productId),
    };
  },
);

export type ProductItem = InferSelectModel<typeof productItems>;
