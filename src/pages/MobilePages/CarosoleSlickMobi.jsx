import React from "react";
import Slider from "react-slick";
import "../../styles/CarosoleSilckMobi.css";
import { Container, Row } from "react-bootstrap";

const CarosoleSlickMobi = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    // Array of images
    const images = [
        require("../../assets/images/Carasole-Img/Carousel-1.png"),
        require("../../assets/images/Carasole-Img/Carousel-2.png"),
        require("../../assets/images/Carasole-Img/Carousel-3.png"),
    ];

    return (
        <Container fluid className="MobileCarasole slider-wrapper d-lg-none py-2 px-3">
            <Row>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="slider-item">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="slider-image"
                            />
                        </div>
                    ))}
                </Slider>
            </Row>
        </Container>
    );
};

export default CarosoleSlickMobi;
