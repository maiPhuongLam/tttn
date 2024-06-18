import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { products } from './product';
import { admins } from './admin';

export const categoriesEnum = pgEnum('name', ['mobile_phone', 'tablet', "accessory"]);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: categoriesEnum('name').notNull(),
  adminId: integer('admin_id').references(() => admins.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const categoryRelations = relations(categories, ({ many, one }) => ({
  products: many(products),
  admin: one(admins, {
    fields: [categories.adminId],
    references: [admins.id],
  }) 
}));

export type Category = InferSelectModel<typeof categories>;
