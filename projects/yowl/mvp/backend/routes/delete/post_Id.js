const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).send({ msg: "ID de post invalide." });
    }

    db.query(`DELETE FROM posts WHERE id = ?`, [id], (err, rows) => {
      if (err) {
        console.error("SQL error:", err);
        return res.status(500).send({ msg: "Erreur SQL lors de la suppression." });
      }

      if (rows.affectedRows === 0) {
        return res.status(404).send({ msg: "Post non trouvé." });
      }

      res.status(200).send({ msg: `Post ${id} supprimé avec succès.` });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur serveur." });
  }
});

module.exports = router;
