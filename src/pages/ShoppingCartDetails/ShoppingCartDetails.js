import React, { useContext, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { Cart } from "../../hooks/CartContext/CartContext";
import Loader from "../../components/Loader/Loader";
import { UserContext } from "../../hooks/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const ShoppingCartDetails = () => {
  const { loading, shoppingCart, setLoading, setShoppingCart } =
    useContext(Cart);
  const { user } = useContext(UserContext);

  //generating id with time stamp
  const generateUniqueId = () => {
    return Date.now().toString();
  };

  //increase quantity
  const handleIncreaseQuantity = (productId) => {
    const existingCart = localStorage.getItem("myCart");

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);

      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        localStorage.setItem("myCart", JSON.stringify(cartItems));
      }
      setLoading(true);
    }
  };

  //decrease quantity
  const handleDecreaseQuantity = (productId) => {
    const existingCart = localStorage.getItem("myCart");

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);

      const existingItemIndex = cartItems.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        if (cartItems[existingItemIndex].quantity > 1) {
          cartItems[existingItemIndex].quantity -= 1;
          localStorage.setItem("myCart", JSON.stringify(cartItems));
        }
      }
      setLoading(true);
    }
  };

  //delete item from cart
  const handleDeleteItem = (itemId) => {
    const existingCart = localStorage.getItem("myCart");

    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const index = cartItems.findIndex((item) => item.product.id === itemId);

      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(cartItems));
      }
    }
    setLoading(true);
  };

  const handleCheckout = () => {
    const userEmail = user.email; // Assuming you have access to the user's email from the context data

    const orders = shoppingCart.map((item) => {
      return {
        order_id: generateUniqueId(), // Generate a unique order ID
        title: item.product.title,
        quantity: item.quantity,
        subtotal: item.quantity * item.product.price,
        userEmail: userEmail,
      };
    });

    const existingOrders = localStorage.getItem("myOrder");
    const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];

    const updatedOrders = [...parsedOrders, ...orders];

    localStorage.setItem("myOrder", JSON.stringify(updatedOrders));
    localStorage.removeItem("myCart"); // Clear the "myCart" data
    setShoppingCart([]);

    Swal.fire({
      icon: "success",
      title: "Order placed successfully!",
    });
  };

  if (loading) {
    return (
      <div className="h-screen mt-28">
        <Loader></Loader>
      </div>
    );
  }

  if (shoppingCart.length === 0) {
    return (
      <div className="h-screen my-28 text-center">Your cart is empty.</div>
    );
  }

  return (
    <div className="h-screen p-8 my-28">
      <div className="border overflow-x-auto bg-white border-gray-400 shadow-lg rounded-lg container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
        {/* <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Subtotal</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => (
              <tr key={item.product.id}>
                <td className="px-4 py-2">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{item.product.title}</td>
                <td className="px-4 py-2">${item.product.price}</td>
                <td className="px-4 py-2 flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                    className="p-2 border border-gray-300 mr-2 focus:outline-none focus:ring"
                  >
                    <BiMinus className="h-3 w-3" />
                  </button>
                  <span className="text-sm border px-3 py-1 bg-white border-gray-600 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product.id)}
                    className="p-2 border border-gray-300 ml-2 focus:outline-none focus:ring"
                  >
                    <BiPlus className="h-3 w-3" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteItem(item.product.id)}
                    className="p-2 focus:outline-none focus:ring"
                  >
                    <MdDeleteForever className="text-lg text-red-700"></MdDeleteForever>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Subtotal</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => (
              <tr key={item.product.id}>
                <td className="px-4 py-2">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{item.product.title}</td>
                <td className="px-4 py-2">${item.product.price}</td>
                <td className="px-4 py-2 flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                    className="p-1 border border-gray-300 mr-2 focus:outline-none focus:ring"
                  >
                    <BiMinus className="text-md text-red-700" />
                  </button>
                  <span className="text-sm border px-3 py-1 bg-white border-gray-600 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product.id)}
                    className="p-1 border border-gray-300 ml-2 focus:outline-none focus:ring"
                  >
                    <BiPlus className="text-md text-green-800" />
                  </button>
                </td>
                <td className="px-4 py-2 bg-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    title="Remove"
                    onClick={() => handleDeleteItem(item.product.id)}
                    className="p-2 focus:outline-none focus:ring"
                  >
                    <MdDeleteForever className="text-xl text-red-700"></MdDeleteForever>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleCheckout}
          className="mt-10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartDetails;
