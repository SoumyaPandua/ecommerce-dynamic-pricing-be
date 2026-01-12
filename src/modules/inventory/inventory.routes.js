import { Router } from "express";
import { InventoryController } from "./inventory.controller.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import {
  createInventorySchema,
  updateStockSchema,
} from "./inventory.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory & stock management APIs
 */

/**
 * @swagger
 * /api/v1/inventory:
 *   post:
 *     summary: Create inventory for a product
 *     description: Initialize inventory and stock status for a product
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - stock
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 65f9c3b4a9b1e91234abcd12
 *               stock:
 *                 type: number
 *                 example: 50
 *               lowStockThreshold:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Inventory already exists or invalid data
 */
router.post("/", validate(createInventorySchema), InventoryController.create);

/**
 * @swagger
 * /api/v1/inventory/{productId}:
 *   get:
 *     summary: Get inventory by product ID
 *     description: Fetch current stock and inventory status of a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Inventory details
 *       404:
 *         description: Inventory not found
 */
router.get("/:productId", InventoryController.get);

/**
 * @swagger
 * /api/v1/inventory/{productId}/increase:
 *   post:
 *     summary: Increase product stock
 *     description: Increase available stock for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Stock increased successfully
 *       400:
 *         description: Invalid quantity
 *       404:
 *         description: Inventory not found
 */
router.post(
  "/:productId/increase",
  validate(updateStockSchema),
  InventoryController.increase
);

/**
 * @swagger
 * /api/v1/inventory/{productId}/decrease:
 *   post:
 *     summary: Decrease product stock
 *     description: Decrease available stock for a product
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Stock decreased successfully
 *       400:
 *         description: Insufficient or invalid stock
 *       404:
 *         description: Inventory not found
 */
router.post(
  "/:productId/decrease",
  validate(updateStockSchema),
  InventoryController.decrease
);

export default router;