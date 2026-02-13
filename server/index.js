const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const providerRoutes = require("./routes/providerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");


const app = express(); // ✅ app MUST be created before use

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/services", serviceRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
