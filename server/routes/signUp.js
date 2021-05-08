const { Router } = require("express");
const router = Router();
const db = require("../config/db");

//const nodemailer = require("nodemailer");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
  var crypto = require("crypto");
  let user = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    token: crypto.randomBytes(32).toString("hex"),
  };

  await db.query("INSERT INTO users set ?", user);

  res.json({ token: user.token });
});

module.exports = router;
