import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Row, Col, Nav } from "react-bootstrap";
import { CartIcon, OffCanvaArrowIcon } from "../../assets/SvgIcons";
import "../../styles/OffCanvasForHeader.css"
import CartModal from "../../pages/MobilePages/CartModal";
import { useSelector } from "react-redux";

const MainHeaderMobi = () => {

  const [showOffcanvas, setShowOffcanvas] = useState(false); // Menu Offcanvas
  const [showCartModal, setShowCartModal] = useState(false); // Cart Offcanvas
  const { cartInfo } = useSelector((state) => state.cart);

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  // Cart
  const handleCartOpen = () => {
    setShowCartModal(true);
  };
  const handleCloseCartModal = () => {
    setShowCartModal(false);
  }

  return (
    <header className="sticky-top">
      {/* Header for Small and Medium Screens Mobile and tablate view*/}
      <div className="d-lg-none container-fluid web-bg-color py-1">
        <Row className="align-items-center py-1 px-0">
          <Col xs={2} className="text-start">
            <button
              className="btn fs-2"
              onClick={handleOffcanvasToggle}
              aria-label="Toggle navigation"
            >
              <img src={require("../../assets/images/offvanvaMobiCat.png")} alt="menu-btn-mobile" style={{ width: "21px" }} />
            </button>
          </Col>

          {/* Logo in the center */}
          <Col xs={8} className="text-center">
            <Link to="/">
              <img
                src={require("../../assets/images/header-logo.png")}
                alt="header-logo"
                className="img-fluid"
                style={{ maxWidth: "150px" }}
              />
            </Link>
          </Col>

          {/* Cart icon at the end */}
          {/* Cart icon at the end */}
          <Col xs={2} className="text-end position-relative">
            <div className="btn text-dark p-0" onClick={handleCartOpen}>
              <CartIcon />
              {cartInfo?.cartcount > 0 && (
                <span
                  className="cart-badge badge bg-danger rounded-pill text-white position-absolute"
                  style={{
                    fontSize: "0.7rem",
                    width: "16px",
                    height: "16px",
                    top: "78%",
                    right: "15px",
                    transform: "translate(50%, -50%)", // Center the badge
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartInfo?.cartcount !== undefined &&
                    cartInfo?.cartcount !== null && (
                      <span>{cartInfo.cartcount}</span>
                    )}
                </span>
              )}
            </div>
          </Col>
        </Row>
        {/* Offcanvas for Small Screens */}
        <Offcanvas
          show={showOffcanvas}
          onHide={handleOffcanvasToggle}
          placement="start"
          responsive="lg"
          className="offcanvas-for-header"
          style={{ width: "85%" }}
        >
          <Offcanvas.Header closeButton>
            <div className="col-10 col-md-6 col-lg-3 text-center text-md-left">
              <img
                className="offcanvas-header-logo"
                src={require("../../assets/images/MobileView/mobiheaderlogo.png")}
                alt="offcanvas-header-logo"
              />
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="d-grid align-items-center mobile-offcanvas text-capitalize">
              <Nav.Link href="/" className="red-hover">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> Home
              </Nav.Link>
              <div className="border-bottom"></div>
              <Nav.Link href="/about-us" className="red-hover">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> About Us
              </Nav.Link>
              <div className="border-bottom"></div>

              <Nav.Link href="/my-order" className="red-hover text-dark ">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> Your Order
              </Nav.Link>
              <div className="border-bottom"></div>

              <Nav.Link href="/privacy-policy" className="red-hover  text-dark ">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> Privacy Policy
              </Nav.Link>
              <div className="border-bottom"></div>

              <Nav.Link href="/term-condition" className="red-hover  text-dark">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> Terms & Conditions
              </Nav.Link>
              <div className="border-bottom"></div>
              <Nav.Link href="/faq" className="red-hover  text-dark">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> FAQ
              </Nav.Link>
              <div className="border-bottom"></div>
              <Nav.Link href="/contact-us" className="red-hover  text-dark">
                <span className="pe-3"> <OffCanvaArrowIcon /> </span> Contact Us
              </Nav.Link>
              <div className="border-bottom"></div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <CartModal show={showCartModal} handleClose={handleCloseCartModal} />

    </header>
  );
}

export default MainHeaderMobi;
