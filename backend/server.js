const express = require("express");
const cors = require("cors");
const db = require("./database");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

// Increase payload limit because screenshots are large
app.use(express.json({ limit: "20mb" }));

const screenshotDir = path.join(__dirname, "screenshots");

fs.ensureDirSync(screenshotDir);

app.post("/activity", async (req, res) => {

    try {

        const { title, url, timestamp, screenshot } = req.body;

        let screenshotPath = "";

        if (screenshot) {

            const base64Data = screenshot.replace(/^data:image\/png;base64,/, "");

            const filename = uuidv4() + ".png";

            screenshotPath = path.join(screenshotDir, filename);

            fs.writeFileSync(screenshotPath, base64Data, "base64");
        }

        db.run(
            `INSERT INTO activities(title,url,timestamp,screenshot)
             VALUES(?,?,?,?)`,
            [title, url, timestamp, screenshotPath],
            function(err){

                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    success:true,
                    id:this.lastID,
                    screenshot:screenshotPath
                });

            }
        );

    } catch(error){

        console.log(error);

        res.status(500).json(error);

    }

});

app.get("/activities",(req,res)=>{

    db.all("SELECT * FROM activities",[],(err,rows)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(rows);

    });

});

app.listen(5000,()=>{

    console.log("Server running on http://localhost:5000");

});