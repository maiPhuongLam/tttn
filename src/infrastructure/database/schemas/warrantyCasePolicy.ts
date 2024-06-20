import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { warrantyPolicies } from './warrantyPolicy';
import { warrantyCases } from './warrantyCase';

export const warrantyCasesPolices = pgTable(
  'warranty_cases_polices',
  {
    warrantyPolicyId: integer('warranty_policy_id')
      .notNull()
      .references(() => warrantyPolicies.id),
    warrantyCaseId: integer('warranty_case_id')
      .notNull()
      .references(() => warrantyCases.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.warrantyPolicyId, t.warrantyCaseId] }),
  }),
);

export type WarrantyCasePolicy = InferSelectModel<typeof warrantyCasesPolices>;
