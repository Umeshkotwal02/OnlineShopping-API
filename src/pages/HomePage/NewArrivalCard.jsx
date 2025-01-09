import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import "../../styles/NewArrivalCard.css";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";

{/* <NewArrivalCard info={item} /> */ }

const NewArrivalCard = ({ data }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [visibleItems, setVisibleItems] = useState(10);
  const navigate = useNavigate();

  // Check screen size to determine the number of visible items
  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        // Mobile (extra small screens)
        setVisibleItems(4);
      } else if (screenWidth >= 576 && screenWidth < 768) {
        // Small tablets
        setVisibleItems(6);
      } else if (screenWidth >= 768 && screenWidth < 992) {
        // Large tablets
        setVisibleItems(6);
      } else {
        // Desktop
        setVisibleItems(10);
      }
    };


    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const handleViewMore = () => {
    navigate('/products-page');
  };

  const truncateProductName = (name = "") => {
    if (name.length > 35) {
      return name.substring(0, 35) + "...";
    }
    return name;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    alert("Product added to cart!");
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted((prev) => !prev);
    alert(isWishlisted ? "Removed from wishlist!" : "Added to wishlist!");
  };

  const productNameSlug = (name = "") => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  return (
    <Container fluid className="new-arrival-container">
      <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>
        New-Arrival
      </h3>
      <div className="d-flex justify-content-between align-items-center d-lg-none">
        <h3 className="text-start font-bold my-3 ms-2 mt-4">
          New-Arrival
        </h3>
        <div className="text-end font-bold my-3 ms-2 mt-4 align-items-center" onClick={handleViewMore}> View All</div>
      </div>
      <p className="text-center font-italic d-none d-lg-block mb-2">
        <i> "Embrace the festival magic, let joy fill every moment."</i>
      </p>
      <Row className="px-lg-5 px-xl-5 px-xxl-5">
        {/* data?.newarrival?.map((item, index) => { */}
        {data?.newarrival?.map((product, index) => (
          <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2} key={product.id}
            className="mb-4 rounded wishlist-column"
          >
            <Link to={`/products/${productNameSlug(product.product_name)}`} className="text-decoration-none">
              <div className="new-arrival-card rounded-top-3">
                {/* Product Image Section */}
                <div className="image-container rounded-top-3">
                  <ProductImageSlider imageList={[product.product_image]} />

                  <div className="overlay-buttons">
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                      ADD TO CART
                    </button>
                  </div>
                  {/* Wishlist Button */}
                  <div className="wishlist-btn">
                    <button onClick={handleWishlistToggle}>
                      {isWishlisted ? (
                        <FaHeart className="icon heart-icon" />
                      ) : (
                        <FiHeart className="icon" />
                      )}
                    </button>
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
                  <div className="price-section">
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
  );
};

export default NewArrivalCard;
