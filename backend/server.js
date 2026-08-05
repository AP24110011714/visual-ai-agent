const express = require("express");
const cors = require("cors");
const db = require("./database");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const extractText = require("./ocr");
const generateAISummary = require("./ai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const screenshotDir = path.join(__dirname, "screenshots");
fs.ensureDirSync(screenshotDir);

// Serve screenshots to the dashboard
app.use("/screenshots", express.static(screenshotDir));

app.post("/activity", async (req, res) => {

    try {

        const { title, url, timestamp, screenshot } = req.body;

        let screenshotPath = "";
        let ocrText = "";
        let aiSummary = "";

        if (screenshot) {

            const base64Data = screenshot.replace(
                /^data:image\/png;base64,/,
                ""
            );

            const filename = uuidv4() + ".png";

            screenshotPath = path.join(screenshotDir, filename);

            fs.writeFileSync(screenshotPath, base64Data, "base64");

            console.log("Screenshot saved:", screenshotPath);

            // OCR
            ocrText = await extractText(screenshotPath);

            console.log("OCR Completed");

            // AI Analysis
            aiSummary = JSON.stringify(
                generateAISummary(title, url, ocrText),
                null,
                2
            );

            console.log("AI Analysis Completed");
        }

        db.run(
            `
            INSERT INTO activities
            (title, url, timestamp, screenshot, ocr_text, ai_summary)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                title,
                url,
                timestamp,
                screenshotPath,
                ocrText,
                aiSummary
            ],
            function (err) {

                if (err) {
                    console.error(err);
                    return res.status(500).json(err);
                }

                res.json({
                    success: true,
                    id: this.lastID,
                    ai_summary: aiSummary
                });

            }
        );

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

app.get("/activities", (req, res) => {

    db.all(
        "SELECT * FROM activities ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

});

app.listen(5000, () => {

    console.log("Server running on http://localhost:5000");

});