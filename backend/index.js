require("dotenv").config();
const mysql = require('mysql2');
var express = require('express');
var cors = require('cors');
var app = express()

const pool = mysql.createPool({
  host: 'db',
  user: "root",
  database: process.env.DB_NAME,
  password:process.env.DB_ROOT_PASSWORD,
});

const promisePool = pool.promise();


app.use(cors())
app.get('/api/test/', function (req, res, next) {
  res.json({msg: 'Lien obtenu avvec succèes'})
})

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(process.env.PORT, function () {
  console.log(`web server listening on port ${process.env.PORT}`)
  console.log("db name is " + process.env.DB_NAME)
})
