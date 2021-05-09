const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:id", async (req, res) => {
  let [user] = await db.query(`SELECT * FROM users where id =${req.params.id}`);

  res.json(user[0]);
});

module.exports = router;
