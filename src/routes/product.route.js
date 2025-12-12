import express from "express";

import { productSchema } from "../libs/schemas/product.js";
import { ROLE_MERCHANT } from "../constants/roles.js";
import auth from "../middlewares/auth.js";
import productController from "../controllers/product.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import validate from "../middlewares/validator.js";

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
router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  validate(productSchema),
  productController.createProduct
);

/**
 * DELETE /api/products/:id
 */
router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.deleteProduct
);

/**
 * PUT /api/products/:id
 */
router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.updateProduct
);

export default router;
