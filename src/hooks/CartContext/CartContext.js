import { createContext, useEffect, useState } from "react";

export const Cart = createContext();

const CartContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [shoppinCart, setShoppinCart] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const cart =
    localStorage.getItem("myCart") &&
    JSON.parse(localStorage.getItem("myCart"));


  // useEffect(() => {
  //   if (cart) {
  //     setShoppinCart(false);
  //     setLoading(false);
  //   } else {
  //     setShoppinCart(false);
  //   }
  // }, [cart, shoppinCart]);
  const deleteCartItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("myCart", JSON.stringify(updatedCartItems));
  };
  
  return (
    <Cart.Provider
      value={{
        cart,
        shoppinCart,
        setShoppinCart,
        loading,
        setLoading,
        deleteCartItem
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartContext;
