import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../styles/CarosoleSilck.css";
import { Container } from "react-bootstrap";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow next-arrow d-none d-lg-block" onClick={onClick}>
            <img
                src={require("../../assets/images/Carasole-Img/sidechange-next.png")}
                className="img-fluid"
                alt="Next"
            />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow prev-arrow d-none d-lg-block" onClick={onClick}>
            <img
                src={require("../../assets/images/Carasole-Img/sidechange-prev.png")}
                className="img-fluid"
                alt="Previous"
            />
        </div>
    );
};

const CarosoleSilckSlider = ({ bannerList }) => {
    const [loading, setLoading] = useState(true);

    // Simulating loading for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <>
            <>
                {loading ? (
                    <Loader />
                ) : (
                    <>

                        <Container
                            fluid
                            className="d-none d-lg-block CarosoleSlickSlider py-3 px-lg-5 px-xl-5 px-xxl-5"
                        >
                            <Slider {...settings}>
                                {bannerList?.map((item, index) => (
                                    <div key={index} className="slider-item">
                                        <Link to="/products-page">
                                            <img
                                                src={item?.webfile}
                                                alt={`Slide ${index + 1}`}
                                                className="caro-img"
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        </Container>
                    </>
                )}
            </>

        </>
    );
};

export default CarosoleSilckSlider;
