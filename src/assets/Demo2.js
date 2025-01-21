import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartInfo: {
        items: [],
        total: 0,
    },
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartInfo(state, action) {
            state.cartInfo = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setCartInfo, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;


import React, { useEffect } from 'react';
import { Offcanvas, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import BagCard from '../../pages/HomePage/abc';
import { fetchCartItems } from '../../redux/cart/cartThunk';
import { useDispatch, useSelector } from 'react-redux';

const CartOffCanvas = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Select cart data from Redux store
    const cartInfo = useSelector((state) => state.cart.cartInfo?.items || []);
    const cartTotal = useSelector((state) => state.cart.cartInfo?.total || 0);

    const handleNavigate = () => {
        handleClose(true);
        navigate("/checkout-page");
    };

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            fullscreen="sm-down"
        >
            <Offcanvas.Header closeButton className="custom-header web-bg-color">
                <Offcanvas.Title className="text-start fw-bold fs-5">Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartInfo.length > 0 ? (
                    cartInfo.map((item) => (
                        <BagCard
                            key={`cartItem-${item?.id}`}
                            info={item}
                            cartId={cartInfo?.cart_id}
                            fetchCartItems={fetchCartItems}
                        />
                    ))
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
                                ₹{cartTotal}
                            </h5>
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
        </Offcanvas>
    );
};

export default CartOffCanvas;
