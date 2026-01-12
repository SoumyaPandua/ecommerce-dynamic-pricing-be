import cron from "node-cron";
import { runPriceRecalculationJob } from "./priceRecalculation.job.js";
import logger from "../config/logger.js";

export const startSchedulers = () => {
  // Hourly pricing update
  cron.schedule("0 * * * *", async () => {
    logger.info("Hourly pricing cron triggered");
    await runPriceRecalculationJob();
  });

  // Daily pricing update (midnight)
  cron.schedule("0 0 * * *", async () => {
    logger.info("Daily pricing cron triggered");
    await runPriceRecalculationJob();
  });

  logger.info("Pricing schedulers initialized");
};