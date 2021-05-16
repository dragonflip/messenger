const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.get("/:token/:to_id", async (req, res) => {
  let [chats] = await db.query(
    `SELECT * FROM messages WHERE ( messages.from_id = (SELECT id FROM users WHERE token = '${req.params.token}') OR messages.to_id = (SELECT id FROM users WHERE token = '${req.params.token}') ) AND ( messages.from_id = (SELECT id FROM users WHERE id = '${req.params.to_id}') OR messages.to_id = (SELECT id FROM users WHERE id = '${req.params.to_id}')) ORDER BY id DESC LIMIT 50`
  );
  chats = chats.reverse();

  await db.query(
    `UPDATE messages SET has_read = 1 WHERE messages.to_id = (SELECT id FROM users WHERE token = '${req.params.token}') AND messages.from_id = '${req.params.to_id}'`
  );

  moment.locale("uk");

  chats.forEach((el) => {
    el.sent_date = moment.unix(el.sent_date).format("HH:mm");
  });

  res.json(chats);
});

module.exports = router;
