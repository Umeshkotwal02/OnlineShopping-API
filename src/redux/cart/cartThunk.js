import axios from "axios";
import {
  setCartInfo,
  setCartIcons,
  setCartItems,
  setLoading,
  setError,
} from "./cartSlice";
import toast from "react-hot-toast";
import { API_URL } from "../../Constant/constApi";
import { STORAGE } from "../../config/config";

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

export const addToCart = (productId, stitchingOptions = []) => async (dispatch) => {
  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
  const firstStitchingOption = stitchingOptions?.[0] || {};
  const stitchingLabel = firstStitchingOption?.label || "unstitched";
  const stitchingPrice = firstStitchingOption?.price || 0;
  const stchingValue = `${stitchingLabel}`;

  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(`${API_URL}addtocart`, {
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      is_mobile: "0",
      product_id: productId,
      product_quantity: 1,
      stching: stchingValue,
      is_admin: "0",
      user_id: userProfile?.id,
    });

    if (data?.STATUS === 200) {
      dispatch(setCartInfo(data?.DATA?.cart));
      dispatch(setCartIcons(data?.DATA?.icons));
      dispatch(setCartItems(data?.DATA?.cart?.items));
      toast.success(data?.MESSAGE || "Product added to cart successfully.");
    } else {
      toast.error(data?.MESSAGE || "Failed to add product to cart.");
    }
  } catch (err) {
    console.error(err);
    dispatch(setError(err?.response?.data?.MESSAGE || "Failed to add product to cart."));
    toast.error(err?.response?.data?.MESSAGE || "Failed to add product to cart.");
  } finally {
    dispatch(setLoading(false));
  }
};

