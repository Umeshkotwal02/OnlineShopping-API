import axios from 'axios';
import { API_URL } from './constApi';

const getAuthToken = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    return authUser?.token;
};

const token = getAuthToken();
export const headers = {
    token: `Bearer ${token}`,
};

// Create Axios instance
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: headers,
});

export const apiRoutes = {
    gstTax: 'gsttax',
    gstTaxById: (id) => `gsttax/${id}`,
    gstTaxStatus: (id) => `gsttax/status/${id}`,
  };

