import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  real,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const productDetails = pgTable('product_details', {
  id: serial('id').primaryKey(),
  screenSize: varchar('screenSize').notNull(),
  battery: varchar('name').notNull(),
  camera: varchar('name').notNull(),
  processor: varchar('name').notNull(),
  ram: varchar('name').notNull(),
  storage: integer('stock').notNull(),
  os: varchar('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ProductDetail = InferSelectModel<typeof productDetails>;
