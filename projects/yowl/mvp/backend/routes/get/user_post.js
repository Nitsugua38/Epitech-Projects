const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.get("/post/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM posts WHERE user_id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
