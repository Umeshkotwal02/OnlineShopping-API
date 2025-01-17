import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchWishlistItem,
    addToWishlist,
    removeFromWishlist,
} from "../../redux/wishlist/wishlistThunk";
import { addToCart, fetchCartItems } from "../../redux/cart/cartThunk";
import { STORAGE } from "../../config/config";
import toast from "react-hot-toast";
import "../../styles/NewArrivalCard.css";

const NewArrivalCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const dispatch = useDispatch();

    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchWishlistItem());
        dispatch(fetchCartItems());
    }, [dispatch]);

    useEffect(() => {
        const wishlistItem = wishlist.some((item) => item.id === product.id);
        setIsWishlisted(wishlistItem);
    }, [wishlist, product]);

    const handleAddToCart = () => {
        dispatch(addToCart(product.id, product.stitchingOptions));
        toast.success("Product added to cart.");
    }

    const handleWishlistToggle = () => {
        const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
        if (!userProfile?.id) {
            toast.error("Please log in to manage your wishlist.");
            return;
        }

        if (isWishlisted) {
            dispatch(removeFromWishlist(product.id));
            toast.success("Removed from wishlist.");
        } else {
            dispatch(addToWishlist(product.id));
            toast.success("Added to wishlist.");
        }

        setIsWishlisted(!isWishlisted);
    };

    const truncateProductName = (name = "") =>
        name.length > 35 ? name.substring(0, 35) + "..." : name;

    return (
        <div className="new-arrival-card rounded-top-3">
            <div className="image-container rounded-top-3">
                <ProductImageSlider imageList={[product?.product_images || product?.product_image]} />
                <div className="overlay-buttons">
                    <button
                        className="add-to-cart-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleAddToCart();
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>
                <div className="wishlist-btn">
                    <button
                        type="button"
                        className="flex items-center justify-center bg-white p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleWishlistToggle();
                        }}
                    >
                        {isWishlisted ? (
                            <FaHeart className="icon heart-icon" />
                        ) : (
                            <FiHeart className="icon" />
                        )}
                    </button>
                </div>

                {product?.product_discount > 0 && (
                    <div className="discount-badge">
                        <p className="discount-p">{(product?.product_discount)}%</p>
                    </div>
                )}
            </div>
            <div className="product-info">
                <h3 className="text-start text-dark">
                    {truncateProductName(product?.product_name)}
                </h3>
                <div className="price-section">
                    <span className="mrp text-start">
                        {product?.currency}
                        {product?.product_mrp}
                    </span>
                    <span className="discounted-price">
                        {product?.currency}
                        {product?.product_price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewArrivalCard;
