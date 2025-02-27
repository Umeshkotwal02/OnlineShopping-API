import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../../styles/BridalLahegaCholi.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartThunk";
import toast from "react-hot-toast";

const BridalLahegaCholi = ({ data = [] }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const productNameSlug = (name) => {
        return name.replace(/\s+/g, "-").toLowerCase();
    };

    useEffect(() => {
        // dispatch(fetchCartItems());
    }, [dispatch]);

    const handleAddToCart = (productId, stitchingOptions) => {
        if (!productId) {
            toast.error("Product ID is required.");
            return;
        }
        dispatch(addToCart(productId, stitchingOptions));
        // toast.success("Product added to cart.");
    };


    // Custom Arrow Button (hidden)
    function CustStoryBtn() {
        return <div style={{ display: "none" }} />;
    }

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <CustStoryBtn />,
        prevArrow: <CustStoryBtn />,
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
            <h3 className="fw-normal text-center fs-3 d-none d-lg-block mt-5">
                Bridal Lehenga Choli
            </h3>
            <h3 className="text-start fw-bold d-lg-none my-3 ms-2 mt-4">
                Bridal Lehenga Choli
            </h3>
            <p className="text-center font-italic d-none d-lg-block">
                <i> "Embrace the festival magic, let joy fill every moment."</i>
            </p>
            <Slider {...settings} className="bridal-slider">
                {data.map((product) => {
                    // Generate the product slug for the URL
                    const productName = productNameSlug(product?.product_name || "product");
                    return (
                        <Link
                            key={product?.id || product?.product_id}
                            to={`/product/${product?.id || product?.product_id}/${productName}`}
                            className="text-decoration-none"
                        >
                            <div className="bridal-image-container">
                                <img
                                    src={product?.product_image}
                                    className="slider-image bridal-img"
                                    alt={product?.product_name}
                                />
                                <div className="overlay-buttons">
                                    <button
                                        className="shop-now-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleAddToCart(product?.id || product?.product_id, product?.stitchingOptions);
                                            navigate("/checkout-page");
                                        }}
                                    >
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </Slider>
        </div>
    );
};

export default BridalLahegaCholi;
