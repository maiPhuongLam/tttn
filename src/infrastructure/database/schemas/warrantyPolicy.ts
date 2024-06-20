import { pgTable, serial, timestamp, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { products } from './product';
import { admins } from './admin';

export const warrantyPolicies = pgTable('warranty_requests', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  adminId: integer('product_id')
    .references(() => admins.id)
    .notNull(),
  warrantyPeriod: integer('warranty_period').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyPolicy = InferSelectModel<typeof warrantyPolicies>;
