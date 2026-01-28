const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post("/", (req, res) => {
  const { title, description, due_time } = req.body;

  if (!title || !due_time) {
    return res.status(400).json({ msg: "Champs manquants" });
  }

  if (!req.user || !req.user.user_id) {
    return res.status(401).json({ msg: "Non autorisé" });
  }

  db.query(
    `INSERT INTO posts (title, description, due_time, user_id)
     VALUES (?, ?, ?, ?)`,
    [title, description || null, due_time, req.user.user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Erreur serveur" });
      }

      res.status(201).json({
        msg: "Todo créée",
        todo_id: result.insertId,
      });
    }
  );
});
module.exports = router;
