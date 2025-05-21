import { sql } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

const uuid = text()
  .primaryKey()
  .default(sql`gen_random_uuid()`)

export const groupsTable = pgTable("groups", {
  id: uuid,
  name: text().notNull(),
})

export const roundsTable = pgTable("rounds", {
  id: uuid,
  name: text().notNull(),
  released: boolean().notNull().default(false),

  groupId: text()
    .notNull()
    .references(() => groupsTable.id, { onDelete: "cascade" }),
})

export const superlativesTable = pgTable("superlatives", {
  id: uuid,
  title: text().notNull(),
  slots: integer().notNull(),

  roundId: text()
    .notNull()
    .references(() => roundsTable.id, { onDelete: "cascade" }),
})

export const responsesTable = pgTable("responses", {
  id: uuid,
  votes: text().array().notNull(),

  userId: text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  superlativeId: text()
    .notNull()
    .references(() => superlativesTable.id, { onDelete: "cascade" }),
})

export const usersTable = pgTable("users", {
  id: uuid,
  email: text().notNull().unique(),
  name: text().notNull(),
  type: text({ enum: ["member", "leader", "admin"] })
    .notNull()
    .default("member"),

  groupId: text().references(() => groupsTable.id, { onDelete: "cascade" }),
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
