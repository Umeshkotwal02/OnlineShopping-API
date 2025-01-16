import React, { useState, useEffect, useRef } from "react";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import NewArrivalOfferCard from "./NewArrivalOfferCard";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Custom Next Arrow Component
const NextCatArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow next-arrow d-none d-lg-block" onClick={onClick}>
      <CategorySlickNextIcon />
    </div>
  );
};

// Custom Previous Arrow Component
const PrevCatArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow prev-arrow d-none d-lg-block" onClick={onClick}>
      <CategoryPrevNextIcon />
    </div>
  );
};

const ShopByCategorySlick = ({ data = [] }) => {

  const [loading, setLoading] = useState(true);
  const [prevArrowPosition, setPrevArrowPosition] = useState(0);
  const sliderRef = useRef(null);


  useEffect(() => {
    const updateArrowPosition = () => {
      if (sliderRef.current) {
        const slide = sliderRef.current.querySelector(".slick-slide");
        if (slide) {
          const slideWidth = slide.offsetWidth;
          const prevArrow = document.querySelector(".prev-arrow");
          if (prevArrow) {
            prevArrow.style.left = `-${slideWidth + 11}px`;
          }
        }
      }
    };

    // Update on mount and on window resize
    updateArrowPosition();
    window.addEventListener("resize", updateArrowPosition);

    return () => {
      window.removeEventListener("resize", updateArrowPosition);
    };
  }, []);

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextCatArrow />,
    prevArrow: <PrevCatArrow style={{ left: prevArrowPosition }} />,
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

  return (
    <>
      <Container
        fluid
        className="shop-by-category-slick slider-container h-100 w-100 px-lg-5 px-xl-5 px-xxl-5 new-onKapoor-background-gradient pb-5"
      >
        <h3 className="text-center text-normal d-none d-lg-block pt-4" style={{ fontWeight: "400" }}>
          New on Online Shop
        </h3>
        <h3 className="text-start fw-bold d-lg-none my-3">
          New on Online Shop
        </h3>
        <p className="text-center font-italic d-none d-lg-block">
          <i> "Find Everything For Your Every Need"</i>
        </p>
        <Row>
          <Col xxl={2} xl={2} lg={2} className="px-2 d-none d-lg-block">
            <div>
              <Link to={`/product/`} className="shop-by-category-card text-decoration-none">
                <div className="position-relative w-100 h-100 rounded">
                  <img
                    src={require("../../assets/images/NewOnOnline/newarrive.png")}
                    className="staic-slider-image"
                    alt={"New Arrive Product"}
                    loading="lazy"
                    style={{ aspectRatio: "9/11.8" }}
                  />
                </div>
              </Link>
            </div>
          </Col>
          <Col xxl={10} xl={10} lg={10} sm={12} xs={12} className="mobile-category-slider px-lg-0 px-xl-0 px-xxl-0">
            {/* Render the slider */}
            <div ref={sliderRef}>
              <Slider {...settings}>
                {data.map((item, index) => (
                  <div
                    key={"newOnKapoor-" + index}
                    className="slick-slide-container swiper-slide-container rounded"
                    style={{ borderRadius: "10px" }}
                  >
                    <NewArrivalOfferCard itemInfo={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default ShopByCategorySlick;