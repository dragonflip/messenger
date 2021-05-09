const { Router } = require("express");
const router = Router();
const db = require("../config/db");


router.get("/:token", async (req, res) => {
  let [chats] = await db.query(


      `SELECT messages.from_id, users.firstname, users.lastname, messages.message, messages.sent_date, messages.has_read, 
      (SELECT COUNT(message) FROM messages WHERE to_id = (SELECT id FROM users WHERE token = ${req.params.token}) 
      AND has_read = 0) AS count FROM users INNER JOIN messages ON users.id = messages.from_id OR users.id = messages.to_id 
      WHERE users.token = ${req.params.token} AND messages.sent_date = (SELECT MAX(sent_date) FROM messages 
      WHERE from_id = (SELECT id FROM users WHERE token = ${req.params.token}) OR to_id = (SELECT id FROM users 
      WHERE token = ${req.params.token}))`
  )

  res.json(chats);
});

module.exports = router;