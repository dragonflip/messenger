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
  let [result] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );

  let Code = randomNumber(10000, 99999);

  transporter.sendMail({
    to: req.body.email,
    subject: "Підтвердження входу в обліковий запис",
    text: `Доброго дня. Код підтвердження входу в обліковий запис: ${Code}`,
  });

  if (result.length > 0) {
    let user = {
    email: req.body.email,
    login_code: Code,
  };
  await db.query("INSERT INTO login_codes set ?", user);

    res.json({ need_register: false });
  } else {
    res.json({ need_register: true });
  }
});

module.exports = router;
