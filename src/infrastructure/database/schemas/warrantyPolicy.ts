import { pgTable, serial, text, timestamp, varchar, integer, real, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { products } from './product';
import { admins } from './admin';
import { warrantyDetails } from './warrantyDetail';

export const warrantyPolicieStatusEnum = pgEnum('warranty_request_status', ['admin', 'customer']);

export const warrantyPolicies  = pgTable('warranty_requests', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id).notNull(),
  adminId: integer('product_id').references(() => admins.id).notNull(),
  warrantyPeriod : integer('warranty_period').notNull(), 
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const warrantyServiceRelations = relations(warrantyPolicies, ({ many, one }) => ({
  products: one(products, {
    fields: [warrantyPolicies.productId],
    references: [products.id]
  }),
  admin: one(admins, {
    fields: [warrantyPolicies.adminId],
    references: [admins.id]
  }),
  warrantyDetail: many(warrantyDetails)
}));

export type WarrantyService  = InferSelectModel<typeof warrantyPolicies>;
