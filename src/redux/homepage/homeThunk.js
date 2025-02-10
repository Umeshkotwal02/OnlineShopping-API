import axios from 'axios';
import { fetchHomeFailure, fetchHomeStart, fetchHomeSuccess } from './homeSlice';
import { API_URL } from '../../constants/constApi';
import { STORAGE } from '../../config/config';

const fetchHomePageDetails = () => async (dispatch) => {
  dispatch(fetchHomeStart());
  try {
    // const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL)) || {};
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID || 0);

    // Validate required parameters
    if (!deviceId) {
      throw new Error("Device ID is missing");
    }

    const { data } = await axios.post(`${API_URL}home`, {
      user_type: STORAGE?.B2C,
      device_id: deviceId,
      // user_id: userProfile?.id || null,
      is_mobile: "0",
      is_admin: "0",
    });

    if (data?.STATUS === 200) {
      dispatch(fetchHomeSuccess(data.DATA));
    } else {
      dispatch(fetchHomeFailure(data?.MESSAGE || 'Failed to fetch home data.'));
    }
  } catch (error) {
    console.error('Error fetching home page details:', error);
    dispatch(fetchHomeFailure(error?.message || 'An error occurred while fetching home data.'));
  }
};

export { fetchHomePageDetails };
