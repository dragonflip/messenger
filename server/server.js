const express = require("express");
const app = express();

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SPA
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
