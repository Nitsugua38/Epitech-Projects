const jwt = require("jsonwebtoken");
const { promisePool } = require("../db/db.js");
const path = require("path")

const checkCompanyAccess = async (req, res) => {
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

        if (currentUser.length === 0 || currentUser[0].role !== "company") {
            return res.status(403).json({ error: "Accès refusé" });
        }

        res.status(200).json({ message: "Accès autorisé" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erreur serveur" });
    }
};

const getCompanyApplications = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = decoded.userId;

        const [currentUser] = await promisePool.query(
            "SELECT role, nom FROM users WHERE id = ?",
            [requesterId]
        );

        if (currentUser.length === 0 || currentUser[0].role !== "company") {
            return res.status(403).json({ error: "Accès refusé" });
        }

        const companyName = currentUser[0].nom;
        const [applications] = await promisePool.query(
            "SELECT a.id, a.user_id, a.title, a.status, u.nom, u.prenom, u.email, u.cv FROM applied_offers a JOIN users u ON a.user_id = u.id WHERE BINARY a.company = ? AND u.role NOT IN ('admin', 'company')",
            [companyName]
        );

        res.status(200).json({ applications: applications });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

const updateApplicationStatus = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token" });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = decoded.userId;

        const [currentUser] = await promisePool.query(
            "SELECT role, nom FROM users WHERE id = ?",
            [requesterId]
        );

        if (currentUser.length === 0 || currentUser[0].role !== "company") {
            return res.status(403).json({ error: "Accès refusé" });
        }
        const companyName = currentUser[0].nom;
        const appId = req.params.id;
        const newStatus = req.body.status;

        const [appCheck] = await promisePool.query(
            "SELECT company FROM applied_offers WHERE id = ?",
            [appId]
        );

        console.log(appCheck)

        if (appCheck.length === 0 || appCheck[0].company !== companyName) {
            return res.status(403).json({ error: "Accès refusé" });
        }
        await promisePool.query(
            "UPDATE applied_offers SET status = ? WHERE id = ?",
            [newStatus, appId]
        );
        res.status(200).json({ message: "Statut modifié avec succès" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};



const getCV = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ error: "No token" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = decoded.userId;

        const [currentUser] = await promisePool.query(
            "SELECT role FROM users WHERE id = ?",
            [requesterId]
        );

        if (currentUser.length === 0 || currentUser[0].role !== "company") {
            return res.status(403).json({ error: "Accès refusé" });
        }

        const filename = req.params.filename;
        const filePath = path.join(__dirname, "../uploads/cvs/", filename);

        res.sendFile(filePath);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};



module.exports = {
    checkCompanyAccess,
    getCompanyApplications,
    updateApplicationStatus,
    getCV
};