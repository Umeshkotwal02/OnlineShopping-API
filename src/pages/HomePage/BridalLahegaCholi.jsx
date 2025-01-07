import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../styles/BridalLahegaCholi.css";

const BridalLahegaCholi = () => {
    const BridalData = [
        {
            id: 1,
            product_name: "Bridal Lahenga",
            product_images: require("../../assets/images/Bridal-Lagenga/img1.png"),
        },
        {
            id: 2,
            product_name: "Bridal Lahenga",
            product_images: require("../../assets/images/Bridal-Lagenga/img2.png"),
        },
        {
            id: 3,
            product_name: "Bridal Lahenga",
            product_images: require("../../assets/images/Bridal-Lagenga/img3.png"),
        },
        {
            id: 4,
            product_name: "Bridal Lahenga",
            product_images: require("../../assets/images/Bridal-Lagenga/img4.png"),
        },
    ];

    const handleAddToCart = (e) => {
        e.preventDefault();
        alert("Product added to cart!");
    };

    const productNameSlug = (name) => {
        return name.replace(/\s+/g, "-").toLowerCase();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        nextArrow: false,
        prevArrow: false,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 4, slidesToScroll: 1 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1.2, slidesToScroll: 1, centerMode: true },
            },
        ],
    };

    return (
        <div className="bridal-container mt-4 px-lg-5 px-xl-5 px-xxl-5 mobile-paddin-fix">
            <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>
                Bridal Lehenga Choli
            </h3>
            <h3 className="text-start font-bold d-lg-none my-3 ms-2 mt-4">
                Bridal Lehenga Choli
            </h3>
            <p className="text-center font-italic d-none d-lg-block">
                <i> "Embrace the festival magic, let joy fill every moment."</i>
            </p>
            <Slider {...settings} className="bridal-slider">
                {BridalData.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${productNameSlug(product.product_name)}`}
                        className="text-decoration-none"
                    >
                        <div className="bridal-image-container">
                            <img
                                src={product.product_images}
                                className="slider-image bridal-img"
                                alt={product.product_name}
                            />
                            <div className="overlay-buttons">
                                <button
                                    className="shop-now-btn"
                                    onClick={handleAddToCart}
                                >
                                    SHOP NOW
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default BridalLahegaCholi;
