import React from "react";
import {AiOutlineStar} from "react-icons/ai";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const product = useLoaderData();
    //const [image, title, category, price, rating, description] = product;
  return (
    <div className="h-screen mt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <img className="w-full h-auto object-contain lg:max-h-96 " src={product.image} alt={product.title} />
        </div>
        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">Category/ {product.category}</p>
          <div><p className="text-xl font-bold mb-2">${product.price}</p></div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <AiOutlineStar className="text-orange-600"/>
            </div>
            <p className="text-gray-600">{product.rating.rate}</p>
          </div>
          <div className="mb-2">
            <label htmlFor="quantity" className="font-bold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              className="border rounded-md px-2 py-1 w-16 ml-2"
            />
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <button className="bg-gray-700 hover:bg-black text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
