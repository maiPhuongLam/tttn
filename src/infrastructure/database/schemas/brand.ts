import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { cartItems } from './cartItem';
import { products } from './product';
import { admins } from './admin';

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar("name").notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const brandRelations = relations(brands, ({ many, one }) => ({
  products: many(products),
  admin: one(admins, {
    fields: [brands.adminId],
    references: [admins.id]
  })
}));


export type User = InferSelectModel<typeof users>;
