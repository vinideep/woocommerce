import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

export const query = `
  mutation MyMutation { 
    __typename
    createOrder(
      input: {
        lineItems: { name: "", quantity: 10, total: "", productId: 10 }
        paymentMethod: ""
      }
    ) {
      order {
        date
        datePaid
        subtotal
        paymentMethod
        orderKey
        orderId
        customerIpAddress
        hasShippingAddress
        needsShippingAddress
      }
    }
  }
`;

const createOrder = () => {
  // let data = useMutation(query);
  const url = "http://localhost:10013/graphql";
  const opts = {
    method: "POST",
    mode: 'cors',
    credentials: 'same-origin',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };
  fetch("http://127.0.0.1:5000/","GET")
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
  return <div>congrats</div>;
};
export default createOrder;
