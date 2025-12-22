import express from "express";

import { orderSchema, orderStatusSchema } from "../libs/schemas/order.js";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import orderController from "../controllers/order.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

/**
 * Url: /api/orders
 * Method: GET
 */
router.get("/", roleBasedAuth(ROLE_ADMIN), orderController.getOrders);

router.get("/user", roleBasedAuth(ROLE_USER), orderController.getOrdersByUser);

router.get(
  "/merchant",
  roleBasedAuth(ROLE_MERCHANT),
  orderController.getOrdersByMerchant
);

/**
 * Url: /api/orders
 * Method: POST
 */
router.post(
  "/",
  roleBasedAuth(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder
);

/**
 * Url: /api/orders/:id/cancel
 * Method: PUT
 */
router.put("/:id/cancel", orderController.cancelOrder);

/**
 * Url: /api/orders/:id
 * Method: DELETE
 */
router.delete("/:id", roleBasedAuth(ROLE_ADMIN), orderController.deleteOrder);

/**
 * Url: /api/orders/:id
 * Method: GET
 */
router.get("/:id", roleBasedAuth(ROLE_USER), orderController.getOrderById);

/**
 * Url: /api/orders/:id/status
 * Method: PUT
 */
router.put(
  "/:id/status",
  roleBasedAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderController.updateOrderStatus
);

/**
 * Url: /api/orders/:id/payment/khalti
 * Method: POST
 */
router.post(
  "/:id/payment/khalti",
  roleBasedAuth(ROLE_USER),
  orderController.orderPaymentViaKhalti
);

/**
 * Url: /api/orders/:id/payment/cash
 * Method: POST
 */
router.post(
  "/:id/payment/cash",
  roleBasedAuth(ROLE_USER),
  orderController.orderPaymentViaCash
);

/**
 * Url: /api/orders/:id/confirm-payment
 * Method: PUT
 */
router.put(
  "/:id/confirm-payment",
  roleBasedAuth(ROLE_USER),
  orderController.confirmOrderPayment
);

export default router;
