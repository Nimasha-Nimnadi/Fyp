import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyToken } from "./utils/verifyUser.js";

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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Proxy middleware
const modelProxy = createProxyMiddleware({
  target: `${process.env.MODEL_BASE_URL}/predict`, // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
  timeout: 60000,
});

// Protected model route
app.use("/api/predict", verifyToken, modelProxy);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
