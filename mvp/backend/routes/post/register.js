const express = require("express");
const db = require("../../config/db");
const bcrypt = require("bcryptjs");

const router = express.Router();
const salt = bcrypt.genSaltSync(10);


router.post("/register", async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Email manquant." });
  }
  db.query(
    `SELECT id FROM user WHERE email = ?`,
    [req.body.email],
    async (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la vérification de l'utilisateur." });
      }
      if (rows.length > 0) {
        return res.status(409).json({ msg: "Account already exists." });
      } else {
        const hash = await bcrypt.hash(req.body.password, salt);
        try {
          db.query(
            `INSERT INTO  user (email, password, name, firstname) VALUES (?, ?, ?, ?)`,
            [req.body.email, hash, req.body.name, req.body.firstname],
            (err, rows, fields) => {
              if (err) throw err;
              res.status(200).json({ message: "ok" });
            }
          );
        } catch (error) {
          res.status(500).send("il y a eu une erreur" + error);
        }
      }
    }
  );
});
module.exports = router;