import express from "express";

import { orderSchema, orderStatusSchema } from "../libs/schemas/order.js";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";
import auth from "../middlewares/auth.js";
import orderController from "../controllers/order.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

/**
 * Url: /api/orders
 * Method: GET
 */
router.get("/", auth, roleBasedAuth(ROLE_ADMIN), orderController.getOrders);

router.get(
  "/user",
  auth,
  roleBasedAuth(ROLE_USER),
  orderController.getOrdersByUser
);

/**
 * Url: /api/orders
 * Method: POST
 */
router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder
);

/**
 * Url: /api/orders/:id/cancel
 * Method: PUT
 */
router.put("/:id/cancel", auth, orderController.cancelOrder);

/**
 * Url: /api/orders/:id
 * Method: DELETE
 */
router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderController.deleteOrder
);

/**
 * Url: /api/orders/:id
 * Method: GET
 */
router.get(
  "/:id",
  auth,
  roleBasedAuth(ROLE_USER),
  orderController.getOrderById
);

/**
 * Url: /api/orders/:id/status
 * Method: PUT
 */
router.put(
  "/:id/status",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderController.updateOrderStatus
);

export default router;
