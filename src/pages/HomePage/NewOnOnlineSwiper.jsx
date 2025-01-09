import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import NewArrivalOfferCard from "./NewArrivalOfferCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/NewOnOnlineSwiper.css";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";

const NewOnOnlineSwiper = ({info}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/product-page");
  };

  // Slick Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <FaAngleRight className="slick-arrow-right" />,
    prevArrow: <FaAngleLeft className="slick-arrow-left" />,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const [loading, setLoading] = useState(true);

  // Simulating loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="new-on-kapoor-swiper px-lg-5 px-xl-5 px-xxl-5 new-onKapoor-background-gradient ">
      <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>
        New on Online Shop
      </h3>
      <h3 className="text-start font-bold d-lg-none my-3 ms-2 mt-4">
        New on Online Shop
      </h3>
      <p className="text-center font-italic d-none d-lg-block">
        <i> "Find Everything For Your Every Need"</i>
      </p>
      <Row>
        <Col xxl={2} xl={2} lg={2} className="px-2 d-none d-lg-block ">
          <div >
            <Link
              to={`/product/`}
              className="shop-by-category-card text-decoration-none"
            >
              <div className="position-relative w-100 h-100  rounded">
                <img
                  src={require(("../../assets/images/NewOnOnline/newarrive.png"))}
                  className="staic-slider-image"
                  alt={"New Arrive Product"}
                  loading="lazy"
                  style={{ height: "320px" }}
                />
              </div>
            </Link>
          </div>
        </Col>
        <Col xxl={10} xl={10} lg={10} className="p-0 m-0">
          {/* Slider Component */}
          <Slider {...settings}>
            {info.map((item, index) => (
              <div key={"newOnKapoor-" + index} className="slick-slide-container swiper-slide-container rounded" style={{ borderRadius: "10px" }}>
                <NewArrivalOfferCard itemInfo={item} />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </div>

  );
};

export default NewOnOnlineSwiper;
