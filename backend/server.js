// app.js
const express = require("express");
const connectDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/cars", carRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
