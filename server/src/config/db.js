import sqlite3 from "sqlite3"
import { open } from "sqlite"

export const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
});

await db.exec("PRAGMA foreign_keys = ON")

await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        direction TEXT,
        percent INTEGER,
        deadline TEXT,
        priority TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`);

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT
    )
`);