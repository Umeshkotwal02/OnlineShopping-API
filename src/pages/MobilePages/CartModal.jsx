import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../styles/MobileCommon.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/cart/cartThunk';
import BagCard from '../../components/chekoutcard/BagCard';

const CartModal = ({ show, handleClose }) => {

    // Select cart data from Redux store
    const { cartInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log("cartInfo", cartInfo);

    const handleNavigate = () => {
        handleClose(true);
        navigate("/checkout-page");
    };

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            fullscreen="sm-down"
            dialogClassName="custom-modal"
            className="custom-modal"
            style={{ borderRadius: "0px" }}
        >
            <Modal.Header closeButton className="modal-custom-header gap-2 web-bg-color">
                <Modal.Title className="text-start fw-bold fs-5">My Bag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer className="position-sticky bottom-0 start-0 w-100 bg-white py-3 custom-modal-footer">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h5 className="fw-bold m-0"> ₹{cartInfo?.total_net_amount || 0}</h5>
                    <button
                        className="btn text-white fw-medium py-2 px-4"
                        to="/choose-address"
                        style={{ backgroundColor: "#B51B3B", borderRadius: "10px" }}
                        onClick={handleNavigate}
                    >
                        Proceed to Buy
                    </button>
                </div>
            </Modal.Footer>

        </Modal>
    );
};

export default CartModal;