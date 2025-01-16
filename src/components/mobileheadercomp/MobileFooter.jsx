import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HeartIcon, HomeActiveIcon, HomeIcon, WishlistIcon } from '../../assets/SvgIcons';
import { CgProfile } from "react-icons/cg";
import "../../styles/Mobile-footer.css";
import { HiOutlineViewGrid, HiViewGrid } from "react-icons/hi";
import LoginModal from '../../pages/MobilePages/LoginModal';
import { useNavigate } from 'react-router-dom';

const MobileFooter = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track login state

  const handleLoginModal = () => setShowLoginModal(!showLoginModal);

  const handleSuccessfulLogin = () => {
    setShowLoginModal(false);
    setIsUserLoggedIn(true); // Set user as logged in
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isUserLoggedIn) {
      navigate("/profile");
    } else {
      setShowLoginModal(true); // Open Login Modal
    }
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
                    <HomeIcon style={{ fontSize: '24px', color: 'black' }} />
                  ) : (
                    <HomeActiveIcon style={{ fontSize: '24px', color: 'blue' }} />
                  )}
                  <span className="mt-2">Home</span>
                </>
              )}
            </NavLink>
          </Col>

          {/* Category */}
          <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
            <NavLink
              to="/"
              className="mobi-footer-icon d-flex flex-column align-items-center"
              activepagemobile="active"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <HiViewGrid style={{ fontSize: '24px', color: 'blue' }} />
                  ) : (
                    <HiOutlineViewGrid style={{ fontSize: '24px', color: 'black' }} />
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
                    <HeartIcon style={{ fontSize: '24px', color: 'black' }} />
                  ) : (
                    <WishlistIcon style={{ fontSize: '24px', color: 'blue' }} />
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
              onClick={handleNavigate}
            >
              <CgProfile style={{ fontSize: '24px', color: 'black' }} />
              <span className="mt-2">My Profile</span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Login Modal */}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        setUser={handleSuccessfulLogin}
      />
    </>
  );
};

export default MobileFooter;
