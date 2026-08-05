const express = require("express");
const cors = require("cors");
const db = require("./database");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const extractText = require("./ocr");

const app = express();

app.use(cors());

app.use(
  "/screenshots",
  express.static(path.join(__dirname, "screenshots"))
);

app.use(express.json({ limit: "20mb" }));

const screenshotDir = path.join(__dirname, "screenshots");
fs.ensureDirSync(screenshotDir);

app.post("/activity", async (req, res) => {
  try {
    const { title, url, timestamp, screenshot } = req.body;

    let screenshotPath = "";
    let ocrText = "";

    if (screenshot) {
      const base64Data = screenshot.replace(
        /^data:image\/png;base64,/,
        ""
      );

      const filename = uuidv4() + ".png";

      screenshotPath = path.join(screenshotDir, filename);

      fs.writeFileSync(screenshotPath, base64Data, "base64");

      console.log("Screenshot saved:", screenshotPath);

      ocrText = await extractText(screenshotPath);

      console.log("OCR Result:");
      console.log(ocrText);
    }

    db.run(
      `INSERT INTO activities
      (title,url,timestamp,screenshot,ocr_text)
      VALUES(?,?,?,?,?)`,
      [
        title,
        url,
        timestamp,
        screenshotPath,
        ocrText
      ],
      function (err) {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          success: true,
          id: this.lastID,
          screenshot: screenshotPath,
          ocr: ocrText
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