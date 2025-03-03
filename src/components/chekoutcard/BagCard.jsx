import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { STORAGE } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCartItems, removeFromCartThunk, updateCartItemThunk } from "../../redux/cart/cartThunk";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import ProductQtyCounter from "./ProductQtyCounter";

const BagCard = ({ info, cartId }) => {
    const [itemInfo, setItemInfo] = useState(info || {});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleUpdateCart = (cartChildId, quantity) => {
        const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
        if (!userProfile?.id) {
            toast.error("Please log in to manage your cart.");
            return;
        }
        dispatch(updateCartItemThunk(cartChildId, quantity));
    };

    const handleRemoveFromCart = (cartChildId, cartId, itemInfo) => {
        const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
        if (!userProfile?.id) {
            toast.error("Please log in to manage your cart.");
            return;
        }
        dispatch(removeFromCartThunk(cartChildId, cartId, itemInfo));
    };

    const debouncedUpdateCartItem = debounce(handleUpdateCart, 500);

    const truncateProductName = (name) => {
        if (name.length > 18) {
            return name.substring(0, 20) + "...";
        }
        return name;
    };

    const truncateDescriptionName = (name) => {
        if (name.length > 18) {
            return name.substring(0, 35) + "...";
        }
        return name;
    };

    const handleCardClick = () => {
        navigate(
            `/product/${itemInfo?.id || itemInfo?.product_id}/${itemInfo?.product_name}`
        );
    };

    return (
        <div
            className="card border web-bg-color"
            style={{ cursor: "pointer" }}
        >
            <div className="row g-0">
                <div className="col-4 my-2">
                    <img
                        onClick={handleCardClick}
                        src={itemInfo?.product_image}
                        alt={itemInfo?.product_name}
                        className="rounded"
                        style={{ width: "100px", objectFit: "fill" }}
                    />
                </div>
                <div className="col-8 position-relative">
                    <Button
                        variant=""
                        className="position-absolute top-0 end-0 product-cart-close-btn"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromCart(itemInfo?.child_cart_id, cartId, itemInfo);
                        }}
                    >
                        <FaTimes />
                    </Button>
                    <div className="card-body p-3">
                        <p className="cart-para text-truncate">
                            {truncateProductName(itemInfo?.product_name || "")}
                        </p>
                        <p className="text-muted small cart-para">
                            {truncateDescriptionName(itemInfo?.product_short_description || "")}
                        </p>
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold text-secondary">Qty:</span>
                            <ProductQtyCounter
                                defaultValue={itemInfo?.product_quantity}
                                onChange={(value) => {
                                    setItemInfo((prev) => ({ ...prev, product_quantity: value }));
                                    debouncedUpdateCartItem(itemInfo?.child_cart_id, value);
                                }}
                            />
                        </div>
                        <div>
                            <p className="mb-0">
                                <span className="text-success fw-bold me-2">
                                    ₹{itemInfo?.product_price}
                                </span>
                                <span className="text-decoration-line-through text-muted me-2">
                                    ₹{itemInfo?.product_mrp}
                                </span>
                                <span className="text-danger">
                                    {itemInfo?.product_discount}% off
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BagCard;