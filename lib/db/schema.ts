import { pgTable, serial, uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { authUsers } from "./external-schema";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  auth_id: uuid('auth_id')
    .references(() => authUsers.id)
    .notNull(),
  name: varchar('name', { length: 100 }),
  hasAccess: boolean('has_access').default(false).notNull(),
  planPriceId: varchar('plan_price_id', { length: 100 }),
  customerId: varchar('customer_id', { length: 100 }).unique(),
  notification: boolean('notification').default(true).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
