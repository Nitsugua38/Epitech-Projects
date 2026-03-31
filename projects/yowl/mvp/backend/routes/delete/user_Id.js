const express=require("express") 
const db = require("../../config/db");
const router=express.Router()

router.delete("/:id", (req, res) => {

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "ID manquant" });
  }

  try {
    db.query(`DELETE FROM user WHERE user.id = ?`,[req.params.id], (err, rows, fields) => {
    if (err) throw err
    res.status(200).send({"msg": `Successfully deleted record number: ${req.params.id}`})
    })
  } catch (error) {
    res.status(404).send({"msg": `Utilisateur introuvable: ${error}`})
  }
})

module.exports=router