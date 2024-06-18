import { pgTable, serial, text, timestamp, varchar, integer, real, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { products } from './product';
import { customers } from './customer';
import { warrantyDetails } from './warrantyDetail';

export const warrantyRequestStatusEnum = pgEnum('warranty_request_status', ['admin', 'customer']);

export const warrantyRequests  = pgTable('warranty_requests', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  issueDescription: text('issue_description').notNull(), 
  status: warrantyRequestStatusEnum("status").notNull(),
  requestDate: timestamp('request_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const warrantyServiceRelations = relations(warrantyRequests, ({ many, one }) => ({
  customer: one(customers, {
    fields: [warrantyRequests.customerId],
    references: [customers.id]
  }),
  products: one(products, {
    fields: [warrantyRequests.productId],
    references: [products.id]
  }),
  warrantyDetail: many(warrantyDetails)
}));

export type WarrantyService  = InferSelectModel<typeof warrantyRequests>;
