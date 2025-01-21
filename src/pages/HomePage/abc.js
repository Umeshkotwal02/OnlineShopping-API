// BagCard.js
const BagCard = ({ info, updateCartItem, removeFromCart }) => {
    const { cart_child_id, quantity } = info;

    const handleQuantityChange = (newQuantity) => {
        updateCartItem(cart_child_id, newQuantity);
    };

    const handleRemove = () => {
        removeFromCart(cart_child_id);
    };

    return (
        <div>
            <p>{info.product_name}</p>
            <div>
                <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default BagCard;

// CartOffCanvas.js
import React, { useEffect } from 'react';
import { Offcanvas, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BagCard from '../../pages/HomePage/abc';
import { fetchCartItems } from '../../redux/cart/cartThunk';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItemThunk, removeFromCartThunk } from '../../redux/cart/cartThunk';

const CartOffCanvas = ({ show, handleClose }) => {
    const cartInfo = useSelector((state) => state.cart.cartInfo?.items || []);
    const cartTotal = useSelector((state) => state.cart.cartInfo?.total || 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleUpdateCart = (cartChildId, quantity) => {
        dispatch(updateCartItemThunk(cartChildId, quantity));
    };

    const handleRemoveFromCart = (cartChildId) => {
        dispatch(removeFromCartThunk(cartChildId));
    };

    const handleNavigate = () => {
        handleClose(true);
        navigate("/checkout-page");
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" fullscreen="sm-down">
            <Offcanvas.Header closeButton className="custom-header web-bg-color">
                <Offcanvas.Title className='text-start fw-bold fs-5'>Bag</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartInfo.length > 0 ? (
                    cartInfo.map((item) => (
                        <BagCard
                            key={`cartItem-${item?.id}`}
                            info={item}
                            cartId={cartInfo?.cart_id}
                            updateCartItem={handleUpdateCart}
                            removeFromCart={handleRemoveFromCart}
                        />
                    ))
                ) : (
                    <p className="text-center">Your cart is empty.</p>
                )}
            </Offcanvas.Body>
            <div className="position-sticky bottom-0 start-0 w-100 bg-white py-3" style={{ zIndex: 1050, backgroundColor: "#fff" }}>
                <Row>
                    <Col xxl={4} xl={4} lg={4}>
                        <div className="text-center mb-2">
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

// cartThunk.js
import axios from 'axios';
import { API_URL } from '../../Constant/constApi';
import { STORAGE } from '../../config/config';
import { setLoading, setCartItems, setError, updateCartItem, removeCartItem } from './cartSlice';
import toast from 'react-hot-toast';


