const db = require("../config/db");
const moment = require("moment");
const crypto = require("crypto");

module.exports = (io, socket) => {
  socket.on("getMessages", async (data) => {
    let [messages] = await db.query(
      `SELECT * FROM messages WHERE ( messages.from_id = (SELECT id FROM users WHERE token = '${data.token}') OR messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') ) AND ( messages.from_id = (SELECT id FROM users WHERE id = '${data.to_id}') OR messages.to_id = (SELECT id FROM users WHERE id = '${data.to_id}')) ORDER BY id DESC LIMIT 50`
    );
    messages = messages.reverse();

    moment.locale("uk");

    messages.forEach((message) => {
      message.sent_date = moment.unix(message.sent_date).format("HH:mm");

      const decipher = crypto.createDecipheriv(
        "aes128",
        process.env.CIPHER_KEY,
        process.env.CIPHER_IV
      );

      try {
        message.message =
          decipher.update(message.message, "hex", "utf-8") +
          decipher.final("utf-8");
      } catch {}
    });

    socket.emit("getMessages", messages);
  });
};
