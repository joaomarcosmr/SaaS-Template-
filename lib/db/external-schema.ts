import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const authUsers = pgTable('auth.users', {
  id: uuid('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});
