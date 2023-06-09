import { createContext, useEffect, useState } from "react";

export const Cart = createContext();

const CartContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("myCart");
    if (cartData) {
      setShoppingCart(JSON.parse(cartData));
    }
    setLoading(false);
  }, [loading]);

  return (
    <Cart.Provider
      value={{
        shoppingCart,
        loading,
        setLoading,
        setShoppingCart
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartContext;
