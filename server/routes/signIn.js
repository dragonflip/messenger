const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const crypto = require("crypto");
require("dotenv").config();

router.post("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM login_codes WHERE email = "${req.body.email}" AND login_code = "${req.body.login_code}"`
  );

  if (result.length > 0) {
    const token = crypto.randomBytes(32).toString("hex");

    await db.query(`DELETE FROM login_codes WHERE email = "${req.body.email}"`);
    await db.query(
      `UPDATE users SET token = "${token}" WHERE email = "${req.body.email}"`
    );

    res.json({ token });
  } else {
    res.json({ token: null });
  }
});

module.exports = router;
