import React, { useContext, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { Cart } from "../../hooks/CartContext/CartContext";
import Loader from "../../components/Loader/Loader";

const ShoppingCartDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { loading, shoppingCart} = useContext(Cart);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  // const handleIncreaseQuantity = (cartId) => {
  //   const updatedCart = shoppingCart.map((item) => {
  //     if (item.cart_id === cartId) {
  //       return {
  //         ...item,
  //         quantity: item.quantity + 1,
  //       };
  //     }
  //     return item;
  //   });
  //   shoppingCart.setCart(updatedCart);
  // };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //delete item from cart
  const handleDeleteItem = (cartId) => {
    const existingCart = localStorage.getItem("myCart");
  
    if (existingCart) {
      const cartItems = JSON.parse(existingCart);
      const index = cartItems.findIndex(item => item.cart_id === cartId);
  
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(cartItems));
      }
    }
  };

  //total price for a item
  const totalPrice = shoppingCart
    .reduce((acc, item) => {
      const priceString = item.price;
      const itemPrice = priceString
        ? parseFloat(String(priceString).replace("$", ""))
        : 0;
      return acc + itemPrice * quantity;
    }, 0)
    .toFixed(2);

    if (loading) {
      return (
        <div className="h-screen mt-28">
          <Loader></Loader>
        </div>
      );
    }
    
    if (shoppingCart.length === 0) {
      return <div className="h-screen my-28 text-center">Your cart is empty.</div>;
    }

  return (
    <div className="h-screen p-8 my-28">
      <div className="border bg-white border-gray-400 shadow-lg rounded-lg container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
        {shoppingCart?.map((item) => (
          <div className="flex items-center mb-4" key={item.cart_id} item={item}>
            <img
              className="w-16 h-16 object-cover rounded-md"
              src={item.product.image}
              alt={item.product.title}
            />
            <h2 className="text-sm mx-4 text-black font-bold">{item.product.title}</h2>
            <div className="mx-8 flex items-center">
              <div>
                <h2 className="text-sm font-semibold">Price:</h2>
              </div>
              <div>
                <p className="text-gray-600 mx-2 border border-gray-400 bg-white px-8 py-1">
                  ${item.product.price}
                </p>
              </div>
            </div>
            <div className="mx-4 flex items-center">
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
                onClick={() => handleIncreaseQuantity(item.cart_id)}
                className="p-2 border border-gray-300 ml-2 focus:outline-none focus:ring"
              >
                <BiPlus className="h-3 w-3" />
              </button>
              <div className="mx-8 flex items-center">
                <div>
                  <h2 className="text-sm font-semibold">Total Price:</h2>
                </div>
                <div>
                  <p className="text-gray-600 mx-2 border border-gray-400 bg-white px-8 py-1">
                    ${totalPrice}
                  </p>
                </div>
              </div>
              <button
              onClick={()=>handleDeleteItem(item.cart_id)}
               className="p-2 border border-red-600 ml-4 focus:outline-none focus:ring">
                Delete
              </button>
            </div>
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartDetails;
