const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const crypto = require("crypto");
require("dotenv").config();

router.post("/", async (req, res) => {
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
