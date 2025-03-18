import { sql } from "drizzle-orm"
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core"

export const groupsTable = pgTable("groups", {
  id: serial().primaryKey(),
  name: text().notNull(),
})

export const questionsTable = pgTable("questions", {
  id: serial().primaryKey(),
  text: text().notNull(),
  size: integer().notNull(),

  groupId: integer()
    .notNull()
    .references(() => groupsTable.id, { onDelete: "cascade" }),
})

export const votesTable = pgTable(
  "votes",
  {
    id: serial().primaryKey(),

    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    questionId: integer()
      .notNull()
      .references(() => questionsTable.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.userId, table.questionId)],
)

export const nomineesTable = pgTable(
  "nominees",
  {
    voteId: integer()
      .notNull()
      .references(() => votesTable.id, { onDelete: "cascade" }),
    userId: text()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.voteId, table.userId] })],
)

export const usersTable = pgTable("users", {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text().notNull(),
  email: text().notNull().unique(),
  admin: boolean().notNull().default(false),

  groupId: integer()
    .notNull()
    .references(() => groupsTable.id, { onDelete: "cascade" }),
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
