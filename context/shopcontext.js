import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";


export const query = gql`
  query {
    products {
      nodes {
        id
        name
        productId
        image {
          uri
          sourceUrl
        }
        description
        galleryImages {
          nodes {
            sourceUrl
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on ExternalProduct {
          price
          salePrice
          regularPrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;
export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {
  const [store, setStore] = useState([]);
  const [value, setValue] = useState(0);
  const { data, error, response, loading } = useQuery(query)
  // axios.interceptors.request.use(function (config) {
  //   config.headers;
  //   const { headers = {} } = config || {};
  //   if (headers["User-Agent"]) delete config.headers["User-Agent"];
  //   return config;
  // });
  const addProductToCart = (product) => {
    !store.find(({ id }) => id === product.id)
      ? (setStore((prevData) => [...prevData, { ...product, quantity: 1 }]),
        setValue(value + 1))
      : setStore((prevStore) =>
          prevStore.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
  };

  return (
    <ShopContext.Provider value={{ query,data, addProductToCart, store, value }}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
