import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { apiRateLimiter } from "./common/middleware/rateLimit.middleware.js";

const app = express();

app.use(express.json());

app.use("/api", apiRateLimiter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    name: "Dynamic Pricing Engine API",
    status: "RUNNING",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    documentation: "/docs",
    health: "/api/v1/health",
    timestamp: new Date(),
  });
});

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;