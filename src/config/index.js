import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
  "MONGODB_URI",
  "REDIS_URL",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
});