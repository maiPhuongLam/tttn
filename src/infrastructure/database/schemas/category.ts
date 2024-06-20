import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { admins } from './admin';

export const categoriesEnum = pgEnum('name', ['mobile_phone', 'tablet', 'accessory']);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: categoriesEnum('name').notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Category = InferSelectModel<typeof categories>;
