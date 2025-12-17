import axios from "axios";

import config from "../config/config.js";

const payViaKhalti = async (data) => {
  const body = {
    return_url: config.appUrl, // [TODO SS: 2025-12-17] use return url from frontend app route
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

export { payViaKhalti };
