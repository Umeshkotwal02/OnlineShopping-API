import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../../styles/WatchShopCard.css";
import { Modal, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import Loader from "../../components/Loader";
import "../../styles/WatchShopCard.css";
import WatchShopCard from "../../components/homepage/WatchShopCard";

// Static data example
const productData = [
    {
        id: "1",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_Qd2F4EqIl5KtZdCoJ2m53.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-wine-swarovski-semicrepe-designer-saree-saus0029624_wine_4_cec7ec12-04e9-469d-b993-d046a0f61ee1_200x200.jpg?v=1710161670",
    },
    {
        id: "2",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_t32uuhxkdsw44jxao3ifkisl.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-navy-blue-swarovski-semi-crepe-designer-saree-saus0017312_navy_blue_1_594227a8-c285-4637-ad30-b18091eebc66_200x200.jpg?v=1689751227",
    },
    {
        id: "3",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_fpDadFFBq1o6TadfeVVbg.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-wine-swarovski-semicrepe-designer-saree-saus0029624_wine_4_cec7ec12-04e9-469d-b993-d046a0f61ee1_200x200.jpg?v=1710161670",
    },
    {
        id: "4",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_xrwczuptre1zumxwhojw2l6i.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-wine-swarovski-semicrepe-designer-saree-saus0029624_wine_4_cec7ec12-04e9-469d-b993-d046a0f61ee1_200x200.jpg?v=1710161670",
    },
    {
        id: "5",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_b8nskjdd37lrkx8kk4ol7a19.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-wine-swarovski-semicrepe-designer-saree-saus0029624_wine_4_cec7ec12-04e9-469d-b993-d046a0f61ee1_200x200.jpg?v=1710161670",
    },
    {
        id: "6",
        product_name: "Ruffle Lehenga With Crop Top",
        product_price: "1,999 - ₹5,999",
        product_video_url: "https://www.koskii.com/cdn/shop/files/quinn_eebme1xxxy977oxtfcs29pnu.mp4",
        small_image: "https://cdn.shopify.com/s/files/1/0049/3649/9315/files/koskii-wine-swarovski-semicrepe-designer-saree-saus0029624_wine_4_cec7ec12-04e9-469d-b993-d046a0f61ee1_200x200.jpg?v=1710161670",
    },
];
// Custom Next Arrow Component
// Custom Next Arrow Component
const NextCatArrow = ({ onClick }) => {
    return (
        <div className="watch-custom-arrow next-arrow" onClick={onClick}>
            <CategorySlickNextIcon />
        </div>
    );
};

// Custom Previous Arrow Component
const PrevCatArrow = ({ onClick }) => {
    return (
        <div className="watch-custom-arrow prev-arrow" onClick={onClick}>
            <CategoryPrevNextIcon />
        </div>
    );
};



const WatchShopSection = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <NextCatArrow />,
        prevArrow: <PrevCatArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    centerMode: false,
                    nextArrow: <NextCatArrow />,
                    prevArrow: <PrevCatArrow />,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: false,
                    nextArrow: <NextCatArrow />,
                    prevArrow: <PrevCatArrow />,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    centerMode: false,
                    nextArrow: false,
                    prevArrow: false, // Explicitly disable arrows for smaller screens
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    nextArrow: false,
                    prevArrow: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    nextArrow: false,
                    prevArrow: false,
                },
            },
        ],
    };
    
    

    // Modal Setting
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2.2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: "0px",
                },
            },
        ],
    };
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState("");

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleVideoClick = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedVideo("");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Container fluid className="watch-shop-card px-sm-0 px-lg-5 px-xl-5 px-xxl-5 ">
                        <div>
                            <h4 className="text-center fs-4 font-medium d-none d-lg-block mt-2">Watch and Shop</h4>
                            <h3 className="text-start font-bold d-lg-none my-3 ms-2">Watch and Shop</h3>
                            <p className="text-center font-italic d-none d-lg-block"><i> "Embrace the festival magic, let joy fill every moment."</i></p>
                        </div>
                        <Row>
                            <Col className="mobile-watchandshop-slider">
                                <Slider {...settings} className="wtc-shop-slick-slider">
                                    {productData.map((product) => (
                                        <div key={product.id}>
                                            <WatchShopCard watchShopProductInfo={product} onVideoClick={handleVideoClick} />
                                        </div>
                                    ))}
                                </Slider>
                            </Col>
                        </Row>

                        {/* Modal for Video */}
                        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg" centered style={{ background: "transparent" }} className="custom-watch-modal-card" >
                            <Modal.Body style={{ background: "transparent" }}>
                                <Slider
                                    {...sliderSettings}
                                    initialSlide={selectedVideo}
                                    afterChange={(index) => setSelectedVideo(index)}
                                    style={{ background: "transparent" }}
                                >
                                    {productData.map((product, index) => (
                                        <div key={product.id} className="video-slide">
                                            <ReactPlayer
                                                url={selectedVideo}
                                                playing
                                                controls
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </Modal.Body>
                        </Modal>
                    </Container>
                </>
            )}
        </>
    );
};



export default WatchShopSection;
