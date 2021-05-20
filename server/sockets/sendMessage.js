const db = require("../config/db");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

module.exports = (io, socket) => {
  socket.on("sendMessage", async (data) => {
    const CurrentDate = moment().unix();
    const message = db.esc(data.message);

    data.sent_date = moment.unix(moment().unix()).format("HH:mm");

    if (!data.attachment) {
      let [res] = await db.query(
        `INSERT INTO messages(from_id, to_id, message, sent_date, has_read) VALUES ("${data.from_id}", "${data.to_id}", "${message}", "${CurrentDate}", 0)`
      );
      data.id = res.insertId;

      io.emit("sendMessage", data);
    } else {
      console.log("Start");
      fs.writeFile(
        path.join(__dirname, `../uploads/${data.filename}`),
        data.attachment,
        "binary",
        async (err) => {
          if (err) {
            console.log(err);
          } else {
            let [res] = await db.query(
              `INSERT INTO messages(from_id, to_id, message, sent_date, has_read, attachment) VALUES ("${data.from_id}", "${data.to_id}", "${message}", "${CurrentDate}", 0, "${data.filename}")`
            );
            data.id = res.insertId;
            data.attachment = data.filename;

            io.emit("sendMessage", data);
            console.log(data.filename);
          }
        }
      );
    }
  });
};
