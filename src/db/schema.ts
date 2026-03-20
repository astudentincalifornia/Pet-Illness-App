import { type PetTypeId } from "@/features/pets/constants/petTypes";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const petsTable = sqliteTable(
  "pets",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    brief: text().notNull(),
    emergency_vet_phone: text().notNull(),
    type_id: text().notNull().$type<PetTypeId>(),
  },
  (table) => [index("idx_pets_type_id").on(table.type_id)],
);
