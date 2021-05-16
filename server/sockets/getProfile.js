const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("getProfile", async (data) => {
    let [user] = await db.query(`SELECT * FROM users WHERE id = '${data.id}'`);

    socket.emit("getProfile", user[0]);
  });
};
