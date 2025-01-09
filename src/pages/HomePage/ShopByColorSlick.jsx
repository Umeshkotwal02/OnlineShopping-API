import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ShopbyCatCard.css"
import "../../styles/ShopByCategorySlick.css";
import Loader from "../../components/Loader";


const sliderItems = [
  {
    id: 1,
    image: require("../../assets/images/CategoryByShopSlicks/Crush.png"),
    text: "Crush(Pleated) Work"
  },
  {
    id: 2,
    image: require("../../assets/images/CategoryByShopSlicks/lahenga.png"),
    text: "Lehenga Saree"
  },
  {
    id: 3,
    image: require("../../assets/images/CategoryByShopSlicks/DesignerSaree.png"),
    text: "Designer Saree"
  },
  {
    id: 4,
    image: require("../../assets/images/CategoryByShopSlicks/Printed.png"),
    text: "Printed Embroidered "
  },
  {
    id: 5,
    image: require("../../assets/images/CategoryByShopSlicks/FloralSaree.png"),
    text: "Floral Saree"
  },
  {
    id: 6,
    image: require("../../assets/images/CategoryByShopSlicks/Crush.png"),
    text: "Celebrity Outfits"
  },
  {
    id: 7,
    image: require("../../assets/images/CategoryByShopSlicks/lahenga.png"),
    text: "Reception"
  },
  {
    id: 8,
    image: require("../../assets/images/CategoryByShopSlicks/DesignerSaree.png"),
    text: "Others"
  },
];

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

const ShopByColorSlick = ({ data }) => {
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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextCatArrow />,
    prevArrow: <PrevCatArrow style={{ left: prevArrowPosition }} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
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
          slidesToShow: 1.2,
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
        className="shop-by-category-slick slider-container h-100 w-100 px-lg-5 px-xl-5 px-xxl-5">
        <h3 className="text-start font-bold my-3 ms-2 mt-4 d-lg-none">
          Shop by Color
        </h3>
        <div className="d-none d-lg-block">
          <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>Shop by Color</h3>
          <p className="text-center font-italic mb-2"><i>"Embrace the festival magic, let joy fill every moment."</i></p>
        </div>
        <Row>
          <Col xxl={12} xl={12} lg={12} sm={12} xs={12} className="mobile-category-slider px-0">
            {/* Render the slider */}
            <div ref={sliderRef}>
              <Slider {...settings}>
                {data.map((product) => (
                  <div key={product.id}>
                    <Link
                      // to={`/product/${productNameSlug(product.text)}`}
                      to={`/products-page`}
                      className="shop-by-category-slick text-decoration-none"
                    >
                      <div className="shop-by-category-slick position-relative h-100 overflow-hidden rounded-4">
                        <div className="img-container h-100 group">
                          <img
                            src={product?.product_image || '/images/product-img.png'}
                            className="w-100 h-100 duration-500 img-hover-effect"
                            alt=""
                            loading="lazy"
                          // onError="setImageError(true)"
                          />
                        </div>

                        <div className="shop-by-category-slick img-container bg-light d-none" id="fallbackImage"></div>

                        <div
                          className="position-absolute start-0 bottom-0 w-100 text-center bg-dark-gradient py-3 px-2"
                        >
                          <h3
                            className="text-white shop-cat-heading"
                          >
                            {product?.product_name}
                          </h3>
                        </div>
                      </div>
                    </Link>
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

export default ShopByColorSlick;