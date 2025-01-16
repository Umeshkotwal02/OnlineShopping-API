import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Modal, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import Loader from "../../components/Loader";
import WatchShopCard from "../../components/homepage/WatchShopCard";
import "../../styles/WatchShopCard.css";

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


const WatchShopSection = ({ data }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        nextArrow: <NextCatArrow />,
        prevArrow: <PrevCatArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
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
                            <h4 className="fw-normal text-center fs-3 d-none d-lg-block mt-5">Watch and Shop</h4>
                            <h3 className="text-start fw-bold d-lg-none my-3 ms-2">Watch and Shop</h3>
                            <p className="text-center font-italic d-none d-lg-block"><i> "Embrace the festival magic, let joy fill every moment."</i></p>
                        </div>
                        <Row>
                            <Col className="mobile-watchandshop-slider">
                                <Slider {...settings} className="wtc-shop-slick-slider">
                                    {data?.map((product, index) => (
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
                                    initialSlide={data.findIndex(product => product.product_video_url === selectedVideo)}
                                    style={{ background: "transparent" }}
                                >
                                    {data?.map(product => (
                                        <div key={product.id} className="video-slide">
                                            <ReactPlayer
                                                url={product.product_video_url}
                                                playing={product.product_video_url === selectedVideo}
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
