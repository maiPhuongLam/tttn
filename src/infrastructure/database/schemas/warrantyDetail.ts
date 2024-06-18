import { pgTable, serial, text, timestamp, varchar, integer, real } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from './user';
import { products } from './product';
import { warrantyRequests } from './WarrantyRequests';
import { warrantyPolicies } from './warrantyPolicy';

export const warrantyDetails   = pgTable('warranty_details', {
  id: serial('id').primaryKey(),
  warrantyRequestId: integer('warranty_request_id').references(() => warrantyRequests.id).notNull(),
  warrantyPolicyId: integer('warranty_policy_id').references(() => warrantyPolicies.id).notNull(),
  repairDate: timestamp('repair_date').notNull().defaultNow(),
  repairDescription: text("repair_description").notNull(),
  cost: real("cost").notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const warrantyDetailRelations = relations(warrantyDetails, ({ one }) => ({
  warrantyRequest: one(warrantyRequests, {
    fields: [warrantyDetails.warrantyRequestId],
    references: [warrantyRequests.id],
  }),
  warrantyPolicy: one(warrantyPolicies, {
    fields: [warrantyDetails.warrantyPolicyId],
    references: [warrantyPolicies.id],
  }),
}));

export type WarrantyDetail   = InferSelectModel<typeof warrantyDetails>;
