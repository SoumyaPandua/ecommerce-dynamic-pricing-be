import { Router } from "express";
import { CompetitorController } from "./competitor.controller.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import {
  upsertCompetitorPriceSchema,
} from "./competitor.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Competitors
 *   description: Competitor price tracking & market intelligence
 */

/**
 * @swagger
 * /api/v1/competitors:
 *   post:
 *     summary: Add or update competitor price
 *     description: |
 *       Creates or updates competitor pricing for a product.
 *       Only one price per competitor per product is stored.
 *     tags: [Competitors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - competitor
 *               - price
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65f9c3b4a9b1e91234abcd12
 *               competitor:
 *                 type: string
 *                 example: Amazon
 *               price:
 *                 type: number
 *                 example: 79500
 *               currency:
 *                 type: string
 *                 example: INR
 *               source:
 *                 type: string
 *                 enum: [MANUAL, API, SCRAPER]
 *                 example: MANUAL
 *     responses:
 *       200:
 *         description: Competitor price upserted successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  validate(upsertCompetitorPriceSchema),
  CompetitorController.upsert
);

/**
 * @swagger
 * /api/v1/competitors/{productId}:
 *   get:
 *     summary: Get all competitor prices for a product
 *     description: Returns all competitor prices (fresh + stale)
 *     tags: [Competitors]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: List of competitor prices
 *       404:
 *         description: No competitor prices found
 */
router.get(
  "/:productId",
  CompetitorController.getAll
);

/**
 * @swagger
 * /api/v1/competitors/{productId}/snapshot:
 *   get:
 *     summary: Get market price snapshot
 *     description: |
 *       Returns median market price based on fresh competitor data.
 *       Stale prices are ignored.
 *     tags: [Competitors]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Market snapshot retrieved
 */
router.get(
  "/:productId/snapshot",
  CompetitorController.snapshot
);

export default router;