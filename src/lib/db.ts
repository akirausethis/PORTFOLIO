import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio.db');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
