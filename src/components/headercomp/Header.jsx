import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { AccountIcon, WishlistIcon, LoginIcon, DropdownDown, LgBagIcon, DropdownUp, ProfileIcon, NotificationIcon, MyOrderIcon } from "../../assets/SvgIcons";
import LoginOffCanvas from "../canvas/LoginOffCanvas";
import CategoryMenu from "./CategoryMenu";
import TopBar from "./TopBar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import NotificationCanvas from "../canvas/NotificationCanvas";
import "../../styles/Header.css"
import CartOffCanvas from "./CartOffCanvas";
import SearchBar from "../SearchBar";
import axios from "axios";
import { API_URL } from "../../Constant/constApi";
import ProfileModal from "../canvas/ProfileModal";
import { UserProvider } from "../../context/UserContext ";
import MainHeaderMobi from "../mobileheadercomp/MobileHeader";
import { STORAGE } from "../../config/config";
import { setCartInfo, setCartItems } from "../../redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistItem } from "../../redux/wishlist/wishlistThunk";
import { fetchCartItems } from "../../redux/cart/cartThunk";

const Header = () => {

  const [showLoginCanvas, setShowLoginCanvas] = useState(false); // Login OffCanvas
  const [showCartCanvas, setShowCartCanvas] = useState(false); // Cart OffCanvas
  const [showProfileModals, setShowProfileModals] = useState(false); // Profile Modal
  const [showNotificationModal, setShowNotificationModal] = useState(false); // Notification Modal
  const [headerButtons, setHeaderButtons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.wishlist.wishlistCount);
  const cartCount = useSelector((state) => state.cart.cartCount);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem(STORAGE?.USERDETAIL);
    localStorage.removeItem(STORAGE?.DEVICEID);
    dispatch(setCartInfo(null));
    dispatch(setCartItems([]));
    setUser(null);
    setIsOpen(!isOpen);
    signOut(auth).then(() => {
      toast.success("Logged out successfully");
      navigate("/");
    }).catch((error) => {
      console.error("Logout Error: ", error.message);
    });
  };
  const handleUserUpdate = (userData) => {
    console.log("User data updated:", userData);
    setUser(userData);
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  //login
  const handleShowLoginCanvas = () => {
    document.body.classList.add("body-lock");
    setIsOpen(false);
    setShowLoginCanvas(true);
  };
  const handleCloseLoginCanvas = () => {
    document.body.classList.remove("body-lock");
    setShowLoginCanvas(false);
  };

  //WishList
  const handleNavigateToWishlist = () => {
    navigate('/wishlist');
  };

  // Cart
  const handleOpenCartCanvas = () => {
    setIsOpen(false);
    setShowCartCanvas(true);
  };
  const handleCloseCartCanvas = () => {
    setShowCartCanvas(false);
  }

  // Profile
  const handleProfileModals = () => {
    document.body.classList.add("body-lock");
    setIsOpen(false);
    setShowProfileModals(true);
  };

  const handleCloseProfileModals = () => setShowProfileModals(false);
  // Notification
  const handleNotificationModals = () => {
    document.body.classList.add("body-lock");
    setIsOpen(false);
    setShowNotificationModal(true);
  };

  //My-Order
  const handleMyOrder = () => {
    navigate("/my-order");
    setIsOpen(false);
  };


  const fetchHeaderButtons = async () => {
    try {
      const response = await axios.get(`${API_URL}header_api`);
      const { data } = response;

      if (data && data.STATUS === 200 && Array.isArray(data.DATA)) {
        setHeaderButtons(data.DATA);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching header buttons:", err);
      toast.error(
        err?.response?.data?.MESSAGE ||
        err?.message ||
        "Failed to fetch header buttons."
      );
    }
  };

  const handleCloseNotificationModals = () => setShowNotificationModal(false);

  // Monitor authentication state
  useEffect(() => {
    dispatch(fetchWishlistItem());
    dispatch(fetchCartItems());
    fetchHeaderButtons();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [dispatch]);

  return (
    <>
      <TopBar />
      {/* <MainHeaderMobi /> */}
      <div className="sticky-top" style={{ backgroundColor: "#F3F3F3" }}>

        <Container fluid className="px-lg-5 px-xl-5 px-xxl-5 pt-lg-1">
          <div className="d-none d-lg-block">
            <Row className="align-items-center pt-3">
              <Col xl={3} xxl={3} lg={3} className="d-flex align-items-center">
                <Link to="/">
                  <img
                    src={require("../../assets/images/header-logo.png")}
                    alt="header-logo"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                </Link>
              </Col>

              {/* Search Bar */}
              <Col xxl={6} xl={6} lg={6} className="flex-grow-1 my-1">
                <SearchBar />

              </Col>

              {/* Icons Section */}
              <Col xxl={3} xl={3} lg={3} className="d-flex justify-content-end gap-3">
                <div className="text-dark d-flex align-items-center gap-1 text-size">
                  {user ? (
                    <>
                      {/* Logout button */}
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <div
                          className="text-dark d-flex align-items-center gap-1"
                          onClick={toggleDropdown}
                          style={{ cursor: "pointer", fontSize: "0.9rem" }}
                        >
                          <AccountIcon />
                          <span className="d-none d-xl-inline-block">Account</span>
                          {isOpen ? <DropdownUp /> : <DropdownDown />}
                        </div>

                        {/* Dropdown */}
                        {isOpen && (
                          <div className="dropdown-paper box-shadow">
                            <div className="flex flex-col px-3.5 m-2 fw-medium" style={{ color: "black" }}>
                              <div
                                className="login-container  py-3.5 flex items-center gap-3.5 text-base fw-medium text-font border-bottom"
                                onClick={handleProfileModals}
                              >
                                <ProfileIcon />
                                My Profile
                              </div>
                              <div
                                className="login-container py-3.5 flex items-center gap-3.5 text-base fw-medium text-font border-bottom"
                                onClick={handleNotificationModals}
                              >
                                <NotificationIcon />
                                Notification
                              </div>
                              <div
                                className="login-container py-3.5 flex items-center gap-3.5 text-base fw-medium text-font border-bottom"
                                onClick={handleMyOrder}
                              >
                                <MyOrderIcon className="fs-4" />
                                My Order
                              </div>
                              <div
                                className="login-container py-3.5 flex items-center gap-3.5 text-base fw-medium text-font"
                                onClick={handleLogout}
                              >
                                <IoLogOutOutline className="fs-4" />
                                Logout
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <div
                        className="text-dark d-flex align-items-center gap-1"
                        onClick={toggleDropdown}
                        style={{ cursor: "pointer", fontSize: "0.9rem" }}
                      >
                        <AccountIcon />
                        <span className="d-none d-xl-inline-block">Account</span>
                        {isOpen ? <DropdownUp /> : <DropdownDown />}
                      </div>

                      {/* Dropdown */}
                      {isOpen && (
                        <div className="dropdown-paper">
                          <div className="flex flex-col px-3.5 login-con">
                            <div
                              className="login-container py-3.5 flex items-center gap-3.5 text-base fw-medium text-font"
                              onClick={handleShowLoginCanvas}
                            >
                              <LoginIcon />
                              Login/Signup
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  )}
                </div>

                {/* Wishlist count */}
                <div
                  className="text-dark d-flex align-items-center gap-1 position-relative"
                  onClick={handleNavigateToWishlist}
                  style={{ cursor: 'pointer' }}
                >
                  <WishlistIcon />
                  {wishlistCount > 0 && (
                    <span
                      className="cart badge bg-danger rounded-pill text-white"
                      style={{
                        fontSize: '0.7rem',
                        width: '18px',
                        height: '18px',
                        position: 'absolute',
                        top: '9px',
                        left: '14px',
                        textAlign: 'center',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                  <span
                    className="d-none d-xl-inline-block text-size ms-1 pt-1"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Wishlist
                  </span>
                </div>

                {/* Cart count */}
                <div
                  className="text-dark d-flex align-items-center gap-1 position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={handleOpenCartCanvas}
                >
                  <LgBagIcon />
                  {cartCount > 0 && (
                    <span
                      className="cart badge bg-danger rounded-pill text-white"
                      style={{
                        fontSize: "0.7rem",
                        width: "18px",
                        height: "18px",
                        position: "absolute",
                        top: "13px",
                        right: "32px",
                        textAlign: "center",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                  <span className="d-none d-xl-inline-block text-size ms-1 pt-1">Cart</span>
                </div>

              </Col>
            </Row>
          </div>
        </Container>
        <CategoryMenu headerCatData={headerButtons} />
      </div>
      <LoginOffCanvas show={showLoginCanvas} handleClose={handleCloseLoginCanvas} setUser={handleUserUpdate} />
      <CartOffCanvas show={showCartCanvas} handleClose={handleCloseCartCanvas} />
      <UserProvider>
        <ProfileModal show={showProfileModals} handleClose={handleCloseProfileModals} />
      </UserProvider>
      <NotificationCanvas show={showNotificationModal} handleClose={handleCloseNotificationModals} />

      {/* <MobileFooter /> */}

    </>
  );
};

export default Header;
