const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { maxHttpBufferSize: 1e7 });
const db = require("./config/db");
const moment = require("moment");

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/test"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/sendCode", require("./routes/sendCode"));
// app.use("/api/signIn", require("./routes/signIn"));
// app.use("/api/signUp", require("./routes/signUp"));

// app.use("/api/getChats", require("./routes/getChats"));
// app.use("/api/getMessages", require("./routes/getMessages"));
// app.use("/api/sendMessage", require("./routes/sendMessage"));
// app.use("/api/deleteMessage", require("./routes/deleteMessage"));
// app.use("/api/editMessage", require("./routes/editMessage"));

// app.use("/api/getUserID", require("./routes/getUserID"));
// app.use("/api/getUsers", require("./routes/getUsers"));
// app.use("/api/getProfile", require("./routes/getProfile"));
// app.use("/api/editProfile", require("./routes/editProfile"));

let users = 0;

// Sockets
io.on("connection", async (socket) => {
  require("./sockets/sendCode")(io, socket);
  require("./sockets/signIn")(io, socket);
  require("./sockets/signUp")(io, socket);

  require("./sockets/getChats")(io, socket);
  require("./sockets/getMessages")(io, socket);
  require("./sockets/sendMessage")(io, socket);
  require("./sockets/deleteMessage")(io, socket);
  require("./sockets/editMessage")(io, socket);
  require("./sockets/readMessage")(io, socket);

  require("./sockets/getUserID")(io, socket);
  require("./sockets/getUsers")(io, socket);
  require("./sockets/getProfile")(io, socket);
  require("./sockets/editProfile")(io, socket);
  require("./sockets/setOnlineStatus")(io, socket);


  socket.on("offer",(data) => {
    io.emit("offer",data)
  })

  socket.on("answer",(data) => {
    io.emit("answer",data)
  })

  if (
    socket.handshake.query.token != "null" &&
    socket.handshake.query.visibility != "false"
  ) {
    await db.query(
      `UPDATE users SET was_online = 0 WHERE token = "${socket.handshake.query.token}"`
    );
    let [user] = await db.query(
      `SELECT id FROM users WHERE token = "${socket.handshake.query.token}"`
    );

    if (user.length) {
      io.emit("setOnlineStatus", {
        online: true,
        user_id: user[0].id,
        was_online: 0,
      });
    }
  }

  socket.emit("version", version);

  users++;
  io.emit("usersOnline", users);

  socket.on("disconnect", async () => {
    users--;
    io.emit("usersOnline", users);

    if (socket.handshake.query.token != "null") {
      await db.query(
        `UPDATE users SET was_online = "${moment().unix()}" WHERE token = "${
          socket.handshake.query.token
        }"`
      );
      let [user] = await db.query(
        `SELECT id FROM users WHERE token = "${socket.handshake.query.token}"`
      );

      if (user.length) {
        io.emit("setOnlineStatus", {
          online: false,
          user_id: user[0].id,
          was_online: moment().unix(),
        });
      }
    }
  });
});



// Test version
app.get("/test*", (req, res) => {
  res.sendFile(__dirname + "/test/index.html");
});

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// Info
const version = "0.7.4";
