import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { CashONIcon2, WalletIcon2 } from '../../assets/SvgIcons';
import "../../styles/Payment.css"
import SuccessModal from './SuccessModal';

const Payment = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleSubmit = () => {
    handleOpenModal();
    console.log("Data Submitted");
  }

  return (
    <Container className="mt-4 px-lg-5 px-xl-5 px-xxl-5">
      <Container className="px-lg-5 px-xl-5 px-xxl-5">
        <Row className="px-lg-5 px-xl-5 px-xxl-5">
          <Row className="px-lg-5 px-xl-5 px-xxl-5">
            <Col sm={12} xs={12} lg={6} xxl={6} xl={6}  >
              <div style={{ padding: "20px", borderRadius: "15px", backgroundColor: "#F3F3F3" }}>
                <div>
                  <h4 className="fw-bold" style={{ fontSize: "22px", marginBottom: "12px", fontWeight: "500", lineHeight: "1", }}>
                    <HiOutlineCurrencyRupee className="fs-4" /> Price Details
                  </h4>
                </div>
                <div style={{ padding: "10px" }}>
                  <h5
                    style={{
                      fontSize: "20px",
                      marginBottom: "12px",
                      fontWeight: "500",
                      lineHeight: "1",
                    }}
                  >
                    Price Summary
                  </h5>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555", }}>
                      Bag Total
                    </p>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                      ₹10,800.00
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                      Coupon
                    </p>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                      -₹800.00
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                      GST 18%
                    </p>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                      ₹1800
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p
                      style={{
                        fontSize: "1.2rem", marginBottom: "0.1rem",
                        paddingTop: "10px",
                        fontWeight: "600",
                        color: "#03A685",
                      }}
                    >
                      You Pay
                    </p>
                    <p
                      style={{
                        fontSize: "1.2rem", marginBottom: "0.1rem",
                        paddingTop: "10px",
                        fontWeight: "600",
                        color: "#03A685",
                      }}
                    >
                      ₹11,800.00
                    </p>
                  </div>
                </div>
              </div>
            </Col>

            <Col sm={12} xs={12} lg={6} xxl={6} xl={6}>
              <div style={{ padding: "20px", borderRadius: "15px", backgroundColor: "#F3F3F3" }}>
                <div className="mb-2">
                  <h5 className=""> <WalletIcon2 />  Payment Method</h5>
                </div>

                {/* Razor Pay Method */}
                <div className="d-flex align-items-center gap-4 py-2 px-2 bg-white mb-2 justify-content-between custom-check-form" style={{ borderRadius: "10px" }}>
                  {/* Icon and Text */}
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={require("../../assets/images/RazorPay.png")}
                      className="bg-design"
                      alt="razor-pay"
                      style={{ padding: "9px" }}
                    />
                    <h6 className="d-flex align-items-center fw-medium">Razor Pay</h6>
                  </div>

                  {/* Radio Button */}
                  <Form.Check
                    type="radio"
                    name="payment-method"
                    value="razorpay"
                    label=""
                    className="cursor-pointer ml-auto"
                    id="payment-method-cod"
                  />
                </div>

                {/* COD Payment Method */}
                <div className="d-flex align-items-center gap-4 py-2 px-2 bg-white mb-2 justify-content-between custom-check-form" style={{ borderRadius: "10px" }}>
                  {/* Icon and Text */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="bg-design">
                      <CashONIcon2 />
                    </span>
                    <h6 className="d-flex align-items-center fw-medium">COD (Cash on Delivery)</h6>

                  </div>

                  {/* Radio Button */}
                  <Form.Check
                    type="radio"
                    name="payment-method"
                    value="razorpay"
                    label=""
                    className="cursor-pointer ml-auto"
                    id="payment-method-cod"
                  />
                </div>

                <button type="button mt-3" className="btn-payment w-100" onClick={handleSubmit}>
                  Payment
                </button>

              </div>
            </Col>
          </Row>
        </Row>
      </Container>
      {/* Modal Component */}
      <SuccessModal
        open={isModalOpen}
        message="This is a success message!"
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default Payment;
