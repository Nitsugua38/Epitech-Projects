require("dotenv").config();
var express = require('express');
var cors = require('cors');
var app = express();
const apiRoutes = require("./routes/routes.js");

app.use(cors());
app.use(express.json());

// Use the API routes
app.use('/api', apiRoutes);


const PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log(`web server listening on port ${PORT}`)
})