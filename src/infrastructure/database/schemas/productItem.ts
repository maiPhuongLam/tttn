import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  decimal,
  index,
  boolean,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { products } from './product';

export const productItemStatusEnum = pgEnum('product_item_request_status', [
  'locked',
  'unlock',
  'sold',
]);
export const productItems = pgTable(
  'product_items',
  {
    id: serial('id').primaryKey(),
    SKU: varchar('sku', { length: 256 }).notNull().unique(),
    quantityInStock: integer('qty_in_stock').notNull(),
    status: productItemStatusEnum('status').notNull(),
    price: decimal('price', { precision: 10, scale: 0 }).notNull(),
    color: varchar('color').notNull(),
    storage: varchar('storage').notNull(),
    ram: varchar('ram').notNull(),
    image: text('image').notNull(),
    isDelete: boolean('is_delete').default(false).notNull(),
    productId: integer('product_id')
      .references(() => products.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
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
