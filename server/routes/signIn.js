const { Router } = require("express");
const router = Router();
const db = require("../config/db");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

router.post("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}" AND login_code = "${req.body.login_code}"`
  );

  let Code = randomNumber(10000, 99999);

  var crypto = require("crypto");
  if (result.length > 0) {
    res.json({ token: crypto.randomBytes(32).toString("hex") });
  } else {
    res.json({ token: null });
  }
});

module.exports = router;
