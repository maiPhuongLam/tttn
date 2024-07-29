import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';
import { productSerials } from './productSerial';
import { warrantyCases } from './warrantyCase';

export const warrantyRequestStatusEnum = pgEnum('warranty_request_status', ['pending', 'warrantying', "refused", "successed"]);

export const warrantyRequests = pgTable('warranty_requests', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id)
    .notNull(),
  productSerial: varchar('product_serial')
    .references(() => productSerials.serialNumber)
    .notNull(),
  issueDescription: text('issue_description').notNull(),
  status: warrantyRequestStatusEnum('status').notNull(),
  requestDate: timestamp('request_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyRequest = InferSelectModel<typeof warrantyRequests>;
