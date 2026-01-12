import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
  family: 4,
});

(async () => {
  await redis.set("health", "ok");
  const value = await redis.get("health");
  console.log("Redis value:", value);
  process.exit(0);
})();
