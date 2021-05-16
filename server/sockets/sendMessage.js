const db = require("../config/db");
const moment = require("moment");

module.exports = (io, socket) => {
  socket.on("sendMessage", async (data) => {
    const CurrentDate = moment().unix();
    const message = db.esc(data.message);

    let [res] = await db.query(
      `INSERT INTO messages(from_id, to_id, message, sent_date, has_read) VALUES ("${data.from_id}", "${data.to_id}", "${message}", "${CurrentDate}", 0)`
    );

    data.sent_date = moment.unix(moment().unix()).format("HH:mm");
    data.id = res.insertId;

    console.log(data);

    io.emit("sendMessage", data);
  });
};
