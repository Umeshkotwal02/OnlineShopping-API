import React from "react";
import Slider from "react-slick";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../../assets/SvgIcons";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/ShopbyCatCard.css"
import "../../styles/ShopByCategorySlick.css";


const sliderItems = [
  {
    id: 1,
    image: require("../../assets/images/ShopByColor/img1.png"),
    text: "Crush(Pleated) Work"
  },
  {
    id: 2,
    image: require("../../assets/images/ShopByColor/img2.png"),
    text: "Lehenga Saree"
  },
  {
    id: 3,
    image: require("../../assets/images/ShopByColor/img3.png"),
    text: "Designer Saree"
  },
  {
    id: 4,
    image: require("../../assets/images/ShopByColor/img4.png"),
    text: "Printed Embroidered "
  },
  {
    id: 5,
    image: require("../../assets/images/ShopByColor/img5.png"),
    text: "Floral Saree"
  },
  {
    id: 6,
    image: require("../../assets/images/ShopByColor/img6.png"),
    text: "Celebrity Outfits"
  },
  {
    id: 7,
    image: require("../../assets/images/ShopByColor/img1.png"),
    text: "Reception"
  },
  {
    id: 8,
    image: require("../../assets/images/ShopByColor/img2.png"),
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
    <div className="custom-arrow shop-by-color-prev-arrow d-none d-lg-block" onClick={onClick}>
      <CategoryPrevNextIcon />
    </div>
  );
};

const ShopByColorSlick = () => {

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
    prevArrow: <PrevCatArrow />,
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
          slidesToShow: 2.3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  const productNameSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

  return (
    <>
      <Container
        fluid
        className="shop-by-category-slick slider-container h-100 w-100 px-lg-5 px-xl-5 px-xxl-5">
        <h3 className="text-start font-bold my-3 ms-2 mt-4">
          Shop by Color
        </h3>
        <div className="d-none d-lg-block">
          <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>Shop by Color</h3>
          <p className="text-center font-italic mb-2"><i>"Embrace the festival magic, let joy fill every moment."</i></p>
        </div>
        <Row>
          <Col xxl={12} xl={12} lg={12} className="p-0 m-0">
            {/* Render the slider */}
            <div>
              <Slider {...settings}>
                {sliderItems.map((product) => (
                  <div key={product.id}>
                    <Link
                      to={`/product/${productNameSlug(product.text)}`}
                      className="shop-by-category-card text-decoration-none"
                    >
                      <div className="position-relative w-100 h-100 rounded">
                        <img
                          src={product.image}
                          className="slider-image rounded"
                          alt={product.text}
                          loading="lazy"
                        />
                        <div className="image-overlay position-absolute d-flex align-items-end justify-content-center pb-3">
                          {/* <p
                            className="overlay-text text-white text-center"
                            style={{ fontFamily: "KaushanScript" }}
                          >
                            {product.text}
                          </p> */}
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

      <Container fluid className="d-lg-none">
        {/* <h3 className="fw-bold my-3">Shop by Category</h3> */}
        <h3 className="text-start my-3">Shop by Category</h3>

        {/* <Slider {...settings}>
          {sliderItems.map((product) => (
            <div key={product.id}>
              <Link
                to={`/product/${productNameSlug(product.text)}`}
                className="shop-by-category-card text-decoration-none"
              >
                <div className="position-relative w-100 h-100 rounded">
                  <img
                    src={product.image}
                    className="slider-image rounded"
                    alt={product.text}
                    loading="lazy"
                  />
                  <div className="image-overlay position-absolute d-flex align-items-end justify-content-center pb-3">
                    <p className="overlay-text text-white text-center" style={{ fontFamily: "KaushanScript" }}>{product.text}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider> */}
      </Container>
    </>
  );
};

export default ShopByColorSlick;
