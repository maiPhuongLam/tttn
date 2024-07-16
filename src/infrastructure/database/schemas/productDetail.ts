import { pgTable, serial, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const productDetails = pgTable('product_details', {
  id: serial('id').primaryKey(),
  screenSize: varchar('screenSize').notNull(),
  battery: varchar('battery').notNull(),
  camera: varchar('camera').notNull(),
  processor: varchar('processor').notNull(),
  isDelete: boolean('is_delete').default(false),
  os: varchar('os').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ProductDetail = InferSelectModel<typeof productDetails>;
