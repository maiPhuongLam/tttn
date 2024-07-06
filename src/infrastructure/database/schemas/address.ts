import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferColumnsDataTypes, InferInsertModel, InferSelectModel, Column } from 'drizzle-orm';

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  streetAddress: text('street_address'),
  wardOrCommune: text('ward/commune'),
  district: text('district'),
  cityOrProvince: text('city/province'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export type Address = InferSelectModel<typeof addresses>;
