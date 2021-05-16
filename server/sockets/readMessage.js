const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("readMessage", async (data) => {
    await db.query(
      `UPDATE messages SET has_read = 1 WHERE messages.to_id = '${data.to_id}' AND messages.from_id = '${data.from_id}'`
    );

    io.emit("readMessage", data);
  });
};
