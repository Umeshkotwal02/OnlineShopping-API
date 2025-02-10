import React, { useState, useEffect, useRef } from "react";
import "../../styles/ProfilePageMobile.css";
import {
    AddressProIcon,
    MyOrderProIcon,
    NotificationProIcon,
    OffCanvaArrowIcon,
    ProfileTwoIcon,
    WishlistProfileIcon,
} from "../../assets/SvgIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../redux/user/userThunk.js";
import { useForm } from "react-hook-form";
import { STORAGE } from "../../config/config.js";
import { setCartInfo, setCartItems } from "../../redux/cart/cartSlice.js";
import { resetWishlistCount } from "../../redux/wishlist/wishlistSlice.js";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../components/firebase.jsx";
import ProfileModal from "../../components/offcanvas/ProfileModal.jsx";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userDetails, loading, error } = useSelector((state) => state.user);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showProfileModals, setShowProfileModals] = useState(false); // Profile Modal
    const [isOpen, setIsOpen] = useState(false);



    // Profile
    const handleProfileModals = () => {
        setIsOpen(false);
        setShowProfileModals(true);
    };

    const handleCloseProfileModals = () => setShowProfileModals(false);

    useEffect(() => {
        dispatch(fetchUserDetails());
        console.log("Mbile Profile API CALLED::");

    }, [dispatch]);

    useEffect(() => {
        if (userDetails) {
            setValue("user_email", userDetails.user_email || "");
            setValue("user_mobile", userDetails.user_mobile || "");
        }
    }, [userDetails, setValue]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem(STORAGE?.USERDETAIL);
        localStorage.removeItem(STORAGE?.ISLOGIN);
        dispatch(setCartInfo(null));
        dispatch(setCartItems([]));
        dispatch(resetWishlistCount());
        signOut(auth).then(() => {
            toast.success("Logged out successfully");
            navigate("/");
        }).catch((error) => {
            console.error("Logout Error: ", error.message);
        });
    };

    return (
        <>
            <h1 className="text-start m-4">My Profile</h1>

            <div className="profile-modal">
                {/* Header Section */}
                <div className="profile-header">
                    <img
                        src={userDetails?.user_profile || "/images/account-avatar.png"}
                        alt="Profile"
                        className="profile-image"
                    />
                    <h1 className="fw-bold">{userDetails?.user_name}{" "} {userDetails?.user_last_name}</h1>
                    <p className="profile-email fw-medium fs-5">
                        {userDetails?.user_email}{" "} {userDetails?.user_mobile}{" "}
                    </p>
                </div>

                {/* Account Settings Section */}
                <h3 className="mx-3 my-3">Account Setting</h3>
                <div className="account-settings mx-3 my-0 py-1">
                    <ul className="settings-list">
                        {/* Profile */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3" onClick={handleProfileModals}
                            >
                                <div className="settings-icons">
                                    <ProfileTwoIcon className="icon" />
                                </div>
                                <span className="fw-medium fs-4">Profile</span>
                            </div>
                            <span className="profile-arrow">
                                <OffCanvaArrowIcon />
                            </span>
                        </li>

                        {/* Wishlist */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3 pointer-style" onClick={() => navigate('/wishlist')}
                            >
                                <div className="settings-icons">
                                    <WishlistProfileIcon className="icon" />
                                </div>
                                <span className="fw-medium fs-4">Wishlist</span>
                            </div>
                            <span className="profile-arrow">
                                <OffCanvaArrowIcon />
                            </span>
                        </li>

                        {/* My Order */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3 pointer-style" onClick={() => navigate('/my-order')}>
                                <div className="settings-icons">
                                    <MyOrderProIcon className="icon" />
                                </div>
                                <span className="fw-medium fs-4">My Order</span>
                            </div>
                            <span className="profile-arrow">
                                <OffCanvaArrowIcon />
                            </span>
                        </li>

                        {/* My Address */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3 pointer-style" onClick={() => navigate('/123')}>
                                <div className="settings-icons">
                                    <AddressProIcon className="icon" />
                                </div>
                                <span className="fw-medium fs-4">My Address</span>
                            </div>
                            <span className="profile-arrow">
                                <OffCanvaArrowIcon />
                            </span>
                        </li>

                        {/* Notifications */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3 pointer-style">
                                <div className="settings-icons">
                                    <NotificationProIcon className="icon" />
                                </div>
                                <span className="fw-medium fs-4">Notifications</span>
                            </div>
                            <span className="profile-arrow">
                                <OffCanvaArrowIcon />
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Logout Button */}
                <div className="text-center my-4 mx-3">
                    <button className="logout-btn fw-medium pointer-style" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
                <ProfileModal show={showProfileModals} handleClose={handleCloseProfileModals} />
        </>
    );
};

export default ProfilePage;