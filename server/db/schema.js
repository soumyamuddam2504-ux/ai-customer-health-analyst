const db = require('./database');

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      industry TEXT,
      csm TEXT,
      last_login_days_ago INTEGER DEFAULT 0,
      usage_change_percent REAL DEFAULT 0,
      support_tickets_count INTEGER DEFAULT 0,
      nps_score INTEGER,
      renewal_days_left INTEGER,
      mrr REAL DEFAULT 0,
      plan TEXT DEFAULT 'Starter'
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { createTables };
