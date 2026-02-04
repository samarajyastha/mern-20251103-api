import crypto from "crypto";

import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatuses.js";
import { payViaKhalti, payViaStripe } from "../utils/payment.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";

const getOrders = async (status) => {
  const filter = {};

  if (status) filter.status = status;

  return await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: filter,
    },
    {
      $project: {
        "orderItems._id": 1,
        "orderItems.name": 1,
        "orderItems.brand": 1,
        "orderItems.category": 1,
        "orderItems.price": 1,
        orderNumber: 1,
        payment: 1,
        shippingAddress: 1,
        createdAt: 1,
        status: 1,
        totalPrice: 1,
        "user.name": 1,
        "user.email": 1,
        "user.address": 1,
        "user.phone": 1,
      },
    },
  ]);
};

const getOrdersByUser = async (status, userId) => {
  let filter = { user: userId };

  if (status) filter.status = status;

  return await Order.find(filter)
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
    { new: true },
  );
};

const deleteOrder = async (id) => {
  await getOrderById(id);

  return await Order.findByIdAndDelete(id);
};

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: "ONLINE",
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await payViaKhalti({
    id,
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

const orderPaymentViaStripe = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: "CARD",
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await payViaStripe({
    amount: order.totalPrice,
    orderId: order.orderNumber,
    orderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: "CASH",
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      payment: orderPayment._id,
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true },
  );
};

const confirmOrderPayment = async (id, status) => {
  const order = await getOrderById(id);

  if (status.toUpperCase() !== "COMPLETED") {
    await Payment.findByIdAndUpdate(order.payment, {
      status: "FAILED",
    });

    throw {
      status: 400,
      message: "Payment failed.",
    };
  }

  await Payment.findByIdAndUpdate(order.payment, {
    status: "SUCCESS",
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true },
  );
};

const getOrdersByMerchant = async (merchantId, status) => {
  const filter = {
    "orderItems.createdBy": new mongoose.Types.ObjectId(merchantId),
  };

  if (status) filter.status = status;

  return await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderItems",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $match: filter,
    },
    {
      $project: {
        "orderItems._id": 1,
        "orderItems.name": 1,
        "orderItems.brand": 1,
        "orderItems.category": 1,
        "orderItems.price": 1,
        orderNumber: 1,
        payment: 1,
        shippingAddress: 1,
        createdAt: 1,
        status: 1,
        totalPrice: 1,
        "user.name": 1,
        "user.email": 1,
        "user.address": 1,
        "user.phone": 1,
      },
    },
  ]);
};

export default {
  createOrder,
  getOrders,
  getOrdersByUser,
  deleteOrder,
  cancelOrder,
  getOrderById,
  updateOrderStatus,
  orderPaymentViaKhalti,
  orderPaymentViaCash,
  confirmOrderPayment,
  getOrdersByMerchant,
  orderPaymentViaStripe,
};
