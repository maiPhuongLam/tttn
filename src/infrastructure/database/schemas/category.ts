import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { admins } from './admin';

export const categoriesEnum = pgEnum('name', ['mobile_phone', 'tablet', 'accessory']);

export const categories = pgTable(
  'categories',
  {
    id: serial('id').primaryKey(),
    name: categoriesEnum('name').notNull().unique(),
    adminId: integer('admin_id').references(() => admins.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('categories_id_idx').on(table.id),
    };
  },
);

export type Category = InferSelectModel<typeof categories>;
