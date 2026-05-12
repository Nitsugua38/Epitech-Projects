require("dotenv").config();
var express = require('express');
var cors = require('cors');
var app = express()
const { jobs } = require("./routes/jobs");
const { register } = require("./routes/register");
const { login } = require("./routes/login");





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
})