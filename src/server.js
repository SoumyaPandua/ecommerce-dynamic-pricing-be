import dotenv from "dotenv";
dotenv.config();

import "./config/index.js";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.js";
import { startSchedulers } from "./jobs/job.runner.js";

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("MongoDB connected");

    // 🔑 start background jobs
    startSchedulers();
    
    app.listen(PORT, () =>
      logger.info(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    logger.error("DB connection failed", err);
    process.exit(1);
  });