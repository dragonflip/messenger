const { Router } = require("express");
const router = Router();
const db = require("../config/db");

router.get("/:token/:to_id", async (req, res) => {
  let [chats] = await db.query(
    `SELECT messages.from_id, messages.to_id, messages.message, messages.sent_date FROM messages WHERE 
    (messages.from_id = (SELECT id FROM users WHERE token = '${req.params.token}') OR messages.to_id = (SELECT id FROM users WHERE token = '${req.params.token}')) AND (messages.from_id = (SELECT id FROM users WHERE id = '${req.params.to_id}') OR messages.to_id = (SELECT id FROM users WHERE id = '${req.params.to_id}'))`
  );

  res.json(chats);
});

module.exports = router;
