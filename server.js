const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("./config/db");

const donorRoutes = require("./routes/donorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/donors", donorRoutes);
app.use("/admin", adminRoutes);
app.use("/emergency", emergencyRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Blood Donation Server Running");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  
});

