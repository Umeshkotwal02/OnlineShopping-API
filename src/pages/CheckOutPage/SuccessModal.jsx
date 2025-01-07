import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ open, message, onClose }) => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/");
        onClose()
        console.log("Order Placed");
    }

    return (
        <Modal
            show={open}
            centered
            onHide={onClose}
            className=""
        >
            {/* <div className="modal-dialog modal-dialog-centered custom-width"> */}
                <Modal.Body className="justify-content-center align-items-center success-modal">
                    <div className="text-center w-100">
                        <img
                            src={require("../../assets/images/OrderSuccess.png")}
                            alt="Order Successfully"
                            style={{ width: "100px", marginBottom: "20px" }}
                        />
                        <h1 style={{ fontSize: "22px", fontWeight: "600" }}>
                            Order Successfully
                        </h1>
                        <p style={{ fontSize: "1.1rem" }}>
                            Your order has been placed successfully. You can see the status of
                            the order at any time.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn-after-order w-100"
                        onClick={handleSubmit}
                    >
                        Back To Home
                    </button>
                </Modal.Body>
            {/* </div> */}
        </Modal>

    );
};

export default SuccessModal;
