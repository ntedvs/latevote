import { sql } from "drizzle-orm"
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core"

const uuid = text()
  .primaryKey()
  .default(sql`gen_random_uuid()`)

export const organizationsTable = pgTable("organizations", {
  id: uuid,
  name: text().notNull(),
})

export const usersTable = pgTable("users", {
  id: uuid,
  email: text().notNull().unique(),
  name: text().notNull(),

  organizationId: text().references(() => organizationsTable.id, {
    onDelete: "cascade",
  }),
})

export const sessionsTable = pgTable("sessions", {
  sessionToken: text().primaryKey(),
  expires: timestamp().notNull(),

  userId: text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
})

export const verificationsTable = pgTable(
  "verifications",
  {
    identifier: text().notNull(),
    token: text().notNull(),
    expires: timestamp().notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
)
