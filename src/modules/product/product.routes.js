import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validate } from "../../common/middleware/validate.middleware.js";
import { createProductSchema } from "./product.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product & pricing base management
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a product with base, discount and dynamic pricing constraints
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - basePrice
 *               - minPrice
 *               - maxPrice
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple iPhone 15
 *               category:
 *                 type: string
 *                 example: Electronics
 *               basePrice:
 *                 type: number
 *                 example: 80000
 *               discountPrice:
 *                 type: number
 *                 example: 76000
 *               minPrice:
 *                 type: number
 *                 example: 72000
 *               maxPrice:
 *                 type: number
 *                 example: 85000
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation or pricing constraint error
 */
router.post("/", validate(createProductSchema), ProductController.create);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all active (non-deleted) products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", ProductController.list);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Fetch a single product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f9c3b4a9b1e91234abcd12
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/:id", ProductController.get);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     description: Marks product as deleted (does not remove from DB)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", ProductController.remove);

export default router;