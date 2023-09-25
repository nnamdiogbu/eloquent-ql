import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

let db: DataSource;

export async function initializedDB() {
  if (db?.isInitialized) {
    console.log("db already initialized");
    return db;
  }
  db = await datasource.initialize();
  return db;
}
