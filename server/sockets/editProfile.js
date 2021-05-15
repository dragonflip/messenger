const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("editProfile", async (data) => {
    await db.query(
    `UPDATE users SET firstname = "${data.firstname}", lastname ="${data.lastname}", email = "${data.email}", bio = "${data.bio}", profile_photo = "${data.profile_photo}" WHERE token = "${data.token}"`
    );

    socket.emit("editProfile", { ok: true })
  });
};