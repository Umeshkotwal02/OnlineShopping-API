import axios from 'axios';
import { fetchHomeFailure, fetchHomeStart, fetchHomeSuccess } from './homeSlice';
import { API_URL } from '../../Constant/constApi';
import { STORAGE } from '../../config/config';

const fetchHomePageDetails = () => async (dispatch) => {
  dispatch(fetchHomeStart());
  try {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    const { data } = await axios.post(`${API_URL}home`, {
      user_type: userProfile?.user_type ?? STORAGE?.B2C,
      device_id: localStorage.getItem(STORAGE?.DEVICEID),
      user_id: userProfile?.id,
      is_mobile: "0",
      is_admin: "0",
    });

    if (data?.STATUS === 200) {
      dispatch(fetchHomeSuccess(data.DATA) || []);
    } else {
      dispatch(fetchHomeFailure('Failed to fetch home data.'));
    }
  } catch (error) {
    dispatch(fetchHomeFailure(error.message));
  }
};

export { fetchHomePageDetails };
