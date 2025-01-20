import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { STORAGE } from "../config/config";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState([]);
  const [cartIcons, setCartIcons] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  const fetchCartItems = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      const { data } = await axios.post("viewcart", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_id: userProfile?.id,
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
      });

      if (data && data?.STATUS === 200) {
        setCartInfo(data?.DATA?.cart);
        setCartIcons(data?.DATA?.icons);
        setCartItem(data?.DATA?.cart?.items);
        // console.log("view carat:::", data?.DATA?.cart);
      }
    } catch (err) {
      // console.error(err);
      // toast.error(err?.response?.data?.MESSAGE || "Failed to fetch cart info.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        setCartInfo,
        cartIcons,
        setCartIcons,
        fetchCartItems,
        cartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
