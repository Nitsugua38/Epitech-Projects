require("dotenv").config();
const mysql = require('mysql2');
var express = require('express');
var cors = require('cors');
var app = express()
const bcrypt = require(`bcryptjs`);
var jwt = require('jsonwebtoken');
const { jobs } = require("./routes/jobs");
const { register } = require("./routes/register");
const { login } = require("./routes/login");



const pool = mysql.createPool({
  host: 'db',
  user: "root",
  database: process.env.DB_NAME,
  password:process.env.DB_ROOT_PASSWORD,
});

const promisePool = pool.promise();

app.use(cors())
app.use(express.json());





//jobs list
app.get('/api/jobs', jobs);

//register
app.post('/api/register', register);

//login
app.post('/api/login', login);



app.listen(process.env.PORT, function () {
  console.log(`web server listening on port ${process.env.PORT}`)
  console.log("db name is " + process.env.DB_NAME)
})