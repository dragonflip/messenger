const db = require("../config/db");

const crypto = require("crypto");
require("dotenv").config();

module.exports = (io, socket) => {
  socket.on("signUp", async (data) => {
    let user = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      token: crypto.randomBytes(32).toString("hex"),
      bio: "",
    };

    await db.query(`INSERT INTO users set ?`, user);

    socket.emit("signUp", { token: user.token });
  });
};
