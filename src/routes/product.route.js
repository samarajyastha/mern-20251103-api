import express from "express";

import productController from "../controllers/product.controller.js";

const router = express.Router();

/**
 * GET /api/products
 */
router.get("/", productController.getProducts);

/**
 * GET /api/products/:id
 */
router.get("/:id", productController.getProductById);

/**
 * POST /api/products
 */
router.post("/", productController.createProduct);

export default router;
