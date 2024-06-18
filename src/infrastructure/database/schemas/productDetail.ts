import { pgTable, serial, text, timestamp, varchar, integer, pgEnum, real } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { products } from './product';

export const userRoleEnum = pgEnum('user_role', ['admin', 'customer', 'employee']);

export const productDetails = pgTable('product_details', {
  id: serial('id').primaryKey(),
  screenSize: varchar('screenSize').notNull(),
  battery: varchar('name').notNull(),
  camera: varchar('name').notNull(),
  processor: varchar('name').notNull(),
  ram: varchar('name').notNull(),
  storage: integer('stock').notNull(),
  os: varchar('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productDetailRelations = relations(productDetails, ({ one }) => ({
  product: one(products, {
    fields: [productDetails.id],
    references: [products.featureId],
  }),

}));


export type ProductDetail = InferSelectModel<typeof productDetails>;
