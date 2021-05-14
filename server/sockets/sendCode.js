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

module.exports = function sendCode (socket, data){
    let[result] = db.query("SELECT * FROM users WHERE email = ('" + data.email + "')");
    let Code = randomNumber(10000, 99999);

    transporter.sendMail({
        to: data.email,
        subject: "Підтвердження входу в обліковий запис",
        text: `Доброго дня. Ваш код підтвердження входу в обліковий запис: ${Code}`,
    });

    let user = {
        email: email,
        login_code: Code,
    };

    db.query("DELETE FROM login_codes WHERE email = ('" + email + "')");
    db.query("INSERT INTO login_codes set ?", user);

    if(result.length > 0){
        io.emit("result", { need_register: false })
    }
    else {
        io.emit("result", { need_register: true })
    }
}