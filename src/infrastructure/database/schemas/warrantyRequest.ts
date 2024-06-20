import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  real,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { products } from './product';
import { customers } from './customer';

export const warrantyRequestStatusEnum = pgEnum('warranty_request_status', ['admin', 'customer']);

export const warrantyRequests = pgTable('warranty_requests', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id)
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  issueDescription: text('issue_description').notNull(),
  status: warrantyRequestStatusEnum('status').notNull(),
  requestDate: timestamp('request_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyRequest = InferSelectModel<typeof warrantyRequests>;
