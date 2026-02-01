const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.patch("/:id", (req, res) => {
  const postId = req.params.id;

  const sql = `
    UPDATE posts
    SET likecount = likecount + 1
    WHERE id = ?
  `;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    res.json({ message: "Like ajouté" });
  });
});


module.exports = router;