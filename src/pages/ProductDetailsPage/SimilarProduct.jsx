import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ShopbyCatCard.css"
import "../../styles/ShopByCategorySlick.css";
import Loader from "../../components/Loader";
import { productData } from "../../config/productData";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";


// Custom Next Arrow Component
const NextCatArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow next-arrow d-none d-lg-block" onClick={onClick}>
            <CategorySlickNextIcon />
        </div>
    );
};

// Custom Previous Arrow Component
const PrevCatArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow prev-arrow d-none d-lg-block" onClick={onClick}>
            <CategoryPrevNextIcon />
        </div>
    );
};

const SimilarProduct = () => {
    const [loading, setLoading] = useState(true);
    const [prevArrowPosition, setPrevArrowPosition] = useState(0);
    const sliderRef = useRef(null);
    const [isWishlisted, setIsWishlisted] = useState(productData[0].is_wishlist);

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

    useEffect(() => {
        const updateArrowPosition = () => {
            if (sliderRef.current) {
                const slide = sliderRef.current.querySelector(".slick-slide");
                if (slide) {
                    const slideWidth = slide.offsetWidth;
                    const prevArrow = document.querySelector(".prev-arrow");
                    if (prevArrow) {
                        prevArrow.style.left = `-${slideWidth + 11}px`;
                    }
                }
            }
        };

        // Update on mount and on window resize
        updateArrowPosition();
        window.addEventListener("resize", updateArrowPosition);

        return () => {
            window.removeEventListener("resize", updateArrowPosition);
        };
    }, []);
    // Slick slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <NextCatArrow />,
        prevArrow: <PrevCatArrow style={{ left: prevArrowPosition }} />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
        ],
    };

    const productNameSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

    return (
        <>
            <Container
                fluid
                className="shop-by-category-slick slider-container h-100 w-100"
            >
                <h4>Similar Products </h4>
                {/* Render the slider */}
                <div ref={sliderRef}>
                    <Slider {...settings} className="p-0">
                        {productData.map((product) => (
                            // <Col xs={12} sm={6} md={3} lg={2.4} xl={2.4} xxl={2.6} key={product.id}>
                            <div className="mb-4 rounded"
                            >
                                {/* <Link to={`/product/${productNameSlug(product.product_name)}`} className="new-arrival-card text-decoration-none"> */}
                                <Link to={`/products/details`} className="new-arrival-card text-decoration-none">
                                    {/* Product Image Section */}
                                    <div className="image-container">
                                        <ProductImageSlider imageList={product.product_images} />
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
                                    <div className="product-info" style={{ backgroundColor: "#F3F3F3" }}>
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
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </>
    );
};

export default SimilarProduct;