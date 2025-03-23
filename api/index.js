import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "./utils/verifyUser.js";
import http from "http";
import { Server } from "socket.io"; // ✅ Import Socket.io Server

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app); // ✅ Correct placement

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Proxy middleware
const modelProxy = createProxyMiddleware({
  target: `${process.env.MODEL_BASE_URL}/predict`,
  changeOrigin: true,
});

// ✅ Fix: Attach WebSocket (Socket.io) to `server`, not `app`
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change this if needed
    methods: ["GET", "POST"],
  },
});

let messages = []; // Store chat messages temporarily

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Send past chat messages when a new user connects
  socket.emit("chat-history", messages);

  // ✅ Receive and broadcast messages
  socket.on("send-message", (data) => {
    messages.push(data);
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Fix: Use `server.listen()`, not `app.listen()`
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// Protected model route
app.use("/api/predict", verifyToken, modelProxy);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
