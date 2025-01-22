import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import "../../styles/NewArrivalCard.css";
import { productListPageData } from "../../config/productData";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";

const ProductList = () => {
    const [isWishlisted, setIsWishlisted] = useState(productListPageData[0].is_wishlist);

    const truncateProductName = (name) => {
        if (name.length > 18) {
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

    const productNameSlug = (name) => {
        return name.replace(/\s+/g, "-").toLowerCase();
    };

    return (
        <Container fluid className="product-listing mb-4 pt-2">
            <Row className="">
                {productListPageData.map((product) => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={3} xxl={3} key={product.id} className="mb-4 rounded">
                        {/* <Link to={`/product/${productNameSlug(product.product_name)}`} className="new-arrival-card text-decoration-none"> */}
                        <Link to={`/products/details`} className="text-decoration-none">
                            <div className="new-arrival-card">
                                {/* Product Image Section */}
                                <div className="image-container rounded">
                                    <ProductImageSlider imageList={product.product_images || product?.product_images} />
                                    <div className="overlay-buttons">
                                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                            ADD TO CART
                                        </button>
                                    </div>

                                    {/* Wishlist Button */}
                                    <div className="wishlist-btn rounded-circle">
                                        <button onClick={handleWishlistToggle} className="rounded-circle">
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
                                <div className="product-info rounded-bottom" style={{ backgroundColor: "#F3F3F3" }}>
                                    <p className="text-start text-dark" style={{ fontSize: "0.84rem" }}>{truncateProductName(product.product_name)}</p>
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

export default ProductList;
