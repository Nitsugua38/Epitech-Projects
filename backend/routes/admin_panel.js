const jwt = require("jsonwebtoken");
const { promisePool } = require("../db/db.js");

const getUserList = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = decoded.userId;
        const [currentUser] = await promisePool.query(
            "SELECT role FROM users WHERE id = ?",
            [requesterId]
        );

        if (currentUser.length === 0 || currentUser[0].role !== "admin") {
            return res.status(403).json({ error: "Accès refusé" });
        }
        const [rows] = await promisePool.query(
            "SELECT id, email, nom, prenom, role FROM users"
        );

    res.status(200).json({
    total: rows.length,
    users: rows});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

const updateUserRole = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = decoded.userId;
        
        const [currentUser] = await promisePool.query(
            "SELECT role FROM users WHERE id = ?",
            [requesterId]
        );
        
        if (currentUser.length === 0 || currentUser[0].role !== "admin") {
            return res.status(403).json({ error: "Accès refusé" });
        }
        const userId = req.params.id;
        const newRole = req.body.role;
        await promisePool.query(
            "UPDATE users SET role = ? WHERE id = ?",
            [newRole, userId]
        );
        res.status(200).json({ message: "Rôle modifié avec succès" });} 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur serveur" });
    }};

module.exports = {
    getUserList,
    updateUserRole
};