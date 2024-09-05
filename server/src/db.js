// db.js
const sqlite3 = require("sqlite3").verbose();
const dbName = "movies.db";
const db = new sqlite3.Database(dbName);

// Crear la tabla de comentarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movieId INTEGER,
      text TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
