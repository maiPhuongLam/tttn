import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { warrantyRequests } from './WarrantyRequests';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'cascade'}).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const customerRelations = relations(customers, ({ one, many }) => ({
  cart: one(customers),
  warrantyRequests: many(warrantyRequests)
}));

export type Customer = InferSelectModel<typeof customers>;
