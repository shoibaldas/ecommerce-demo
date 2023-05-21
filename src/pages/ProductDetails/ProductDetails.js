import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const products = useLoaderData();

  const addToCart = () => {
    const existingCart = localStorage.getItem("myCart");

    if (existingCart) {
      // If cart items exist then add a new item with a quantity of 1
      const cartItems = JSON.parse(existingCart);
      const newItem = {
        cart_id: generateUniqueId(),
        product: products,
        quantity: 1,
      };
      cartItems.push(newItem);
      localStorage.setItem("myCart", JSON.stringify(cartItems));
      Swal.fire({
        icon: "success",
        title: "Your product added to cart Successfully!",
      });
    } else {
      const cartItems = [
        {
          cart_id: generateUniqueId(),
          product: products,
          quantity: 1,
        },
      ];
      localStorage.setItem("myCart", JSON.stringify(cartItems));
      Swal.fire({
        icon: "success",
        title: "Your product added to cart Successfully!",
      });
    }
  };

  //generating id with time stamp
  const generateUniqueId = () => {
    return Date.now().toString();
  };

  return (
    <div className="h-screen my-20  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <img
            className="w-full h-auto object-contain lg:max-h-96 "
            src={products.image}
            alt={products.title}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-2xl font-bold mb-2">{products.title}</h2>
          <p className="text-gray-600 mb-2">Category/ {products.category}</p>
          <div>
            <p className="text-xl font-bold mb-2">${products.price}</p>
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <AiOutlineStar className="text-orange-600" />
            </div>
            <p className="text-gray-600">{products.rating.rate}</p>
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
              defaultValue="1"
            />
          </div>
          <p className="text-gray-600 mb-4">{products.description}</p>
          <button onClick={addToCart} className="bg-gray-700 hover:bg-black text-white py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
