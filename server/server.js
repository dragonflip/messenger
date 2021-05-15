const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes

// app.use("/api/sendCode", require("./routes/sendCode"));
// app.use("/api/signIn", require("./routes/signIn"));
// app.use("/api/signUp", require("./routes/signUp"));

// app.use("/api/getChats", require("./routes/getChats"));
app.use("/api/getMessages", require("./routes/getMessages"));
app.use("/api/sendMessage", require("./routes/sendMessage"));
app.use("/api/deleteMessage", require("./routes/deleteMessage"));
app.use("/api/editMessage", require("./routes/editMessage"));

app.use("/api/getUserID", require("./routes/getUserID"));
app.use("/api/getUsers", require("./routes/getUsers"));
app.use("/api/getProfile", require("./routes/getProfile"));
app.use("/api/editProfile", require("./routes/editProfile"));

//Sockets
io.on("connection", (socket) => {
  require("./sockets/sendCode")(io, socket);
  require("./sockets/signIn")(io, socket);
  require("./sockets/signUp")(io, socket);
  require("./sockets/getChats")(io, socket);

  // console.log(`Socket connected ${socket.id}`);
});

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
