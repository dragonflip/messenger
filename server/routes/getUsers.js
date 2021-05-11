const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  let [users] = await db.query(`SELECT * FROM users`);

  if (users.length > 0) {
    res.json(users);
  } else {
    res.json({ users: null });
  }
});

module.exports = router;
