import { pgTable, serial, timestamp, varchar, integer, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { customers } from './customer';
export const warrantyStatus = pgEnum('warranty_status', [
  'Tiếp nhận',
  'Đang bảo hành',
  'Bảo hành xong',
  'Đã bàn giao',
]);
export const warranties = pgTable('warranties', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id')
    .references(() => customers.id)
    .notNull(),
  totalCost: decimal('total_cost', { precision: 10, scale: 0 }).notNull(),
  status: warrantyStatus('warranty_status').notNull(),
  repairDate: timestamp('repair_date').notNull(),
  appointmentDate: timestamp('appointment_date').notNull(),
});

export type WarrantyCase = InferSelectModel<typeof warranties>;
