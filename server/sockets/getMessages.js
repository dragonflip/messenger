const db = require("../config/db");
const moment = require("moment");


const crypto = require("crypto");
require("dotenv").config();

module.exports = (io, socket) => {
  socket.on("getMessages", async (data) => {
    let [chats] = await db.query(
     `SELECT * FROM messages WHERE ( messages.from_id = (SELECT id FROM users WHERE token = '${data.token}') OR messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') ) AND (messages.from_id = (SELECT id FROM users WHERE id = '${data.token}') OR messages.to_id = (SELECT id FROM users WHERE id = '${data.token}'))`
    );

    await db.query(
     `UPDATE messages SET has_read = 1 WHERE messages.to_id = (SELECT id FROM users WHERE token = '${data.token}') AND messages.from_id = '${data.token}'`
    );

    moment.locale("uk");

    chats.forEach((el) => {
        el.sent_date = moment.unix(el.sent_date).format("HH:mm");
    });

    socket.emit("getMessages", chats);
  });
};