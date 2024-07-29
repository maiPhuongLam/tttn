import { pgTable, serial, timestamp, integer, text } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { products } from './product';
import { admins } from './admin';

export const warrantyPolicies = pgTable('warranty_polices', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  adminId: integer('admin_id')
    .references(() => admins.id)
    .notNull(),
  description: text('description').notNull(),
  warrantyPeriod: integer('warranty_period').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyPolicy = InferSelectModel<typeof warrantyPolicies>;
