import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  username: text("username"),
  language_code: text("language_code"),
  added: timestamp("added").default(new Date()),
  user_id: text("user_id"),
});

export const filesTable = pgTable("files_table", {
  id: serial("id").primaryKey(),
  file_id: text("file_id"),
  file_url: text("file_url"),
  user_id: text("user_id"),
  added: timestamp("added").default(new Date()),
});
