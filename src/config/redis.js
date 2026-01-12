import Redis from "ioredis";
import logger from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},              // 🔑 force TLS
  family: 4,            // 🔑 force IPv4 (CRITICAL)
  maxRetriesPerRequest: 3,
  connectTimeout: 10_000,
  retryStrategy(times) {
    if (times > 5) return null; // stop retrying
    return Math.min(times * 500, 2000);
  },
});

redis.on("connect", () => {
  logger.info("Upstash Redis connected");
});

redis.on("error", (err) => {
  logger.error("Upstash Redis error", err);
});

export default redis;