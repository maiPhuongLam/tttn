import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { admins } from './admin';

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Brand = InferSelectModel<typeof brands>;
