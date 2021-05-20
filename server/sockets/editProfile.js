const db = require("../config/db");

module.exports = (io, socket) => {
  socket.on("editProfile", async (data) => {
    await db.query(
      `UPDATE users SET firstname = "${db.esc(data.firstname)}",
     lastname ="${db.esc(data.lastname)}", 
     email = "${db.esc(data.email)}", 
     bio = "${db.esc(data.bio)}", 
     profile_photo = "${db.esc(data.profile_photo)}" WHERE token = "${
        data.token
      }"`
    );

    io.emit("editProfile", data);
  });
};
