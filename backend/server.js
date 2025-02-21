const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Ensure Middleware Order
app.use(express.json()); // 🚀 Parses JSON requests
app.use(express.urlencoded({ extended: true })); // 🚀 Parses URL-encoded data
app.use(cors());
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
