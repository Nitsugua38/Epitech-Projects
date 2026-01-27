const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json());


app.get("/login", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});