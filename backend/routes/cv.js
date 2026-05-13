const { promisePool } = require("../db/db.js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.join(__dirname, "../uploads/cvs");
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });





const uploadCv = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!req.file) {
            return res.status(400).json({ error: "No file" });
        }

        const filePath = req.file.path;

        await promisePool.query(
            "UPDATE users SET cv = ? WHERE id = ?",
            [filePath, userId]
        );

        res.json({ message: "CV uploaded", path: filePath });

    } catch (error) {
        res.status(500).json({ error: "CV error" });
    }
};


module.exports = {
    upload,
    uploadCv
};
