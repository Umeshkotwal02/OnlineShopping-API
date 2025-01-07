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

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [profileImage, setProfileImage] = useState(
        "https://via.placeholder.com/100"
    );

    // Load the profile picture from local storage on component mount
    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setProfileImage(base64Image);
                localStorage.setItem("profileImage", base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger the hidden file input on profile image click
    const handleProfileImageClick = () => {
        fileInputRef.current.click(); // Programmatically trigger the file input
    };

    // Logout function
    const handleLogout = () => {
        // Clear user data from sessionStorage or localStorage
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("userName");
        localStorage.removeItem("authUserr");
        localStorage.removeItem("profileImage");

        // Navigate to the home page
        navigate("/");
    };

    return (
        <>
            <h1 className="text-start m-4">My Profile</h1>

            <div className="profile-modal">
                {/* Header Section */}
                <div className="profile-header">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                        onClick={handleProfileImageClick} // Click to select image
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }} // Hide the file input
                    />
                    <h1 className="fw-bold">Priyanka Singh</h1>
                    <p className="profile-email fw-medium fs-5">
                        priyankashingh4587921@gmail.com
                    </p>
                </div>

                {/* Account Settings Section */}
                <h3 className="mx-3 my-3">Account Setting</h3>
                <div className="account-settings mx-3 my-0 py-1">
                    <ul className="settings-list">
                        {/* Profile */}
                        <li className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
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
                            <div className="d-flex align-items-center gap-3" onClick={navigate('/wishlist')}>
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
                            <div className="d-flex align-items-center gap-3" onClick={navigate('/my-order')}>
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
                            <div className="d-flex align-items-center gap-3" onClick={navigate('/')}>
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
                            <div className="d-flex align-items-center gap-3">
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
                    <button className="logout-btn font-medium" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
