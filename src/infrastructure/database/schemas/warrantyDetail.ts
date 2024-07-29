import { pgTable, serial, text, timestamp, varchar, integer, decimal } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { warrantyPolicies } from './warrantyPolicy';
import { warrantyRequests } from './warrantyRequest';

export const warrantyDetails = pgTable('warranty_details', {
  id: serial('id').primaryKey(),
  warrantyRequestId: integer('warranty_request_id')
    .references(() => warrantyRequests.id)
    .notNull(),
  warrantyPolicyId: integer('warranty_policy_id')
    .references(() => warrantyPolicies.id)
    .notNull(),
  repairDate: timestamp('repair_date').notNull().defaultNow(),
  repairDescription: text('repair_description').notNull(),
  cost: decimal('cost', { precision: 9, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyDetail = InferSelectModel<typeof warrantyDetails>;
