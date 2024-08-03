import { pgTable, serial, text, timestamp, varchar, integer, decimal } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';
import { productSerials } from './productSerial';
import { warrantyCases } from './warrantyCase';
import { orders } from './order';
import { warranties } from './warranty';

export const warrantyDetails = pgTable('warranty_details', {
  id: serial('id').primaryKey(),
  productSerial: varchar('product_serial')
    .references(() => productSerials.serialNumber)
    .notNull(),
  warrantyCaseId: integer('warranty_case_id')
    .references(() => warrantyCases.id)
    .notNull(),
  warrantyId: integer('warranty_id')
    .references(() => warranties.id, { onDelete: 'cascade' })
    .notNull(),
  cost: decimal('cost', { precision: 10, scale: 0 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WarrantyDetail = InferSelectModel<typeof warrantyDetails>;
