import { pgTable, serial, varchar, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { productItems } from './productItem';
import { InferSelectModel } from 'drizzle-orm';

export const productSerials = pgTable(
  'serial_numbers',
  {
    id: serial('id').primaryKey(),
    serialNumber: varchar('serial_number', { length: 100 }).notNull().unique(),
    productItemId: integer('product_item_id').references(() => productItems.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('serial_numbers_id_idx').on(table.id),
      serialNumberIdx: index('serial_numbers_serial_number_idx').on(table.serialNumber),
      productItemIdIdx: index('serial_numbers_product_item_id_idx').on(table.productItemId),
    };
  },
);

export type ProductSerial = InferSelectModel<typeof productSerials>;
