const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const nodemailer = require("nodemailer");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

router.post("/", async (req, res) => {
  /*let [result] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );*/
  let [results] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}" AND login_code = "${req.body.code}"`
  );

  let Code = randomNumber(10000, 99999);
  //let step = req.body.formStep;

   transporter.sendMail({
     to: req.body.email,
     subject: "Підтвердження електронної пошти",
     text: `Доброго дня. Для входу в обліковий запис введіть цей код : ${Code}"`,
   });
   
  var crypto = require('crypto');
  if (results.length > 0) {
    
    res.json({ token: crypto.randomBytes(32).toString('hex') });
  } else {
    res.json({ token: null });
  }
});

module.exports = router;
