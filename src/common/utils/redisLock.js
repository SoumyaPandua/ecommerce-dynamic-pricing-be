import Redlock from "redlock";
import redis from "../../config/redis.js";

export const redlock = new Redlock(
  [redis],
  {
    retryCount: 0, // do NOT retry
  }
);