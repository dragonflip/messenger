const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.get("/:token", async (req, res) => {
  let [user_id] = await db.query(
    `SELECT id FROM users WHERE token = '${req.params.token}'`
  );

  if (user_id.length > 0) {
    // SET online, (temp solution)
    await db.query(
      `UPDATE users SET was_online = "${moment().unix() + 60}" WHERE token = "${
        req.params.token
      }"`
    );

    res.json({ user_id: user_id[0].id });
  } else {
    res.json({ user_id: null });
  }
});

module.exports = router;
