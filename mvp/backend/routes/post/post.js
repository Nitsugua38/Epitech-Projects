const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post("/:id", (req, res) => {
  const { title, description, likecount} = req.body;

  if (!title || !description  || !likecount) {
    return res.status(400).json({ msg: "Champs manquants: title, description, likecount" });
  }
  db.query(
    `INSERT INTO posts (title, description, likecount, user_id)
     VALUES (?, ?, ?, ?)`,
    [title, description || null, likecount, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Erreur serveur" });
      }

      res.status(201).json({
        msg: "post créée",
        post_id: result.insertId,
      });
    }
  );
});

module.exports = router;