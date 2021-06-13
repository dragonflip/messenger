const db = require("../config/db");
const crypto = require("crypto");

module.exports = (io, socket) => {
  socket.on("editMessage", async (data) => {
    const cipher = crypto.createCipheriv(
      "aes128",
      process.env.CIPHER_KEY,
      process.env.CIPHER_IV
    );
    const message =
      cipher.update(db.esc(data.message), "utf-8", "hex") + cipher.final("hex");

    await db.query(
      `UPDATE messages SET message = '${message}' WHERE id = '${data.id}'`
    );

    io.emit("editMessage",data)
  });
};