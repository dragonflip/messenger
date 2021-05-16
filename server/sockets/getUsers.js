const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("getUsers", async (data) => {
    let [users] = await db.query(`SELECT * FROM users`);

    if (users.length > 0) {
      socket.emit("getUsers", users);
    } else {
      socket.emit("getUsers", { users: null });
    }
  });
};
