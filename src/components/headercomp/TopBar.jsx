import React from "react";
import { Tooltip, OverlayTrigger, Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TiSocialInstagram } from "react-icons/ti";
import { GoDeviceMobile } from "react-icons/go";
import { BsQuestionCircle } from "react-icons/bs";
import { ImPinterest } from "react-icons/im";

const TopBar = () => {
  const renderTooltip = (message) => (
    <Tooltip id="button-tooltip">{message}</Tooltip>
  );

  return (
    <div style={{ backgroundColor: "black", fontFamily: "Roboto" }}>
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5 d-none d-lg-block ">
        <Row className="align-items-center px-lg-2 px-xl-2 px-xxl-2 py-lg-1">
          {/* Social Media Links */}
          <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
            <ul
              className="d-flex list-unstyled m-0 gap-4 justify-content-center justify-content-md-start"
              style={{ padding: 0, fontSize: "13px" }}
            >
              <li>
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip("Facebook")}
                >
                  <Link
                    to="https://www.facebook.com/KAPOORLEHENGASAREE"
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <FaFacebookF className="text-white" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip("Twitter")}
                >
                  <Link
                    to="https://x.com/?lang=en/KAPOORLEHENGASAREE"
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <FaTwitter className="text-white" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip("Instagram")}
                >
                  <Link
                    to="https://www.instagram.com/kapoorlehengasaree/"
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <TiSocialInstagram className="text-white" />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip("Pinterest")}
                >
                  <Link
                    to="https://www.pinterest.com//kapoorlehengasaree/"
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <ImPinterest className="text-white" />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </Col>

          {/* Centered Text */}
          <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4} className="text-center">
          <p
            style={{
              fontSize: "0.6rem",
              color: "white",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            &quot;World Wide Shipping&quot;
          </p>

          </Col>

          {/* App Download and Help Links */}
          <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
            <ul
              className="d-flex list-unstyled m-0 gap-4 justify-content-center justify-content-md-end"
              style={{ padding: 0 }}
            >
              <li>
                <Link
                  to="https://play.google.com/store/apps/"
                  target="_blank"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <GoDeviceMobile className="text-white" />
                  <span
                    className="d-none d-md-inline-block ms-2"
                    style={{
                      fontSize: "0.6rem",
                      color: "white",
                    }}
                  >
                    App Download
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <BsQuestionCircle className="text-white" />
                  <span
                    className="d-none d-md-inline-block ms-2"
                    style={{
                      fontSize: "11px",
                      color: "white",
                    }}
                  >
                    Help
                  </span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBar;
