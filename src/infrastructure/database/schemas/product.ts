import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  real,
  json,
  index,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { productDetails } from './productDetail';
import { brands } from './brand';
import { categories } from './category';
import { admins } from './admin';
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  // image: json('image').$type<{ public_id: string, url: string }>().default({ public_id: "", url: "" }).notNull(),
  image: text('image').notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  brandId: integer('brand_id').references(() => brands.id),
  categoryId: integer('category_id').references(() => categories.id),
  featureId: integer('feature_id').references(() => productDetails.id),
  releaseDate: timestamp('release_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
  return {
    idIdx: index("products_id_idx").on(table.id),
    nameIdx: index("products_name_idx").on(table.name),
    featureId: index("products_feature_id_idx").on(table.name),
  }
});

export type Product = InferSelectModel<typeof products>;
