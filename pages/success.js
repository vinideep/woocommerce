import React from "react";
import axios from "axios";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: "http://localhost:10013/", // Your store URL
  consumerKey: "ck_54d3eda4294f22d6c185875e1e247b2f8987048a", // Your consumer key
  consumerSecret: "cs_28938aa538c8acbe63c918729e41b06d0df9494d", // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});
axios.interceptors.request.use(function (config) {
  config.headers;
  const { headers = {} } = config || {};
  if (headers["User-Agent"]) delete config.headers["User-Agent"];
  return config;
});

const createOrder = () => {
  const data = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555",
    },
    shipping: {
      first_name: "John",
      last_name: "Doe",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
    },
    line_items: [
      {
        product_id: 93,
        quantity: 2,
      },
      {
        product_id: 22,
        variation_id: 23,
        quantity: 1,
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };

  WooCommerce.post("orders", data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });

  return <div>congrats</div>;
};
export default createOrder;
