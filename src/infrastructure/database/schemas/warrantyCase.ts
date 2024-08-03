import { pgTable, serial, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { admins } from './admin';

export const warrantyCases = pgTable('warranty_cases', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyCase = InferSelectModel<typeof warrantyCases>;
