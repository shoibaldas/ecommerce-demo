import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import axios from "axios";

const FeatureProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        setProducts(response.data);
        setLoading(false);
      });
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
    >
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Products</h2>
        <p className="text-lg leading-6 text-gray-600">
          Shop our high-quality, sustainable fashion collection today.
        </p>
      </div>
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
        {shuffledProducts.slice(0, 8).map((product) => (
          <Product key={product.id} products={product}></Product>
        ))}
      </div>
      <div className="text-center text-gray-800">
        <Link
          to="/products"
          aria-label=""
          className="inline-flex items-center bg-gray-600 hover:bg-black text-white py-2 px-4 rounded transition-colors ease-in duration-200"
        >
          View All
          <MdOutlineArrowForwardIos className="w-6 ml-1"></MdOutlineArrowForwardIos>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProducts;
