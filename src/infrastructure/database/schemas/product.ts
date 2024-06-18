import { pgTable, serial, text, timestamp, varchar, integer, pgEnum, real } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { cartItems } from './cartItem';
import { productDetails } from './productDetail';
import { brands } from './brand';
import { categories } from './category';
import { admins } from './admin';

export const userRoleEnum = pgEnum('user_role', ['admin', 'customer', 'employee']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  brandId: integer('brand_id').references(() => brands.id),
  categoryId: integer('category_id').references(() => categories.id),
  featureId: integer('features').references(() => productDetails.id),
  releaseDate: timestamp('release_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productRelations = relations(products, ({ one, many }) => ({
  admin: one(admins, {
    fields: [products.adminId],
    references: [admins.id],
  }),
  cartItems: many(cartItems),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id]
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  })
}));

export type Product = InferSelectModel<typeof products>;
