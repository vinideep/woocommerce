import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import Products from "../components/product";
import { ShopContext } from "../context/shopcontext";




export default function Home() {
  const contextData = useContext(ShopContext);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="mt-20 flex flex-wrap p-4 items-center justify-center">
          {contextData.data && contextData.data.products && contextData.data.products.nodes.map((product, index) => {
            return (
              <React.Fragment key={index}>
                {" "}
                <Products data={product} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
