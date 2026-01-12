import { Router } from "express";
import mongoose from "mongoose";
import redis from "../config/redis.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    mongodb:
      mongoose.connection.readyState === 1
        ? "CONNECTED"
        : "DISCONNECTED",
    redis: redis.status,
    timestamp: new Date(),
  });
});

export default router;