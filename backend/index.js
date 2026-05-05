require("dotenv").config();
const mysql = require('mysql2');
var express = require('express');
var cors = require('cors');
var app = express()
const bcrypt = require(`bcryptjs`);
var jwt = require('jsonwebtoken');

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

//register
const register =async (req,res) => {
  const {name, email, password} = req.body;
  const salt =await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(password, salt);
  try {
    await promisePool.query(
      "INSERT INTO users (email, password, nom, role) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, name, "user"]
    );
    res.status(201).json({ message: 'création réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'erreur lors de la création du compte' });
  }
};
app.post('/api/register', register);


//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows]= await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;}

    const storedHashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
      
    if (isPasswordValid) {
      const payload = {
        userId: user.id,
        username: user.prenom + "_" + user.nom,
      };
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secretKey, {
        expiresIn: '48h',  
      });
      console.log(token);
       res.status(200).json({ message: 'Login successful voici le token', token: token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }}

  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });}};

app.post('/api/login', login);



app.listen(process.env.PORT, function () {
  console.log(`web server listening on port ${process.env.PORT}`)
  console.log("db name is " + process.env.DB_NAME)
})