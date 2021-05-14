const { Router } = require("express");
const router = Router();
const db = require("../config/db");
//const io = app.get("io");

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
/*
router.post("/", async (req, res) => {
  var io = req.app.get('socketio');
  io.on("db", (socket) => {

    socket.on("sendEmail", (data) => {
      let[result] = db.query("SELECT * FROM users WHERE email = ('" + data.email + "')");

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
      
      db.query("DELETE FROM login_codes WHERE email = ('" + data.email + "')")
      db.query("INSERT INTO login_codes set ?", user)

      if(result > 0){
        io.emit("result", { need_register: false })
      }else{
        io.emit("result", { need_register: false })
      }
    })

  //console.log("Socket connected");
    
    socket.emit("hello_user");

    socket.on("hello", (data) => {
      console.log(`${data.user} said hello!`);
    });
  });

  
  let [result] = await db.query(
    `SELECT * FROM users WHERE email = "${req.body.email}"`
  );

  let Code = randomNumber(10000, 99999);

  transporter.sendMail({
    to: req.body.email,
    subject: "Підтвердження входу в обліковий запис",
    text: `Доброго дня. Ваш код підтвердження входу в обліковий запис: ${Code}`,
  });

  let user = {
    email: req.body.email,
    login_code: Code,
  };

  await db.query(`DELETE FROM login_codes WHERE email = "${req.body.email}"`);
  await db.query("INSERT INTO login_codes set ?", user);
  
  if (result.length > 0) {
    res.json({ need_register: false });
  } else {
    res.json({ need_register: true });
  }
});*/

module.exports = function(socket) {

};

module.exports = router;