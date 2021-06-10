const mysql = require("mysql2");
require("dotenv").config();

const db = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

db.connect().then(async () => {
  await db.query(`SET sql_mode = ''`);

  setInterval(function () {
    db.query("SELECT 1");
  }, 60000);

  console.log("MySQL connected");
});

db.esc = function (arg) {
  if (db.escape(arg).slice(0)[0] == "'" && db.escape(arg).slice(-1)[0]) {
    return db.escape(arg).slice(1, -1);
  } else {
    return db.escape(arg);
  }
};

module.exports = db;
