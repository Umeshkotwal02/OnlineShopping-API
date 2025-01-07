import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas, Row, Col, Nav } from "react-bootstrap";
import { CartIcon, OffCanvaArrowIcon } from "../../assets/SvgIcons";
import { FiSearch } from "react-icons/fi";
import "../../styles/OffCanvasForHeader.css"
import CartModal from "../../pages/MobilePages/CartModal";
import SearchBar from "../SearchBar";

const MainHeaderMobi = ({
  wishlistCount,
  searchTerm,
  handleKeyUp,
  handleChange,
  suggestions,
  handleSuggestionClick,
  showSuggestions,
}) => {

  const [showOffcanvas, setShowOffcanvas] = useState(false); // Menu Offcanvas
  const [showCartModal, setShowCartModal] = useState(false); // Cart Offcanvas

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  // Cart
  const handleCartOpen = () => {
    setShowCartModal(true);
  };
  const handleCloseCartModal = () => {
    setShowCartModal(false);
  }

  return (
    <header>
      {/* Header for Small and Medium Screens Mobile and tablate view*/}
      <div className="d-lg-none container-fluid web-bg-color">
        <Row className="align-items-center py-1 px-0 ">
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
          <Col xs={2} className="text-end">
            <div className="btn text-dark" onClick={handleCartOpen}>
              <CartIcon />
              {wishlistCount > 0 && (
                <span className="badge bg-danger">{wishlistCount}</span>
              )}
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center my-2 pb-3">
          {/* Search Bar */}
          <Col
            className="d-flex justify-content-center align-items-center"
          >
            <SearchBar />
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
              <Nav.Link href="/home" className="red-hover">
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
