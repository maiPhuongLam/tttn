import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';
import { addresses } from './address';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: text('password').notNull(),
    phoneNumber: text('phone_number').notNull().unique(),
    addressId: integer('address_id')
      .references(() => addresses.id, { onDelete: 'cascade' })
      .notNull(),
    rt: varchar('tr', { length: 256 }).unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('users_id_idx').on(table.id),
      emailIdx: index('users_email_idx').on(table.email),
      phoneNumberIdx: index('users_phone_number_idx').on(table.phoneNumber),
      nameIdx: index('users_name_idx').on(table.name),
    };
  },
);

export type User = InferSelectModel<typeof users>;
