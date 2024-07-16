import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  index,
  boolean,
  real,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations, sql } from 'drizzle-orm';
import { productDetails } from './productDetail';
import { brands } from './brand';
import { categories } from './category';
import { admins } from './admin';
export const products = pgTable(
  'products',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull().unique(),
    // image: json('image').$type<{ public_id: string, url: string }>().default({ public_id: "", url: "" }).notNull(),
    image: text('image').notNull(),
    originalPrice: real('original_price').notNull(),
    adminId: integer('admin_id').references(() => admins.id),
    brandId: integer('brand_id').references(() => brands.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    categoryId: integer('category_id').references(() => categories.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    featureId: integer('feature_id').references(() => productDetails.id),
    releaseDate: timestamp('release_date').notNull().defaultNow(),
    isDelete: boolean('is_delete').default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('products_id_idx').on(table.id),
      nameIdx: index('products_name_idx').on(table.name),
      featureIdx: index('products_feature_id_idx').on(table.name),
      nameSearchIdx: index('name_search_idx').using(
        'gin',
        sql`to_tsvector('english', ${table.name})`,
      ),
    };
  },
);

export type Product = InferSelectModel<typeof products>;
