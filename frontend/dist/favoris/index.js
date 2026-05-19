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
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};

module.exports = {
    getFavorites
};