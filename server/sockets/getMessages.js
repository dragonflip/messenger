const db = require("../config/db");
const moment = require("moment");

module.exports = (io, socket) => {
  socket.on("getMessages", async (data) => {
    let [messages] = await db.query(
      `SELECT * FROM messages WHERE ( messages.from_id = (SELECT id FROM users WHERE token = '${data.token}') OR messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') ) AND ( messages.from_id = (SELECT id FROM users WHERE id = '${data.to_id}') OR messages.to_id = (SELECT id FROM users WHERE id = '${data.to_id}')) ORDER BY id DESC LIMIT 50`
    );
    messages = messages.reverse();

    // await db.query(
    //   `UPDATE messages SET has_read = 1 WHERE messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') AND messages.from_id = '${data.to_id}'`
    // );

    moment.locale("uk");

    messages.forEach((message) => {
      message.sent_date = moment.unix(message.sent_date).format("HH:mm");
    });

    socket.emit("getMessages", messages);
  });
};
