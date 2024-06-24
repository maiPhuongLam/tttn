import { pgTable, serial, text, timestamp, varchar, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { admins } from './admin';

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull().unique(),
  adminId: integer('admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
  return {
    idIdx: index("brands_id_idx").on(table.id),
  }
});

export type Brand = InferSelectModel<typeof brands>;
