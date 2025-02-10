import axios from 'axios';
import { setUserDetails, setLoading, setError } from './userSlice';
import { API_URL } from '../../constants/constApi';
import { STORAGE } from '../../config/config';
import toast from 'react-hot-toast';

export const fetchUserDetails = () => async (dispatch) => {
  const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
  try {
    const userProfileRaw = localStorage.getItem(STORAGE?.USERDETAIL);
    // If user profile is not found, stop execution
    if (!userProfileRaw) {
      dispatch(setLoading(false));
      return;
    }

    const userProfile = JSON.parse(userProfileRaw);
    const { data } = await axios.post(`${API_URL}userdetail`, {
      user_id: userProfile?.id,
      device_id: deviceId,
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
    });

    if (data?.STATUS === 200) {
      console.log("Fetch User Data::", data);
      const { user_name, user_last_name, user_email, user_mobile, user_profile } = data.DATA;
      dispatch(setUserDetails({ user_first_name: user_name, user_last_name, user_email, user_mobile, user_profile }));
    }
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserDetails = (updatedDetails) => async (dispatch) => {
  const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
  const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));

  try {
    dispatch(setLoading(true));
    const response = await axios.post(`${API_URL}updateprofile`, {
      device_id: deviceId,
      id: userProfile?.id,
      is_admin: "0",
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
      ...updatedDetails,
    });

    if (response.data && response.data.STATUS === 200) {
      toast.success("User Data Updated Successfully")
      console.log("update Data data ::", response.data);
      dispatch(setUserDetails(updatedDetails));
    } else {
      dispatch(setError("Failed to update user."));
    }
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};