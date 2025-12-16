import crypto from "crypto";

import { ORDER_STATUS_CANCELLED } from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";

const getOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");

  if (!order)
    throw {
      status: 404,
      message: "Order not found.",
    };

  return order;
};

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();

  return await Order.create({ ...data, user: userId, orderNumber });
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (!user.roles.includes(ROLE_ADMIN) && order.user._id != user._id)
    throw {
      status: 403,
      message: "Access denied.",
    };

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true }
  );
};

const deleteOrder = async (id) => {
  await getOrderById(id);

  return await Order.findByIdAndDelete(id);
};

// confirmOrder - payment

// getOrderByMerchant

export default {
  createOrder,
  getOrders,
  getOrdersByUser,
  deleteOrder,
  cancelOrder,
  getOrderById,
  updateOrderStatus,
};
