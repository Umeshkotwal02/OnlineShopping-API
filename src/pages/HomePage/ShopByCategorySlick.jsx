import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ShopbyCatCard.css"
import "../../styles/ShopByCategorySlick.css";


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

const ShopByCategorySlick = ({ data = [] }) => {
    
    const [loading, setLoading] = useState(true);
    const [prevArrowPosition, setPrevArrowPosition] = useState(0);
    const sliderRef = useRef(null);


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
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <>
            <Container
                fluid
                className="shop-by-category-slick slider-container h-100 w-100 px-lg-5 px-xl-5 px-xxl-5"
            >
                <h3 className="text-start fw-bold d-lg-none ms-1 my-3">
                    Shop by Category
                </h3>
                <Row>
                    <Col xxl={2} xl={2} lg={2} className="px-2 d-none d-lg-block">
                        <div>
                            <Link to={`/products-page`} className="shop-by-category-card text-decoration-none">
                                <div className="position-relative w-100 h-100 rounded">
                                    <img
                                        src={require("../../assets/images/CategoryByShopSlicks/shopCateImg.png")}
                                        className="staic-slider-image"
                                        alt={"shop by cat"}
                                        loading="lazy"
                                        style={{ aspectRatio: "9 / 11.8" }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xxl={10} xl={10} lg={10} sm={12} xs={12} className="mobile-category-slider px-lg-0 px-xl-0 px-xxl-0">
                        {/* Render the slider */}
                        <div ref={sliderRef}>
                            <Slider {...settings}>
                                {data.map((product) => (
                                    <div key={product.id}>
                                        <Link
                                            // to={`/product/${productNameSlug(product.text)}`}
                                            to={`/products-page`}
                                            className="shop-by-category-slick text-decoration-none"
                                        >
                                            <div className="shop-by-category-slick position-relative h-100 overflow-hidden rounded-4">
                                                <div className="img-container h-100 group">
                                                    <img
                                                        src={product?.category_web_image || '/images/product-img.png'}
                                                        className="w-100 h-100 duration-500 img-hover-effect"
                                                        alt=""
                                                        loading="lazy"
                                                    // onError="setImageError(true)"
                                                    />
                                                </div>

                                                <div className="shop-by-category-slick img-container bg-light d-none" id="fallbackImage"></div>

                                                <div
                                                    className="position-absolute start-0 bottom-0 w-100 text-center bg-dark-gradient py-3 px-2"
                                                >
                                                    <h3
                                                        className="text-white shop-cat-heading"
                                                    >
                                                        {product?.category_name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default ShopByCategorySlick;