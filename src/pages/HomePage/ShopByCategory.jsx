import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ShopbyCatCard.css"
import "../../styles/ShopByCategorySlick.css";
import Loader from "../../components/Loader";


const sliderItems = [
    {
        id: 1,
        image: require("../../assets/images/CategoryByShopSlicks/Crush.png"),
        text: "Crush(Pleated) Work"
    },
    {
        id: 2,
        image: require("../../assets/images/CategoryByShopSlicks/lahenga.png"),
        text: "Lehenga Saree"
    },
    {
        id: 3,
        image: require("../../assets/images/CategoryByShopSlicks/DesignerSaree.png"),
        text: "Designer Saree"
    },
    {
        id: 4,
        image: require("../../assets/images/CategoryByShopSlicks/Printed.png"),
        text: "Printed Embroidered "
    },
    {
        id: 5,
        image: require("../../assets/images/CategoryByShopSlicks/FloralSaree.png"),
        text: "Floral Saree"
    },
    {
        id: 6,
        image: require("../../assets/images/CategoryByShopSlicks/Crush.png"),
        text: "Celebrity Outfits"
    },
    {
        id: 7,
        image: require("../../assets/images/CategoryByShopSlicks/lahenga.png"),
        text: "Reception"
    },
    {
        id: 8,
        image: require("../../assets/images/CategoryByShopSlicks/DesignerSaree.png"),
        text: "Others"
    },
];

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

const ShopByCategorySlick = () => {
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

    const productNameSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

    return (
        <>
            <Container
                fluid
                className="shop-by-category-slick slider-container h-100 w-100 px-lg-5 px-xl-5 px-xxl-5"
            >
                <Row>
                    <Col xxl={2} xl={2} lg={2} className="px-2 d-none d-lg-block">
                        <div>
                            <Link to={`/products-page`} className="shop-by-category-card text-decoration-none">
                                <div className="position-relative w-100 h-100 rounded">
                                    <img
                                        src={require("../../assets/images/CategoryByShopSlicks/image.png")}
                                        className="staic-slider-image"
                                        alt={"shop by cat"}
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xxl={10} xl={10} lg={10} sm={12} xs={12} className="mobile-category-slider px-0">
                        {/* Render the slider */}
                        <div ref={sliderRef}>
                            <Slider {...settings}>
                                {sliderItems.map((product) => (
                                    <div key={product.id}>
                                        <Link
                                            // to={`/product/${productNameSlug(product.text)}`}
                                            to={`/products-page`}
                                            className="shop-by-category-card text-decoration-none"
                                        >
                                            <div className="position-relative w-100 h-100 rounded">
                                                <img
                                                    src={product.image}
                                                    className="slider-image  rounded"
                                                    alt={product.text}
                                                    loading="lazy"
                                                />
                                                <div className="image-overlay position-absolute d-flex align-items-end justify-content-center pb-3 gradient-bg ">
                                                    <h3
                                                        className="overlay-text text-white text-center"
                                                        style={{ fontFamily: "KaushanScript" }}
                                                    >
                                                        {product.text}
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