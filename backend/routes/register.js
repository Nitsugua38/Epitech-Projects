const bcrypt = require("bcryptjs");
const { promisePool } = require("../db/db.js");

const register =async (req,res) => {
    const {name, email, password} = req.body;
    const salt =await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);
    try {
        await promisePool.query(
            "INSERT INTO users (email, password, nom, role) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, name, "user"]
        );
        res.status(201).json({ message: 'création réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la création du compte' });
    }
};


module.exports = {
    register
}