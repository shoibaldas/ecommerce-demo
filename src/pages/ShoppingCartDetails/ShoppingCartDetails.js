import React, { useContext, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { Cart } from "../../hooks/CartContext/CartContext";

const ShoppingCartDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { cart, deleteCartItem, setCartItems, cartItems} = useContext(Cart);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleDeleteItem = (itemId) => {
    deleteCartItem(itemId);

    // Update cartItems state and local storage after deleting the item
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("myCart", JSON.stringify(updatedCartItems));
  };

  //total price for a item
  const totalPrice = cart
    .reduce((acc, item) => {
      const priceString = item.price;
      const itemPrice = priceString
        ? parseFloat(String(priceString).replace("$", ""))
        : 0;
      return acc + itemPrice * quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="h-screen p-8 my-28">
      <div className="border bg-white border-gray-400 shadow-lg rounded-lg container mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl p-12">
        {cart?.map((item) => (
          <div className="flex items-center mb-4" key={item.id} item={item}>
            <img
              className="w-16 h-16 object-cover rounded-md"
              src={item.image}
              alt={item.title}
            />
            <h2 className="text-sm mx-4 text-black font-bold">{item.title}</h2>
            <div className="mx-8 flex items-center">
              <div>
                <h2 className="text-sm font-semibold">Price:</h2>
              </div>
              <div>
                <p className="text-gray-600 mx-2 border border-gray-400 bg-white px-8 py-1">
                  ${item.price}
                </p>
              </div>
            </div>
            <div className="mx-4 flex items-center">
              <button
                //onClick={decreaseQuantity}
                onClick={() => handleDecreaseQuantity(item.id)}
                className="p-2 border border-gray-300 mr-2 focus:outline-none focus:ring"
              >
                <BiMinus className="h-3 w-3" />
              </button>
              <span className="text-sm border px-3 py-1 bg-white border-gray-600 font-semibold">
                {quantity}
              </span>
              <button
                //onClick={increaseQuantity}
                onClick={() => handleIncreaseQuantity(item.id)}
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
              onClick={()=>handleDeleteItem(item.id)}
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
