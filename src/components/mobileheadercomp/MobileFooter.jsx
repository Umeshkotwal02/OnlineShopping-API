import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { GridIcon, HeartIcon, HomeActiveIcon, HomeIcon, WishlistIcon } from "../../assets/SvgIcons";
import { CgProfile } from "react-icons/cg";
import "../../styles/Mobile-footer.css";
import { HiViewGrid } from "react-icons/hi";
import LoginModal from "../../pages/MobilePages/LoginModal";
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const { userDetails, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    // Sync state with localStorage
    setIsUserLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  const handleSuccessfulLogin = () => {
    setShowLoginModal(false);
    localStorage.setItem("isLoggedIn");
    setIsUserLoggedIn(true);
  };

  return (
    <>
      <Container fluid className="mobile-footer">
        <Row className="pt-3 fw-medium">
          {/* Home */}
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
            <NavLink
              to="/"
              className="mobi-footer-icon d-flex flex-column align-items-center"
              activepagemobile="active"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <HomeActiveIcon style={{ fontSize: "24px", color: "black" }} />
                  ) : (
                    <HomeIcon style={{ fontSize: "24px", color: "#6D6D6D" }} />
                  )}
                  <span className="mt-2">Home</span>
                </>
              )}
            </NavLink>
          </Col>

          {/* Category */}
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
            <NavLink
              to="/mobile-category"
              className="mobi-footer-icon d-flex flex-column align-items-center"
              activepagemobile="active"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <HiViewGrid style={{ fontSize: "24px", color: "#6D6D6D" }} />
                  ) : (
                    <GridIcon style={{ fontSize: "24px", color: "#6D6D6D" }} />
                  )}
                  <span className="mt-2">Category</span>
                </>
              )}
            </NavLink>
          </Col>

          {/* Wishlist */}
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
            <NavLink
              to="/wishlist"
              className="mobi-footer-icon d-flex flex-column align-items-center"
              activepagemobile="active"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <HeartIcon style={{ fontSize: "24px", color: "#6D6D6D" }} />
                  ) : (
                    <WishlistIcon style={{ fontSize: "24px", color: "#6D6D6D" }} />
                  )}
                  <span className="mt-2">Wishlist</span>
                </>
              )}
            </NavLink>
          </Col>

          {/* My Profile */}
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
            <div
              className="mobi-footer-icon d-flex flex-column align-items-center"
              onClick={() => {
                if (isUserLoggedIn) {
                  navigate("/profile");
                } else {
                  setShowLoginModal(true);
                }
              }}
            >
              {isUserLoggedIn ? (
                <>
                  <img
                    src={userDetails?.user_profile || "/images/account-avatar.png"}
                    alt="Profile"
                    className="profile-img-footer profile-border-active"
                  />
                </>
              ) : (
                <CgProfile style={{ fontSize: "24px" }} className="profile-border" />
              )}
              <span className="mt-2">My Profile</span>
            </div>
          </Col>

        </Row>
      </Container >

      {/* Login Modal */}
      < LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setIsLoggedIn={handleSuccessfulLogin}
      />
    </>
  );
};

export default MobileFooter;
