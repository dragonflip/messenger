const db = require("../config/db");

const crypto = require("crypto");
require("dotenv").config();

module.exports = (io, socket) => {
  socket.on("signIn", async (data) => {
    const email = db.esc(data.email);
    const login_code = db.esc(data.login_code);

    let [result] = await db.query(
      `SELECT * FROM login_codes WHERE email = "${email}" AND login_code = "${login_code}"`
    );

    if (result.length > 0) {
      const token = crypto.randomBytes(32).toString("hex");

      await db.query(`DELETE FROM login_codes WHERE email = "${email}"`);
      await db.query(
        `UPDATE users SET token = "${token}" WHERE email = "${email}"`
      );

      socket.emit("signIn", { token: token });
    } else {
      socket.emit("signIn", { token: null });
    }
  });
};
