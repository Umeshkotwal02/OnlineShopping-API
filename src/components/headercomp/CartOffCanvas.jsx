import React from 'react';
import { Offcanvas, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../../redux/cart/cartThunk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BagCard from "../chekoutcard/BagCard"

const CartOffCanvas = ({ show, handleClose }) => {

    // Select cart data from Redux store
    const { cartInfo } = useSelector((state) => state.cart);
    const cartTotal = useSelector((state) => state.cart.cartInfo?.total);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("cartInfo", cartInfo);
    console.log("cart", cartTotal);

    const handleNavigate = () => {
        handleClose(true);
        navigate("/checkout-page");
    };

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    return (
        <Offcanvas show={show}
            onHide={handleClose}
            placement="end"
            fullscreen="sm-down">
            <Offcanvas.Header closeButton className="custom-header web-bg-color">
                <Offcanvas.Title className='text-start fw-bold fs-5'>Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartInfo?.cartcount ? (
                    <>
                        <div
                            className="mb-4"
                        >
                            <div className="row g-3">
                                {cartInfo?.cartdata?.map((item, index) => {
                                    return (
                                        <BagCard
                                            key={"cartItem" + item?.id}
                                            info={item}
                                            cartId={cartInfo?.cart_id}
                                            fetchCartItems={fetchCartItems}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center">Your cart is empty.</p>
                )}
            </Offcanvas.Body>

            {/* Sticky Button Footer */}
            <div
                className="position-sticky bottom-0 start-0 w-100 bg-white py-3"
                style={{ zIndex: 1050, backgroundColor: "#fff" }}
            >
                <Row>
                    <Col xxl={4} xl={4} lg={4}>
                        <div className="text-center mb-2 ">
                            <h5 className="my-2 fw-bold align-self-center">
                                ₹{cartInfo?.total_net_amount || 0}
                            </h5>
                        </div>
                    </Col>
                    <Col xxl={7} xl={7} lg={7}>
                        <button
                            className="btn text-white text-center w-100 fw-medium py-2"
                            to="/choose-address"
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
