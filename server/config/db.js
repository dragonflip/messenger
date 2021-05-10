const mysql = require("mysql2");
require("dotenv").config();

const db = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USER,
  })
  .promise();

db.connect().then(async () => {
  console.log("MySQL connected");

  await db.query(`SET sql_mode = ''`);

  setInterval(function () {
    db.query("SELECT 1");
  }, 60000);
});

module.exports = db;
