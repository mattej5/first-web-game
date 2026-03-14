import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "post-clicks.sqlite");

type GlobalWithDb = typeof globalThis & {
  __postClicksDb?: Database.Database;
};

function initializeDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS post_clicks (
      slug TEXT PRIMARY KEY,
      click_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

function getDatabase() {
  const globalWithDb = globalThis as GlobalWithDb;
  if (!globalWithDb.__postClicksDb) {
    globalWithDb.__postClicksDb = initializeDatabase();
  }

  return globalWithDb.__postClicksDb;
}

export function incrementPostClick(slug: string) {
  const db = getDatabase();
  const statement = db.prepare(`
    INSERT INTO post_clicks (slug, click_count)
    VALUES (@slug, 1)
    ON CONFLICT(slug) DO UPDATE SET
      click_count = click_count + 1,
      updated_at = CURRENT_TIMESTAMP
    RETURNING click_count
  `);

  const result = statement.get({ slug }) as { click_count: number } | undefined;
  return result?.click_count as number;
}

export function getPostClickCount(slug: string) {
  const db = getDatabase();
  const statement = db.prepare(
    "SELECT click_count FROM post_clicks WHERE slug = ?"
  );
  const result = statement.get(slug) as { click_count: number } | undefined;
  return (result?.click_count as number) ?? 0;
}
