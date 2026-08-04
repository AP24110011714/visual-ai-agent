const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./activities.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            url TEXT,
            timestamp TEXT,
            screenshot TEXT,
            ocr_text TEXT
        )
    `);
});

module.exports = db;