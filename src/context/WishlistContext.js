// import axios from "axios";
// import React, { createContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { STORAGE } from "../config/config";

// const WishlistContext = createContext();

// const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const loggedIn = localStorage.getItem(STORAGE?.ISLOGIN);
//     setIsLoggedIn(loggedIn);
//     if (loggedIn) {
//       fetchWishlistItem();
//     }
//   }, []);

//   const fetchWishlistItem = async () => {
//     try {
//       const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
//       const { data } = await axios.post("mywishlist", {
//         device_id: localStorage.getItem(STORAGE?.DEVICEID),
//         is_mobile: "0",
//         user_id: userProfile?.id,
//         user_type: userProfile?.user_type,
//         page: 1,
//       });
//       if (data && data?.STATUS === 200) {
//         setWishlist(data?.DATA);
//         setWishlistCount(data?.DATA.length);
//       }
//     } catch (err) {
//       // console.error(err);
//       // toast.error(err?.response?.data?.MESSAGE || err?.message || "Failed to fetch items.");
//     }
//   };

//   const removeFromWishlist = async (id) => {
//     try {
//       const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
//       const { data } = await axios.post("removefromwishlist", {
//         device_id: localStorage.getItem(STORAGE?.DEVICEID),
//         product_id: [id],
//         user_id: userProfile?.id,
//       });

//       if (data && data?.STATUS === 200) {
//         fetchWishlistItem();
//         toast.success(data?.MESSAGE || "Removed from wishlist.");
//       }
//     } catch (err) {
//       console.error(err);
//       // toast.error(err?.response?.data?.MESSAGE || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchWishlistItem();
//     }
//   }, [isLoggedIn]);

//   const contextValue = {
//     wishlist,
//     wishlistCount,
//     fetchWishlistItem,
//     removeFromWishlist,
//   };

//   return (
//     <WishlistContext.Provider value={contextValue}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export { WishlistContext, WishlistProvider };

import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { STORAGE } from "../config/config";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch wishlist items when the component mounts and on login status change
  useEffect(() => {
    const loggedIn = localStorage.getItem(STORAGE?.ISLOGIN);
    setIsLoggedIn(!loggedIn); // Ensure it's boolean
    if (loggedIn) {
      fetchWishlistItem();
    }
  }, []);

  const fetchWishlistItem = async () => {
    try {
      const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
      if (!userProfile || !userProfile?.id) {
        setWishlist([]);
        setWishlistCount(0);
        return;
      }

      const { data } = await axios.post("mywishlist", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "0",
        user_id: userProfile?.id,
        user_type: userProfile?.user_type,
        page: 1,
      });

      console.log("wishagsh ln 120")

      if (data && data?.STATUS === 200) {
        setWishlist(data?.DATA || []);
        setWishlistCount(data?.DATA?.length || 0);
      } else {
        setWishlist([]);
        setWishlistCount(0);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.MESSAGE || err?.message || "Failed to fetch items.");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
      if (!userProfile || !userProfile?.id) {
        toast.error("User not logged in");
        return;
      }

      const { data } = await axios.post("removefromwishlist", {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        product_id: [id],
        user_id: userProfile?.id,
      });

      if (data && data?.STATUS === 200) {
        fetchWishlistItem();
        toast.success(data?.MESSAGE || "Removed from wishlist.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.MESSAGE || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // 27-09-24 comment by team
      // fetchWishlistItem();
    }
  }, [isLoggedIn]);

  const contextValue = {
    wishlist,
    wishlistCount,
    fetchWishlistItem,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistProvider };

