const { getRecommendations } = require("./index.js");
const { fetchJobsList } = require("../routes/jobs.js");
const { promisePool } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const DOMMatrix = require("@thednp/dommatrix");
global.DOMMatrix = global.DOMMatrix || DOMMatrix;
const pdfParse = require("pdf-parse");

const getRecommendedJobs = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const [rows] = await promisePool.query(
            "SELECT cv FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0 || !rows[0].cv) {
            return res.status(400).json({ error: "No CV found" });
        }

        const cvPath = rows[0].cv;
        const dataBuffer = fs.readFileSync(cvPath);
        const pdfData = await pdfParse(dataBuffer);
        const userProfileText = pdfData.text;

        const offers = await fetchJobsList(0, 100);

        const recommendations = await getRecommendations(userProfileText, offers);

        res.json({ recommendations });

    } catch (error) {
        res.status(500).json({ error: "Error processing recommendations" });
    }
};

module.exports = {
    getRecommendedJobs
};