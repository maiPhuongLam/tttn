import {
  pgTable,
  serial,
  timestamp,
  integer,
  pgEnum,
  real,
  index,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { orders } from './order';
import { productSerials } from './productSerial';

export const orderDetails = pgTable(
  'order_details',
  {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
      .references(() => orders.id)
      .notNull(),
    productSerial: varchar('product_serial')
      .references(() => productSerials.serialNumber)
      .notNull(),
    quantity: integer('quantity').notNull(),
    price: real('price').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('order_details_products_id_idx').on(table.id),
      orderIdIdx: index('order_details_products_order_id_idx').on(table.orderId),
      produdctSerialIdIdx: index('order_details_products_produdct_serial_id_idx').on(
        table.productSerial,
      ),
    };
  },
);

export type OrderDetail = InferSelectModel<typeof orderDetails>;
