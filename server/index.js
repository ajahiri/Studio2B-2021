const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Middleware
const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/verifyToken");

app.get("/", (req, res) => {
  res.send("Welcome to Studio 2B 2021 Group 1 project");
});

app.get("/api/user/profile", verifyToken, (req, res) => {
  res.send("This is the user profile");
});

app.use("/api/users", authRoutes);

mongoose
  .connect(
    "mongodb+srv://studio2b:f1kD0c7gHNLF6yBG@cluster0.yzfyv.mongodb.net/studio2b_auth?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000, () => console.log("Server is running"));
  })
  .catch((err) => console.log(err));
