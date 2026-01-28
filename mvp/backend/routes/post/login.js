const express = require("express");
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ 
      error: "Tous les champs sont requis : email, password." 
    });
  }
  try {
    db.query(`SELECT ID, email, password FROM user WHERE email=(?) `, [req.body.email] , async (err, row, fields) => {
      if (err) throw err;
      if (row.length >= 1) {
        const user = row[0];
          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if (isMatch) {
            return res.status(200).json({ msg: "bienvenue a vous cher user" });
          }
        return res.status(401).json({ msg: "Invalid Credentials" });
      } else return res.status(401).json({ msg: "Invalid Credentials" })
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;