const db = require("../config/db");
const moment = require("moment");

moment.locale("uk");

module.exports = (io, socket) => {
  socket.on("setOnlineStatus", async (data) => {
    if (data.online) {
      await db.query(
        `UPDATE users SET was_online = 0 WHERE id = "${data.user_id}"`
      );

      data.was_online = 0;
    } else {
      await db.query(
        `UPDATE users SET was_online = "${moment().unix()}" WHERE id = "${
          data.user_id
        }"`
      );

      data.was_online = moment().unix();
    }

    console.log(data);

    io.emit("setOnlineStatus", data);
  });
};
