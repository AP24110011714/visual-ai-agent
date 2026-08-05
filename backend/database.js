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
            ocr_text TEXT,
            ai_summary TEXT
        )
    `);

    db.all("PRAGMA table_info(activities)", [], (err, rows) => {

        if (err) {
            console.error(err);
            return;
        }

        const columns = rows.map(row => row.name);

        if (!columns.includes("ai_summary")) {

            db.run(
                "ALTER TABLE activities ADD COLUMN ai_summary TEXT",
                (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Added ai_summary column.");
                    }
                }
            );

        }

    });

});

module.exports = db;