import { pgTable, serial, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { users } from './user';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
  return {
    idIdx: index("customers_id_idx").on(table.id),
  }
});

export type Customer = InferSelectModel<typeof customers>;
