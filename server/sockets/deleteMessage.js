const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("deleteMessage", async (data) => {
    await db.query(`DELETE FROM messages WHERE id = '${data.id}'`);

    socket.emit("deleteMessage", { ok: true })
  });
};