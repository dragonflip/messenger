const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  let [results] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}" AND login_code = "${req.body.code}"`
  );

  //let step = req.body.formStep;

  let Code = randomNumber(10000, 99999);

  // transporter.sendMail({
  //   to: req.body.email,
  //   subject: "Підтвердження електронної пошти",
  //   text: `Доброго дня. Для входу в обліковий запис введіть цей код : ${Code}"`,
  // });

  if (result.length > 0) {
    await db.query(
      `UPDATE users SET login_code = '${Code}' WHERE id = ${result[0].id}`
    );

    res.json({ need_register: false });
  } else {
    res.json({ need_register: true });
  }
});

module.exports = router;
