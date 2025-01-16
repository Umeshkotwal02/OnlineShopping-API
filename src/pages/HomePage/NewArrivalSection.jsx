import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import "../../styles/NewArrivalCard.css";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";
import { STORAGE } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import addToWishlist, { fetchWishlistItem, removeFromWishlist } from "../../redux/wishlist/wishlistThunk";
import { addToCart, fetchCartItems } from "../../redux/cart/cartThunk";
import toast from "react-hot-toast";
import { TbHeartPlus } from "react-icons/tb";

const NewArrivalSection = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItem());
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        setVisibleItems(4);
      } else if (screenWidth >= 576 && screenWidth < 768) {
        setVisibleItems(6);
      } else if (screenWidth >= 768 && screenWidth < 992) {
        setVisibleItems(6);
      } else {
        setVisibleItems(10);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const handleViewMore = () => {
    navigate("/products-page");
  };

  const truncateProductName = (name = "") => {
    if (name.length > 35) {
      return name.substring(0, 35) + "...";
    }
    return name;
  };

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

  const productNameSlug = (name = "") => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  

  return (
    <Container fluid className="new-arrival-container">
      <h3 className="fw-normal text-center fs-3 d-none d-lg-block mt-5">New-Arrival</h3>
      <Row className="px-lg-5 px-xl-5 px-xxl-5">
        {data?.newarrival?.slice(0, visibleItems).map((product) => (
          <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2} key={product.id} className="mb-4 rounded wishlist-column">
            <Link to={`/products/${productNameSlug(product.product_name)}`} className="text-decoration-none">
              <div className="new-arrival-card rounded-top-3">
                <div className="image-container rounded-top-3">
                  <ProductImageSlider imageList={[product.product_image]} />
                  <div className="overlay-buttons">
                    <button className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleAddToCart(product.id, product.stitchingOptions)
                      }
                      }>
                      ADD TO CART
                    </button>
                  </div>
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

                  {product.product_discount > 0 && (
                    <div className="discount-badge">
                      <p className="discount-p">{product.product_discount}% OFF</p>
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="text-start text-dark">{truncateProductName(product.product_name)}</h3>
                  <div className="price-section">
                    <span className="mrp text-start">{product.currency}{product.product_mrp}</span>
                    <span className="discounted-price">{product.currency}{product.product_price}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
      <div className="text-center d-flex justify-content-center">
        <Button
          variant="dark rounded-5 px-4 mb-4"
          onClick={handleViewMore}
          style={{ fontSize: "0.9rem" }}
          className="d-none d-lg-block"
        >
          View All
        </Button>
      </div>
    </Container>
  );
};

export default NewArrivalSection;
