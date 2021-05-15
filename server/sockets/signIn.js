const db = require("../config/db");
const crypto = require("crypto");
require("dotenv").config();

module.exports = (io, socket) => {
  socket.on("signIn", async (data) => {
    let [result] = await db.query(
      `SELECT * FROM login_codes WHERE email = "${data.email}" AND login_code = "${data.login_code}"`
    );

    if (result.length > 0) {
      const token = crypto.randomBytes(32).toString("hex");

      await db.query(`DELETE FROM login_codes WHERE email = "${data.email}"`);
      await db.query(
        `UPDATE users SET token = "${token}" WHERE email = "${data.email}"`
      );

      socket.emit("signIn", { token: token });
    } else {
      socket.emit("signIn", { token: null });
    }
  });
};
