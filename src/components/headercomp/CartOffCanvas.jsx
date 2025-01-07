import React from 'react';
import { Offcanvas, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CartOffCanvas = ({ show, handleClose }) => {

    const items = [
        {
            id: 1,
            name: "Pink Ethnic",
            description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            price: "₹5,400",
            originalPrice: "₹10,999",
            discount: "50% off",
            quantity: 1,
            img: require("../../assets/images/form-checkout/cart1.png"),

        },
        {
            id: 2,
            name: "Attire In Pink Tone ...",
            description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            price: "₹5,400",
            originalPrice: "₹10,999",
            discount: "50% off",
            quantity: 1,
            img: require("../../assets/images/form-checkout/cart2.png"),
        },
        {
            id: 3,
            name: "Attire In Pink Tone ...",
            description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            price: "₹5,400",
            originalPrice: "₹10,999",
            discount: "50% off",
            quantity: 1,
            img: require("../../assets/images/form-checkout/cart3.png"),
        },
    ];

    const navigate = useNavigate();

    const handleNavigate = () => {
        handleClose(true)
        navigate("/checkout-page");
    };
    return (
        <Offcanvas show={show}
            onHide={handleClose}
            placement="end"
            fullscreen="sm-down">
            <Offcanvas.Header closeButton className="custom-header web-bg-color">
                <Offcanvas.Title className='text-start fw-bold fs-5'>Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="d-flex rounded mb-3 py-2 position-relative web-bg-color"
                    >
                        <div className="rounded">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="rounded"
                                style={{ width: "120px", height: "130px", objectFit: "contain" }}
                            />
                        </div>
                        <div className="flex-grow-1">
                            <Button
                                variant=""
                                className="position-absolute top-0 end-0 product-cart-close-btn"
                                size="sm"
                            >
                                <FaTimes />
                            </Button>
                            <p className="m-0  cart-para">{item.name}</p>
                            <p className="text-muted small cart-para">{item.description}</p>
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-bold text-secondary">Qty:</span>
                                <div className="d-flex align-items-center border rounded p-1">
                                    <Button variant="light" size="sm" className="p-0">
                                        <FaChevronLeft className="text-secondary" />
                                    </Button>
                                    <span className="px-2">{item.quantity}</span>
                                    <Button variant="light" size="sm" className="p-0">
                                        <FaChevronRight className="text-secondary" />
                                    </Button>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <span className="text-success fw-bold me-2">{item.price}</span>
                                <span className="text-muted text-decoration-line-through me-2">
                                    {item.originalPrice}
                                </span>
                                <span className="text-danger small">{item.discount}</span>
                            </div>

                        </div>
                    </div>
                ))}

            </Offcanvas.Body>

            {/* Sticky Button Footer */}
            <div
                className="position-sticky bottom-0 start-0 w-100 bg-white py-3"
                style={{ zIndex: 1050, backgroundColor: "#fff" }}
            >
                <Row>
                    <Col xxl={4} xl={4} lg={4}>
                        <div className="text-center mb-2 ">
                            <h5 className="my-2 fw-bold align-self-center">₹16,200</h5>
                        </div>
                    </Col>
                    <Col xxl={7} xl={7} lg={7}>
                        <button
                            className="btn text-white text-center w-100 fw-medium py-2"
                            href="/choose-address"
                            style={{ backgroundColor: "#B51B3B", borderRadius: "10px" }}
                            onClick={handleNavigate}
                        >
                            Proceed to Buy
                        </button>
                    </Col>
                </Row>
            </div>
        </Offcanvas >
    );
};

export default CartOffCanvas;
