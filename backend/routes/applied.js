const { promisePool } = require("../db/db.js");
const jwt = require("jsonwebtoken");



const applyJob = async (req, res) => {
    const { job } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const date = new Date().toISOString().split('T')[0];
        const status = "en attente";

        await promisePool.query(
            "INSERT INTO applied_offers (user_id, offer_id, title, company, location, salary, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [userId, job.id, job.title, job.company, job.location, job.salary || null, date, status]
        );

        res.status(201).json({ message: "Application saved" });

    } catch (error) {
        res.status(500).json({ error: "Failed to save application" });
    }
};




const getAppliedJobIds = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return [];
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const [rows] = await promisePool.query(
            "SELECT offer_id FROM applied_offers WHERE user_id = ?",
            [userId]
        );

        const ids = rows.map(row => row.offer_id);
        return ids;
    } catch (error) {
        return [];
    }
};

module.exports = {
    applyJob,
    getAppliedJobIds
};
