const { Router } = require("express");
const router = Router();
const db = require("../config/db");

require("dotenv").config();

router.post("/", async (req, res) => {
  let [result] = await db.query(
    `SELECT * FROM login_codes WHERE email = "${req.body.email}" AND login_code = "${req.body.login_code}"`
  );

  var crypto = require("crypto");
  if (result.length > 0) {
    res.json({ token: crypto.randomBytes(32).toString("hex") });
  } else {
    res.json({ token: null });
  }
});

module.exports = router;
