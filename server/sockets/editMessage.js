const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("editMessage", async (data) => {
    await db.query(
    `UPDATE messages SET message = '${data.new_message}' WHERE id = '${data.id}'`
    );

    socket.emit("editMessage", { ok: true })
  });
};