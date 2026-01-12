import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { apiRateLimiter } from "./common/middleware/rateLimit.middleware.js";

const app = express();

/**
 * Global middlewares
 */
app.use(express.json());

/**
 * Rate limiting (protect all APIs)
 * Applied BEFORE routes
 */
app.use("/api", apiRateLimiter);

/**
 * Swagger documentation
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API routes
 */
app.use("/api/v1", routes);

/**
 * Global error handler (ALWAYS LAST)
 */
app.use(errorHandler);

export default app;