import axios from "axios";
import {
  setCartInfo,
  setCartIcons,
  setCartItems,
  setLoading,
  setError,
} from "./cartSlice";
import toast from "react-hot-toast";
import { API_URL } from "../../constants/constApi";
import { STORAGE } from "../../config/config";
import { updateCartItem, removeCartItem } from "./cartSlice";

export const fetchCartItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    const { data } = await axios.post(`${API_URL}viewcart`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      user_id: userProfile?.id || null,
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
    });

    if (data?.STATUS === 200) {
      dispatch(setCartInfo(data?.DATA?.cart));
      dispatch(setCartIcons(data?.DATA?.icons));
      dispatch(setCartItems(data?.DATA?.cart?.items));
    } else {
      dispatch(setCartInfo([]));
      dispatch(setCartIcons([]));
      dispatch(setCartItems([]));
      toast.error(data?.MESSAGE || "Failed to fetch cart info.");
    }
  } catch (err) {
    console.error(err);
    dispatch(setError(err?.response?.data?.MESSAGE || "Failed to fetch cart info."));
    toast.error(err?.response?.data?.MESSAGE || "Failed to fetch cart info.");
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToCart = (productId, quantity, stitchingOptions = []) => async (dispatch, getState) => {
  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
  const firstStitchingOption = stitchingOptions?.[0] || {};
  const stitchingLabel = firstStitchingOption?.label || "unstitched";
  const stitchingPrice = firstStitchingOption?.price || 0;
  const stchingValue = `${stitchingLabel}`;

  // Get the existing cart ID from the Redux store
  const { cartInfo } = getState().cart;
  const cartId = cartInfo?.cart_id;

  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(`${API_URL}addtocart`, {
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      is_mobile: "0",
      product_id: productId,
      product_quantity: quantity || 1,
      stching: stchingValue,
      is_admin: "0",
      user_id: userProfile?.id,
      cart_id: cartId,
    });
    console.log("API Response:", data); // Debugging log

    if (data?.STATUS === 200) {
      dispatch(fetchCartItems()); // Remove this
      dispatch(setCartInfo(data?.DATA?.cart));
      dispatch(setCartIcons(data?.DATA?.icons));
      dispatch(setCartItems(data?.DATA?.cart?.items));
      toast.success(data?.MESSAGE || "Product added to cart successfully.");
    } else {
      toast.error(data?.MESSAGE || "Failed to add product to cart.");
    }
  } catch (err) {
    console.error(err); // Debugging log
    dispatch(setError(err?.response?.data?.MESSAGE || "Failed to add product to cart."));
    toast.error(err?.response?.data?.MESSAGE || "Failed to add product to cart.");
  } finally {
    dispatch(setLoading(false));
  }
};


// Update Cart Item
export const updateCartItemThunk = (cartChildId, quantity) => async (dispatch) => {
  dispatch(setLoading(true));
  toast.dismiss();
  const toastId = toast.loading("Updating cart...");
  try {
    const { data } = await axios.post(`${API_URL}updatecart`, {
      cart_child_id: cartChildId,
      product_quantity: quantity,
    });
    if (data?.STATUS === 200) {
      dispatch(fetchCartItems());
      dispatch(updateCartItem({ cartChildId, quantity }));
      toast.success(data?.MESSAGE || "Cart updated.");
    }
  } catch (err) {
    toast.error(err?.response?.data?.MESSAGE || "Something went wrong");
  } finally {
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
};

// Remove Item from Cart
export const removeFromCartThunk = (cartChildId, cartId, itemInfo) => async (dispatch) => {
  dispatch(setLoading(true));
  toast.dismiss();
  const toastId = toast.loading("Removing from cart...");
  try {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    const { data } = await axios.post(`${API_URL}productremovefromcart`, {
      user_type: userProfile?.user_type ?? STORAGE?.B2C, // Ensure default value
      is_admin: "0",
      device_id: localStorage.getItem(STORAGE?.DEVICEID), // Use correct key from STORAGE
      user_id: userProfile?.id,
      cart_child_id: cartChildId, // Optional, if required by API
      product_id: itemInfo?.product_id, // Pass product_id from itemInfo
      cart_id: cartId, // Pass cart_id
    });

    if (data?.STATUS === 200) {
      dispatch(fetchCartItems()); // Remove this
      dispatch(removeCartItem(cartChildId));
      toast.success(data?.MESSAGE || "Product removed from cart.");
      dispatch(fetchCartItems()); // Keep only this one
    }
    else {
      toast.error(data?.MESSAGE || "Failed to remove product from cart.");
    }
  } catch (err) {
    console.error(err); // Debugging log
    toast.error(err?.response?.data?.MESSAGE || "Something went wrong");
  } finally {
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
};