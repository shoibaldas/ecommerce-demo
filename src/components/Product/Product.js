import React from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";

const Product = ({ products }) => {
  const { title, price, image, rating } = products;

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
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-mirror="true"
        className="overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-96 bg-white rounded-lg">
          <img className="w-full h-56 object-cover" src={image} alt={title} />
          <div className="px-6 py-4">
            <Link to={`/product/${products.id}`}>
              <h2 className="text-sm font-bold mb-2 hover:text-blue-600">
                {title}
              </h2>
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">${price}</p>
              </div>
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  <AiOutlineStar className="text-orange-600" />
                </div>
                <p className="text-gray-600">{rating.rate}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                title="Add To Cart"
                onClick={addToCart}
                className="absolute right-2 top-2 bg-gray-600 hover:bg-black text-white p-3 rounded-full"
              >
                <BiShoppingBag className="w-6"></BiShoppingBag>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
