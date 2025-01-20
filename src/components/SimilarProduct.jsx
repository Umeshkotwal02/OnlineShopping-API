import React from "react";
import Slider from "react-slick";
import NewArrivalCard from "./homepage/NewArriveCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ShopbyCatCard.css"
import "../styles/ShopByCategorySlick.css";
import { CategoryPrevNextIcon, CategorySlickNextIcon } from "../assets/SvgIcons";

const SimilarProduct = ({ title, info }) => {
  const sliderRef = React.useRef();

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
    prevArrow: <PrevCatArrow />,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };


  return (
    <div className="container-fluid my-5 shop-by-category-slick slider-container h-100 w-100">
      {/* Title */}
      <h4 className="">
        {title || "You May Also Like"}
      </h4>

      {/* React-Slick Slider */}
      <div className="position-relative px-lg-3">
        <Slider {...settings} ref={sliderRef}>
          {info?.map((item) => (
            <div key={"suggestion" + item?.id} className="px-2">
              <NewArrivalCard product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SimilarProduct;
