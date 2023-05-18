import React from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";

const Product = ({ product }) => {
  const { title, price, image } = product;
  console.log(product)
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
            <Link to='/details'>
              <h2 className="text-sm font-bold mb-2 hover:text-blue-600">{title}</h2>
            </Link>
            <p className="text-gray-600">${price}</p>
            <div className="flex justify-center">
              <Link
              title="Add To Cart"
                to={`/booking/product/${product.id}`}
                className="absolute right-2 top-2 bg-gray-600 hover:bg-black text-white p-3 rounded-full"
              >
                <BiShoppingBag className="w-6"></BiShoppingBag>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
