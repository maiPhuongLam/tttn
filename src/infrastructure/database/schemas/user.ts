import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { addresses } from './address';
import { admins } from './admin';
import { customers } from './customer';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(),
  phoneNumber: text('phone_number').notNull().unique(),
  addressId: integer('address_id').references(() => addresses.id, { onDelete: 'cascade'}).notNull(),
  rt: varchar('tr', { length: 256 }).unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  admin: one(admins),
  customer: one(customers)
}));


export type User = InferSelectModel<typeof users>;
