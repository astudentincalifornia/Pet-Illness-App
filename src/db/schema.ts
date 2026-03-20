import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const petsTable = sqliteTable(
  "pets",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    brief: text().notNull(),
    emergency_vet_phone: text().notNull(),
    type_id: int().notNull(),
  },
  //   (table) => ({
  //     typeIdIndex: table.Index("type_id").on(table.type_id),
  //   }),
);
