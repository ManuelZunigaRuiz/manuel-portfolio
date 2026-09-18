import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contactMessages = pgTable("contact_messages", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
