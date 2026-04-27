require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;



app.use(express.json());



app.get("/", (req, res) => {
    res.send("hello world");
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("db name is " + process.env.DB_NAME)
});