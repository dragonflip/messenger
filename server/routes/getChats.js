const { Router } = require("express");
const router = Router();
const db = require("../config/db");

const moment = require("moment");

router.get("/:token", async (req, res) => {
  let [chats] = await db.query(
    `SELECT *, messages.id AS id, users.id AS user_id FROM messages INNER JOIN users ON users.id = messages.to_id OR users.id = messages.from_id
    WHERE ( messages.to_id = (SELECT id FROM users WHERE token = '${req.params.token}') OR messages.from_id = (SELECT id FROM users WHERE token = '${req.params.token}') ) AND users.token != '${req.params.token}'
    AND messages.id IN ( SELECT MAX(messages.id) AS maxid FROM messages INNER JOIN users ON users.id = messages.to_id OR users.id = messages.from_id
    WHERE ( messages.to_id = (SELECT id FROM users WHERE token = '${req.params.token}') OR messages.from_id = (SELECT id FROM users WHERE token = '${req.params.token}') ) AND users.token != '${req.params.token}'
    GROUP BY users.id ORDER BY messages.id DESC ) ORDER BY messages.id DESC`
  );

  let [unread_count] = await db.query(
    `SELECT id, from_id, COUNT(message) AS unread_count FROM messages WHERE to_id = (SELECT id FROM users WHERE token = "${req.params.token}") AND has_read = 0 GROUP BY from_id ORDER BY id DESC`
  );

  moment.locale("uk");

  chats.forEach((chat) => {
    // chat.sent_date = moment.unix(chat.sent_date).fromNow();
    chat.sent_date = moment.unix(chat.sent_date).format("HH:mm");

    if (chat.was_online > moment().unix()) {
      chat.online = true;
    } else {
      chat.online = false;
      chat.was_online = moment.unix(chat.was_online).fromNow();
    }

    unread_count.forEach((count) => {
      if (count.from_id === chat.from_id) {
        chat.unread_count = count.unread_count;
      }
    });
  });

  res.json(chats);
});

module.exports = router;
