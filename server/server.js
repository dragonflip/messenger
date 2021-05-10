const express = require("express");
const app = express();
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/sendCode", require("./routes/sendCode"));
app.use("/api/signIn", require("./routes/signIn"));
app.use("/api/signUp", require("./routes/signUp"));

app.use("/api/getChats", require("./routes/getChats"));
app.use("/api/getMessages", require("./routes/getMessages"));
app.use("/api/sendMessage", require("./routes/sendMessage"));


app.use("/api/getUserID", require("./routes/getUserID"));
app.use("/api/getProfile", require("./routes/getProfile"));
app.use("/api/editProfile", require("./routes/editProfile"));

io.on("connection", () => {
  console.log("io connection established");
});

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
