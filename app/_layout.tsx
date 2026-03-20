import { drizzle } from "drizzle-orm/expo-sqlite";
import { Stack } from "expo-router";
import * as SQLite from "expo-sqlite";
// import migrations from '../drizzle/migrations';

const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);

export default function RootLayout() {
  // const {success, error} = useMigrations(db, migrations);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Create Pet Profile",
        }}
      />
      <Stack.Screen
        name="pet/[petId]"
        options={{
          title: "Pet Details",
        }}
      />
    </Stack>
  );
}
