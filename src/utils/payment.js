import axios from "axios";
import Stripe from "stripe";

import config from "../config/config.js";

const payViaKhalti = async (data) => {
  const body = {
    return_url: `${config.appUrl}/orders/${data.id}/payment`,
    website_url: config.appUrl,
    amount: data.amount,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone,
    },
  };

  const response = await axios.post(config.khalti.apiUrl, body, {
    headers: {
      Authorization: `Key ${config.khalti.secret}`,
    },
  });

  return response.data;
};

const payViaStripe = async (data) => {
  const stripe = new Stripe(config.stripeSecretKey);

  return await stripe.paymentIntents.create({
    amount: data.amount,
    currency: data.currency || "npr",
    metadata: {
      customer_email: data.customer.email,
      customer_name: data.customer.name,
      customer_phone: data.customer.phone,
      order_id: data.orderId,
      order_name: data.orderName,
    },
  });
};

export { payViaKhalti, payViaStripe };
