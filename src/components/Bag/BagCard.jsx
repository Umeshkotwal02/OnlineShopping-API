import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { STORAGE } from "../../config/config";
import { useNavigate } from "react-router-dom";
import ProductQtyCounter from "../../components/Bag/ProductQtyCounter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCartThunk, updateCartItemThunk } from "../../redux/cart/cartThunk";

const BagCard = ({ info }) => {
  const [itemInfo, setItemInfo] = useState(info || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleUpdateCart = (cartChildId, quantity) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your Add To Cart.");
      return;
    }
    dispatch(updateCartItemThunk((cartChildId, quantity)));
  }
  const handleRemoveFromCart = (cartChildId) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your Add To Cart.");
      return;
    }
    dispatch(removeFromCartThunk(cartChildId));
  }


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
      `/product/${itemInfo?.id || itemInfo?.product_id}/${itemInfo?.product_name
      }`
    );
  };

  return (
    <div
      className="card border"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="row g-0">
        <div className="col-4">
          <img
            src={itemInfo?.product_image}
            alt="Product"
            className="img-fluid"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-8 position-relative">
          <button
            className="btn-close position-absolute top-0 end-0 mt-2 me-2 bg-secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromCart()
            }}
          >
            <FaXmark />
          </button>
          <div className="card-body p-3">
            <h5 className="card-title text-truncate">
              {truncateProductName(itemInfo?.product_name || "")}
            </h5>
            <p className="card-text text-muted small mb-2">
              {truncateDescriptionName(itemInfo?.product_short_descriptio || "")}
            </p>
            <p className="card-text fw-bold">
              {itemInfo?.stitching_type}: ₹{itemInfo?.stitching_price}
            </p>
            <div className="d-flex align-items-center justify-content-between my-3">
              <div className="d-flex align-items-center">
                <p className="mb-0 me-3 fw-bold">Qty:</p>
                <ProductQtyCounter
                  defaultValue={itemInfo?.product_quantity}
                  onChange={(value) => {
                    setItemInfo((prev) => ({
                      ...prev,
                      product_quantity: value,
                    }));
                    debouncedUpdateCartItem(itemInfo?.child_cart_id, value);
                  }}
                />
              </div>
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
