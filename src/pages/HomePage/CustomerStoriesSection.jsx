import React, { useRef } from "react";
import CustomerStories from "../../components/CustomerStories";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "../../styles/CustomerStories.css";

function CustStoryBtn() {
    return (
        <div
            style={{ display: "none" }}
        />
    );
}

const CustomerStoriesSection = ({ data }) => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <CustStoryBtn />,
        prevArrow: <CustStoryBtn />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.155,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <section className="customer-stories-section">
            <h2 className="customer-section-title d-none d-lg-block">Customer Stories</h2>
            <h4 className="text-start fw-bold my-3 ms-2 mt-4 d-lg-none">Customer Stories</h4>

            <div className="d-none d-lg-block">
                {/* For large screens and above */}
                <Container>
                    <div className="customer-stories-arrows" ref={sliderRef}>
                        <Slider {...settings} className="customer-stories-slider">
                            {data?.testimonials?.map((item, index) => (
                                <div className="customer-card-wrapper" key={index}>
                                    <CustomerStories info={item} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Container>
            </div>

            <div className="d-lg-none">
                {/* For mobile screens */}
                <div className="customer-stories-arrows" ref={sliderRef}>
                    <Slider {...settings} className="customer-stories-slider">
                        {data?.testimonials?.map((item, index) => (
                            <div className="customer-card-wrapper" key={index}>
                                <CustomerStories info={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>

    );
};

export default CustomerStoriesSection;
