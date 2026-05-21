require("dotenv").config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db',
    user: "root",
    database: process.env.DB_NAME,
    password: process.env.DB_ROOT_PASSWORD,
});

const promisePool = pool.promise();

module.exports = {
    promisePool
}