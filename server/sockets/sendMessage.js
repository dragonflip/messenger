const db = require("../config/db");
const moment = require("moment");


module.exports = (io, socket) => {
  socket.on("sendMessage", async (data) => {
    const CurrentDate = moment().unix();
    const message = db.esc(data.message);

    await db.query(
     `INSERT INTO messages(from_id, to_id, message, sent_date, has_read) VALUES ("${data.from_id}", "${data.to_id}", "${message}", "${CurrentDate}", 0)`
    );

    socket.emit("sendMessage", {ok : true});
  });
};
