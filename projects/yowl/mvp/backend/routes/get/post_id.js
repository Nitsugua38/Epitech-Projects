const express=require("express") 
const db = require("../../config/db");
const router=express.Router()

router.get("/:id", (req, res) => {
  try {
    db.query(`SELECT * FROM posts WHERE posts.user_id = ${req.params.id}`, (err, rows, fields) => {
    if (err) throw err
    res.status(200).send(rows)
    })
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports=router