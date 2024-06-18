import { pgTable, serial, text, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  streetAddress: text('street_address'),
  wardOrCommune: text('ward/commune'),
  district: text('district'),
  cityOrProvince: text('city/province'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users),
}));

export type Address = InferSelectModel<typeof addresses>;
