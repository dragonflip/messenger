const db = require("../config/db");
const moment = require("moment");
const crypto = require("crypto");

module.exports = (io, socket) => {
  socket.on("getChats", async (data) => {
    let [chats] = await db.query(
      `SELECT *, messages.id AS id, users.id AS user_id FROM messages INNER JOIN users ON users.id = messages.to_id OR users.id = messages.from_id
    WHERE ( messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') OR messages.from_id = (SELECT id FROM users WHERE token = '${data.token}') ) AND users.token != '${data.token}'
    AND messages.id IN ( SELECT MAX(messages.id) AS maxid FROM messages INNER JOIN users ON users.id = messages.to_id OR users.id = messages.from_id
    WHERE ( messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') OR messages.from_id = (SELECT id FROM users WHERE token = '${data.token}') ) AND users.token != '${data.token}'
    GROUP BY users.id ORDER BY messages.id DESC ) ORDER BY messages.id DESC`
    );

    let [unread_count] = await db.query(
      `SELECT id, from_id, COUNT(message) AS unread_count FROM messages WHERE to_id = (SELECT id FROM users WHERE token = "${data.token}") AND has_read = 0 GROUP BY from_id ORDER BY id DESC`
    );

    moment.locale("uk");

    chats.forEach((chat) => {
      if (
        moment.unix(moment().unix()).format("DD.MM.YYYY") !=
        moment.unix(chat.sent_date).format("DD.MM.YYYY")
      ) {
        chat.sent_date = moment.unix(chat.sent_date).format("DD.MM.YYYY");
      } else {
        chat.sent_date = moment.unix(chat.sent_date).format("HH:mm");
      }

      const decipher = crypto.createDecipheriv(
        "aes128",
        process.env.CIPHER_KEY,
        process.env.CIPHER_IV
      );

      try {
        chat.message =
          decipher.update(chat.message, "hex", "utf-8") +
          decipher.final("utf-8");
      } catch {}

      if (!chat.was_online) {
        chat.online = true;
      } else {
        chat.online = false;
        // chat.was_online = moment.unix().fromNow();
      }

      unread_count.forEach((count) => {
        if (count.from_id === chat.from_id) {
          chat.unread_count = count.unread_count;
        }
      });

      if (!chat.unread_count) {
        chat.unread_count = 0;
      }
    });

    socket.emit("getChats", chats);
  });
};
