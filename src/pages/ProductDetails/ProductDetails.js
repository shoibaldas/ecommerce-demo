import React, { useContext, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { Cart } from "../../hooks/CartContext/CartContext";
import Loader from "../../components/Loader/Loader";
import ScrollToTop from "../../hooks/ScrollToTop/ScrollToTop";

const ProductDetails = () => {
  const products = useLoaderData();
  const { loading, setLoading } = useContext(Cart);
  const [quantity, setQuantity] = useState(1);

  //add product to cart
  const addToCart = () => {
    const existingCart = localStorage.getItem("myCart");
    const newItem = {
      product: products,
      quantity: quantity,
    };

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);

      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === newItem.product.id
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push(newItem);
      }

      localStorage.setItem("myCart", JSON.stringify(cartItems));
    } else {
      const cartItems = [newItem];
      localStorage.setItem("myCart", JSON.stringify(cartItems));
    }

    Swal.fire({
      icon: "success",
      title: "Your product added to cart successfully!",
    });
    setLoading(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <div className="h-screen mt-28">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="h-screen my-20  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
      <ScrollToTop></ScrollToTop>
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
              type="number"
              min="1"
              className="border rounded-md px-2 py-1 w-16 ml-2"
              defaultValue="1"
              onChange={handleQuantityChange}
            />
          </div>
          <p className="text-gray-600 mb-4">{products.description}</p>
          <button
            onClick={addToCart}
            className="bg-gray-700 hover:bg-black text-white py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
