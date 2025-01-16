import React from "react";
import Slider from "react-slick";
import "../../styles/CarosoleSilckMobi.css";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarosoleSlickMobi = ({ bannerList }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Container fluid className="MobileCarasole slider-wrapper d-lg-none py-2 px-3">
            <Row>
                <Slider {...settings}>
                    {bannerList?.map((item, index) => (
                        <div key={index} className="slider-item">
                            <Link to="/products-page">
                                <img
                                    src={item?.webfile}
                                    alt={`Slide ${index + 1}`}
                                    className="slider-image"
                                />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </Row>
        </Container>
    );
};

export default CarosoleSlickMobi;
