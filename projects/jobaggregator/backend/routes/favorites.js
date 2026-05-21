const { promisePool } = require("../db/db.js");
const jwt = require("jsonwebtoken");

const getFavorites = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const [rows] = await promisePool.query(
            "SELECT * FROM favorites WHERE user_id = ?",
            [userId]
        );
        res.json({ favorites: rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed" });
    }
};

const addFavorite = async (req, res) => {
    const { job } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        await promisePool.query(
            "INSERT INTO favorites (user_id, offer_id, title, company, location) VALUES (?, ?, ?, ?, ?)",
            [userId, job.id, job.title, job.company, job.location]
        );
        res.status(201).json({ message: "Saved" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed" });
    }
};

const removeFavorite = async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        await promisePool.query(
            "DELETE FROM favorites WHERE offer_id = ? AND user_id = ?",
            [id, userId]
        );
        res.status(200).json({ message: "Removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed" });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};