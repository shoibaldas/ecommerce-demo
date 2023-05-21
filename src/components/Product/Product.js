import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";
import { Cart } from "../../hooks/CartContext/CartContext";

const Product = ({ products }) => {
  const { title, price, image, rating } = products;
  const { setLoading } = useContext(Cart);

  //add product to cart
  const addToCart = () => {
    const existingCart = localStorage.getItem("myCart");
    const newItem = {
      product: products,
      quantity: 1,
    };

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);

      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === newItem.product.id
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
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
