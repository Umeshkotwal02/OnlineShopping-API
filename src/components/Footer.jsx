import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { MdOutlineLocationOn, MdMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import {
  FaYoutube,
  FaFacebook,
  FaPinterest,
  FaInstagramSquare,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import "../styles/Footer.css"
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Footer = () => {

  const [loading, setLoading] = useState(true);

  // Simulating loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Container fluid className="footer">
        <Container fluid className="py-0 mt-5">
          <Row>
            <Col xs={12} md={4} lg={3} className=" d-flex justify-content-center" >
              <div className="logo-div ps-lg-3 ps-xl-3 ps-xxl-3">
                <img
                  src={require("../assets/images/Footer-img/footer-logo.png")}
                  alt="footer-logo"
                  className="w-75 mb-3"
                />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className=" d-flex justify-content-center" >
              <div className="mb-4">
                <div className=" fs-4" style={{ fontWeight: "500" }}>
                  Company
                </div>
                <ul className="list-unstyled ">
                  <li className="my-1">
                    <Link to="/home" className="text-dark text-decoration-none  ">
                      Home
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link
                      to="/about-us"
                      className="text-dark text-decoration-none"
                    >
                      About Us

                    </Link>
                  </li>
                  <li className="my-1">
                    <Link
                      to="/my-order"
                      className="text-dark text-decoration-none"
                    >
                      Your Orders
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={6} md={4} lg={2} className=" d-flex justify-content-center">
              <div className=" mb-4">
                <div className=" fs-4" style={{ fontWeight: "500" }}>
                  Customer Service
                </div>
                <ul className="list-unstyled">
                 
                  <li className="my-1">
                    <Link
                      to="/privacy-policy"
                      className="text-dark text-decoration-none"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link
                      to="/term-condition"
                      className="text-dark text-decoration-none"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link
                      to="/contact-us"
                      className="text-dark text-decoration-none"
                    >
                      Contact With Us
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link to="/faq" className="text-dark text-decoration-none">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className=" d-flex justify-content-center">
              <div className="mb-4">
                <div className=" fs-4" style={{ fontWeight: "500" }}>
                  Contact Us
                </div>
                <p>
                  <MdOutlineLocationOn /> A115-120 Millennium Textile Market-1, Ring Road, Surat, Gujarat 395002
                </p>
                <p>
                  <IoCallOutline /> +91 9876543210
                </p>
                <p>
                  <MdMailOutline /> info123@gmail.com
                </p>
                <div>
                  <div className=" fs-4" style={{ fontWeight: "500" }}>
                    Follow Us On
                  </div>
                  <p>
                    <Link
                      to="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FaYoutube style={{ color: "red" }} className="me-2 icon" />
                    </Link>
                    <Link
                      to="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <RiTwitterXFill className="icon" />
                    </Link>

                    <Link
                      to="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FaFacebook
                        style={{ color: "blue" }}
                        className="me-2 icon"
                      />
                    </Link>

                    <Link
                      to="https://in.pinterest.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FaPinterest
                        style={{ color: "darkred" }}
                        className="me-2 icon"
                      />
                    </Link>

                    <Link
                      to="https://mail.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <IoIosMail
                        style={{ color: "lightskyblue" }}
                        className="me-2 icon"
                      />
                    </Link>

                    <Link
                      to="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FaInstagramSquare
                        style={{ color: "#E1306C" }}
                        className="me-2 icon"
                      />
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} lg={2} className=" ">
              <div className="d-flex flex-md-column align-items-end justify-content-center pe-lg-3 pe-xl-3 pe-xxl-3">
                <Button variant="" className="p-0 my-2">
                  <Link
                    to="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/images/Footer-img/google-play.png")}
                      alt="error"
                      style={{
                        height: "40px",
                        width: "120px",
                      }}
                    />
                  </Link>
                </Button>
                <Button variant="" className="p-0 my-2">
                  <Link
                    to="https://www.apple.com/in/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/images/Footer-img/apple-play.png")}
                      alt="error"
                      style={{
                        height: "40px",
                        width: "120px",
                      }}
                    />
                  </Link>
                </Button>

              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
