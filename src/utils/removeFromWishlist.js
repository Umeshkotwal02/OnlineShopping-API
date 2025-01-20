import axios from "axios";
import toast from "react-hot-toast";
import { STORAGE } from "../config/config";

const removeFromWishlist = async (id) => {
   try {
      const { data } = await axios.post("removefromwishlist", {
         device_id: localStorage.getItem(STORAGE?.DEVICEID),
         product_id: [id],
         user_id: localStorage.getItem("userId"),
      });

      if (data && data?.STATUS === 200) {
         //  fetchWishlistProducts();
         toast.success(data?.MESSAGE || "Removed from wishlist.");
         return true;
      } else {
         return false;
      }
   } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.MESSAGE || "Something went wrong");
      return false;
   }
};

export default removeFromWishlist;
