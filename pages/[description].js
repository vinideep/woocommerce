import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShopContext } from "../context/shopcontext";
import ReactImageMagnify from "react-image-magnify";
import { useQuery } from "@apollo/client";

const Description = () => {
  const contextData = useContext(ShopContext);
  const router = useRouter();

  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const { data, error, response, loading } = useQuery(contextData.query);
  console.log(data);
  useEffect(() => {
    if (loading && response) {
      const product =
        data &&
        data.products.nodes.find(
          ({ productId }) => productId === +router.query.description
        );
      setProduct(...product);
    }
    console.log(product);
    product && product.image ? setImage(product.image.sourceUrl) : "loading";
  }, []);

  return (
    <div>
      <h1 className="mt-20 border-b-2 p-2 text-center text-2xl font-bold text-gray-600 tracking-wide">
        Product Detail
      </h1>
      {product && product.id ? (
        <div className="lg:my-6 lg:mt-12 border-2 lg:flex md:block lg:border- py-10 m-auto">
          <div className=" m-auto z-10 lg:shadow-2xl hover:shadow-xl rounded-md p-2 md:w-8/12 lg:w-3/12 ">
            <ReactImageMagnify
              {...{
                smallImage: {
                  imageStyle: { width: "50%" },
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image,
                  width: 300,
                  height: 450,
                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageClassName: "border-none",
                enlargedImageContainerDimensions: {
                  width: "300%",
                  height: "140%",
                },
                enlargedImageContainerStyle: {
                  border: "none",
                },
                enlargedImageContainerClassName: "-mt-32 mb-24 w-full",
              }}
            />
          </div>
          <div className="lg:block m-auto flex items-center z-0 bg-white shadow-xl">
            <ul className="flex items-center justify-center lg:block">
              {product.galleryImages.nodes.map((image, index) => {
                return (
                  <li key={index}>
                    <img
                      onMouseEnter={(e) => {
                        setImage(e.target.src);
                      }}
                      className="lg:w-20 w-14 md:w-24 m-2 shadow-md cursor-pointer sm:w-24 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl"
                      src={image.sourceUrl}
                      alt="item"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="block lg:w-2/3 px-6">
            <h1 className="font-extrabold text-gray-600 border-b-4 my-4 text-left lg:text-4xl text-2xl lg:p- m-auto">
              {product.name}
            </h1>

            <h1 className="border-b-4  border-red-500 text-xl w-28 font-bold text-gray-600 tracking-wider py-2 ">
              Description
            </h1>
            <p
              className="lg:m-auto py-10 lg:text-lg md:text-lg text-md font-medium text-justify"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
            <p className="font-extrabold text-left text-lg pr-2 py-2 m-auto transition duration-1000 ease-in-out text-red-500">
              Regular Price: <del>{product.regularPrice}</del>
            </p>
            <p className="font-extrabold text-green-600 text-left text-xl py-2 pr-2 m-auto">
              Offer Price: {product.price}
            </p>
            <button
              onClick={() => {
                contextData.addProductToCart(product);
              }}
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              <Link href="/cart">
                <a>Add to Cart</a>
              </Link>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Description;
