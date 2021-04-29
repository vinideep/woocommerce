import React, { useContext } from "react";
import Link from "next/link";
import { ShopContext } from "../context/shopcontext";

const Products = ({ data }) => {
  const contextData = useContext(ShopContext);
  return (
    <div className=" w-1/3 flex bg-white dark:bg-gray-800 rounded-lg shadow m-2">
      <div className="flex-none w-24 md:w-48  relative">
        <Link href={`/[description]`} as={`/${data.productId}`}>
          <a>
            <img
              src={data.image.sourceUrl}
              alt="shopping image"
              className="absolute rounded-lg inset-0 w-full h-full object-cover"
            />
          </a>
        </Link>
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">
            <Link href={`/[description]`} as={`/${data.productId}`}>
              <a>{data.name}</a>
            </Link>
          </h1>
          <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
            ${`${data.price}`.replace("£","")}
          </div>
          <div className="w-full flex-none text-sm font-medium text-green-500 dark:text-gray-300 mt-2">
            In stock
          </div>
          <div
            className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 mt-2"
            // dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>
        <div className="flex mt-10 mb-4 text-sm font-medium">
          <Link href="/cart">
            <a>
              <button
                onClick={() => contextData.addProductToCart(data)}
                type="button"
                className="py-2 px-4 outline-none bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Buy now
              </button>
            </a>
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Free shipping on all continental US orders.
        </p>
      </form>
    </div>
  );
};
export async function getServerSideProps() {
  const result = await contextData.client.query(query);
  return {
    props: result.data,
  };
}
export default Products;
