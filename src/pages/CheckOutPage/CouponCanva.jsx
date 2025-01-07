import React, { useState } from "react";
import { Offcanvas, Form, Row, Col, Button } from "react-bootstrap";

const CouponCanva = ({ show, handleClose }) => {

  const [showAllOffers, setShowAllOffers] = useState(false);


    const availableOffers = [
        { heading: "GET FLAT 20% OFF", name: "NEW20", price: 100 },
      ];

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>New Address</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                     {/* Available Offers */}
                {availableOffers.length > 0 && (
                  <div className="mb-4">
                    <h5 className="mt-4" >Available Offers:</h5>
                    {availableOffers.map((item, index) => (
                      <div key={index} className="border border-light mb-2 discount-coupon">
                        <Row className="align-items-center">
                          <Col xs={2} className="text-center">
                            <div className="text-white rounded ps-3">
                              <img
                                src={require("../../assets/images/ProductDetails/discount-bag2.png")}
                                alt="Product"
                                className=""
                              />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <h5 className="fw-bolder">{item.heading}</h5>
                            <h5 style={{ color: "#515151" }}>Use Code: {item.name}</h5>
                          </Col>
                          <Col xs={4} className="text-center">
                            <button className="coupon-btn" onClick={() => alert(`Copied: ${item.name}`)}>
                              COPY
                            </button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    {!showAllOffers && availableOffers.length > 2 && (
                      <div className="text-end">
                        <Button variant="link" onClick={() => setShowAllOffers(true)}>
                          See All Offers
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CouponCanva;
