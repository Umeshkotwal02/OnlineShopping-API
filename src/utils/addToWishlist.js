import axios from "axios";
import toast from "react-hot-toast";
import { STORAGE } from "../config/config";

const addToWishlist = async (productId) => {
   const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL))
   try {
      const { data } = await axios.post("/addtowishlist", {
         device_id: localStorage.getItem(STORAGE?.DEVICEID),
         is_mobile: "0",
         product_id: [productId],
         user_id:userProfile?.id,
      });

      if (data && data?.STATUS === 200) {
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
