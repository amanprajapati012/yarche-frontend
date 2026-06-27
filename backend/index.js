require("dotenv").config();
const express = require("express");
const router = require("./router");
const adminRouter = require("./router/adminRoute");
const db = require("./db/connect");
const cors = require("cors");
const path = require("path");
const { initSocket } = require("./socket/socket");

const app = express();

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connect
db();

// Middleware
app.use(express.json());

// ✅ ONLY YOUR FRONTEND IP
app.use(
  cors({
    origin: [
       "https://yarche-frontend.vercel.app",
      "http://localhost:3000",
      "http://192.168.29.170:3000",
      "http://192.168.1.39:8081",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
       "adminauthorization",
    ],
    credentials: true,
  })
);


// Routes
app.use(router);
app.use("/admin", adminRouter);

// Server start
const PORT = process.env.PORT || 5000;

// 🔥 IMPORTANT


const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

initSocket(server);