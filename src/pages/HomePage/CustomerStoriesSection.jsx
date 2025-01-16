import React, { useRef } from "react";
import "../../styles/CustomerStories.css";
import CustomerStories from "../../components/CustomerStories";
import Slider from "react-slick";
import { Container } from "react-bootstrap";

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
        autoplay: true,
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
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <section className="customer-stories-section">
            <h2 className="customer-section-title d-none d-lg-block">Customer Stories</h2>
            <h3 className="text-start fw-bold my-3 ms-2 mt-4 d-lg-none">Customer Stories</h3>
            
                <div className="customer-stories-arrows" ref={sliderRef}>
                    <Slider {...settings} className="customer-stories-slider">
                        {data?.testimonials?.map((item, index) => (
                            <div className="customer-card-wrapper" key={index}>
                                <CustomerStories info={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
        </section>
    );
};

export default CustomerStoriesSection;
