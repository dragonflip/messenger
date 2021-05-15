const db = require("../config/db");

const nodemailer = require("nodemailer");
require("dotenv").config();

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

module.exports = (io, socket) => {
  socket.on("sendCode", async (data) => {
    let [result] = await db.query(
      `SELECT * FROM users WHERE email = "${data.email}"`
    );
    let Code = randomNumber(10000, 99999);

    transporter.sendMail({
      to: data.email,
      subject: "Підтвердження входу в обліковий запис",
      text: `Доброго дня. Ваш код підтвердження входу в обліковий запис: ${Code}`,
    });

    let user = {
      email: data.email,
      login_code: Code,
    };

    await db.query(`DELETE FROM login_codes WHERE email = ("${data.email}")`);
    await db.query(`INSERT INTO login_codes set ?`, user);

    if (result.length > 0) {
      socket.emit("sendCode", { need_register: false });
    } else {
      socket.emit("sendCode", { need_register: true });
    }
  });
};
