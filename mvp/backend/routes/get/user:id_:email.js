const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.get("/:value", (req, res) => {
  const { value } = req.params
  const query = value.includes("@")
    ? "SELECT * FROM `user` WHERE email = ?"
    : "SELECT * FROM `user` WHERE id = ?";
  db.query(query, [value], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.status(200).json(rows);
  });
});
module.exports = router;
