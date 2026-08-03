const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/activity", (req, res) => {

    const { title, url, timestamp } = req.body;

    db.run(
        "INSERT INTO activities(title, url, timestamp) VALUES (?, ?, ?)",
        [title, url, timestamp],
        function (err) {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Activity saved successfully",
                id: this.lastID
            });

        }
    );

});

app.get("/activities", (req, res) => {

    db.all("SELECT * FROM activities", [], (err, rows) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);

    });

});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});