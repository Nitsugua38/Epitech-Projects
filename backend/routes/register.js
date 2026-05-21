const bcrypt = require("bcryptjs");
const { promisePool } = require("../db/db.js");

const register = async (req, res) => {
    const { firstname, lastname, name, email, password } = req.body;
    const prenom = firstname || name || "";
    const nom = lastname || "";
    const salt =await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password, salt);
    try {
        await promisePool.query(
            "INSERT INTO users (email, password, nom, prenom, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, nom, prenom, "user"]
        );
        res.status(201).json({ message: 'creation reussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la creation du compte' });
    }
};


module.exports = {
    register
}