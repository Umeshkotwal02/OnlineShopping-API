import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/NewArrivalCard.css";
import ProductImageSlider from "../components/homepage/ProductImageSlider";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartThunk";
import toast from "react-hot-toast";
import { STORAGE } from "../config/config";
import addToWishlist, { fetchWishlistItem, removeFromWishlist } from "../redux/wishlist/wishlistThunk";
import { FiHeart } from "react-icons/fi";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist); // Get wishlist from Redux store

  const breadcrumbArray = [
    <Link
      to="/"
      key="1"
      className="text-muted text-decoration-none fs-6 fw-normal lh-1 text-capitalize d-inline-block"
    >
      Home
    </Link>,
    <p
      key="2"
      className="text-dark fs-6 fw-normal lh-1 text-capitalize d-inline-block mb-0"
    >
      Wishlist
    </p>,
  ];

  const truncateProductName = (name) => {
    if (name.length > 18) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };

  // Fetch wishlist items on mount
  useEffect(() => {
    dispatch(fetchWishlistItem());
  }, [dispatch]);

  const handleAddToCart = async (id, stitchingOptions) => {
    dispatch(addToCart(id, stitchingOptions));
  };

  const handleWishlistToggle = (product) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    const wishlistItem = wishlist.find((item) => item.id === product.id);
    if (wishlistItem) {
      // Remove from wishlist
      dispatch(removeFromWishlist(product.id))
    } else {
      // Add to wishlist
      dispatch(addToWishlist(product.id));
    }
  };

  const productNameSlug = (name) => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  const [loading, setLoading] = useState(true);

  // Simulating loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2205);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="web-bg-color d-lg-none py-3">
            <div className="text-start text-start fw-medium fs-3 px-3">Wishlist</div>
          </div>
          <Container fluid className="new-arrival-container mb-4">
            <Breadcrumb list={breadcrumbArray} />
            <Row className="px-lg-5 px-xl-5 px-xxl-5 g-4">
              {wishlist.map((product) => (
                < Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2} key={product.id} className="mb-1 rounded wishlist-column" >
                  <Link to={`/product/${product?.id}/${product?.product_name}`} className="text-decoration-none">
                    <div className="new-arrival-card">
                      {/* Product Image Section */}
                      <div className="image-container rounded">
                        <ProductImageSlider imageList={[product.product_image]} />
                        <div className="overlay-buttons">
                          <button className="add-to-cart-btn" onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleAddToCart(product.id, product.stitchingOptions)
                          }}>
                            MOVE TO BAG
                          </button>
                        </div>

                        {/* Wishlist Button */}
                        <div className="wishlist-btn">
                          {wishlist.some((item) => item.id === product.id) ? (
                            <button
                              type="button"
                              className="flex items-center justify-center bg-white p-2 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleWishlistToggle(product);
                              }}
                            >
                              <FaHeart className="icon heart-icon" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="flex items-center justify-center bg-white p-2 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleWishlistToggle(product);
                              }}
                            >
                              <FiHeart className="icon" />
                            </button>
                          )}
                        </div>

                        {/* Discount Badge */}
                        {product.product_discount > 0 && (
                          <div className="discount-badge">
                            <p className="discount-p">{product.product_discount}% OFF</p>
                          </div>
                        )}
                      </div>

                      {/* Product Info Section */}
                      <div className="product-info">
                        <h3 className="text-start text-dark">{truncateProductName(product.product_name)}</h3>
                        <div className="price-section ">
                          <span className="mrp text-start">
                            {product.currency}
                            {product.product_mrp}
                          </span>
                          <span className="discounted-price">
                            {product.currency}
                            {product.product_price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )
      }
    </>
  );
};

export default WishlistPage;
