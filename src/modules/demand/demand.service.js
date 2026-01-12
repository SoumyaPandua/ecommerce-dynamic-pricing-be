import redis from "../../config/redis.js";
import {
  DEMAND_EVENTS,
  DEMAND_WINDOW_SECONDS,
} from "./demand.constants.js";
import { ApiError } from "../../common/errors/ApiError.js";

const buildKey = (productId, metric) =>
  `demand:${productId}:${metric}`;

export const DemandService = {
  async recordEvent(productId, eventType) {
    const event = DEMAND_EVENTS[eventType];

    if (!event) {
      throw new ApiError(
        400,
        "Invalid demand event",
        "INVALID_DEMAND_EVENT"
      );
    }

    const key = buildKey(productId, event.key);

    await redis.incr(key);
    await redis.expire(key, DEMAND_WINDOW_SECONDS);
  },

  async getDemandMetrics(productId) {
    const pipeline = redis.pipeline();

    Object.values(DEMAND_EVENTS).forEach((event) => {
      pipeline.get(buildKey(productId, event.key));
    });

    const results = await pipeline.exec();

    let score = 0;
    const metrics = {};

    Object.values(DEMAND_EVENTS).forEach((event, index) => {
      const value = results[index][1]; // [err, value]
      const count = Number(value ?? 0);

      metrics[event.key] = count;
      score += count * event.weight;
    });

    return {
      productId,
      windowSeconds: DEMAND_WINDOW_SECONDS,
      metrics,
      demandScore: score,
    };
  },
};