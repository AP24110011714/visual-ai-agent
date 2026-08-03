db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS activities (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT,

            url TEXT,

            timestamp TEXT,

            ocr_text TEXT

        )
    `);

});