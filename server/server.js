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
app.use("/api/chats", require("./routes/chats"));
app.use("/api/auth", require("./routes/auth"));

io.on("connection", () =>{
  console.log("io connection established")
})

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});