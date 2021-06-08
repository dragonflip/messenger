const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("deleteChat", async (data) => {
    await db.query(
      `DELETE FROM messages WHERE ( from_id = '${data.from_id}' AND to_id = '${data.to_id}' ) OR ( from_id = '${data.to_id}' AND to_id = '${data.from_id}' )`
    );

    console.log(data);

    io.emit("deleteChat", data);
  });
};
