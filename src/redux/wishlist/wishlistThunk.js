import axios from 'axios';
import { setWishlist, setLoggedIn, setLoading, setError } from './wishlistSlice';
import toast from 'react-hot-toast';
import { STORAGE } from '../../config/config';
import { API_URL } from '../../Constant/constApi';

export const fetchWishlistItem = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile || !userProfile?.id) {
      dispatch(setWishlist([]));
      dispatch(setLoading(false));
      return;
    }

    const { data } = await axios.post(`${API_URL}mywishlist`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      is_mobile: '0',
      user_id: userProfile?.id,
      user_type: userProfile?.user_type,
      page: 1,
    });

    if (data?.STATUS === 200) {
      dispatch(setWishlist(data?.DATA || []));
    } else {
      dispatch(setWishlist([]));
    }
  } catch (err) {
    console.error(err);
    dispatch(setError(err?.response?.data?.MESSAGE || 'Failed to fetch items.'));
    toast.error(err?.response?.data?.MESSAGE || 'Failed to fetch items.');
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeFromWishlist = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile || !userProfile?.id) {
      toast.error('User not logged in');
      return;
    }

    const { data } = await axios.post(`${API_URL}removefromwishlist`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      product_id: [id],
      user_id: userProfile?.id,
    });

    if (data?.STATUS === 200) {
      dispatch(fetchWishlistItem());
      toast.success(data?.MESSAGE || 'Removed from wishlist.');
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.MESSAGE || 'Something went wrong');
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToWishlist = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL))
  try {
    const { data } = await axios.post(`${API_URL}addtowishlist`, {
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      is_mobile: "0",
      product_id: [id],
      user_id: userProfile?.id,
    });

    if (data && data?.STATUS === 200) {
      dispatch(fetchWishlistItem());
      toast.success(data?.MESSAGE || "Added to wishlist.");
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.MESSAGE || "Something went wrong.");
    return false;
  }
};

export default addToWishlist;