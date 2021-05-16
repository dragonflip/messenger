const db = require("../config/db");
const moment = require("moment");

module.exports = (io, socket) => {
  socket.on("getUserID", async (data) => {
    let [user_id] = await db.query(
      `SELECT id FROM users WHERE token = '${data.token}'`
    );

    if (user_id.length > 0) {
      // SET online, (temp solution)
      await db.query(
        `UPDATE users SET was_online = "${
          moment().unix() + 60
        }" WHERE token = "${data.token}"`
      );

      socket.emit("getUserID", { user_id: user_id[0].id });
    } else {
      socket.emit("getUserID", { user_id: null });
    }
  });
};
