import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations,  } from 'drizzle-orm';
import { users } from './user';
import { brands } from './brand';
import { categories } from './category';
import { products } from './product';
import { warrantyPolicies } from './warrantyPolicies';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'cascade'}).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const adminRelations = relations(users, ({ many }) => ({
  brands: many(brands),
  categories: many(categories),
  products: many(products),
  warrantyPolicies: many(warrantyPolicies),
}));

export type Admin = InferSelectModel<typeof admins>;
