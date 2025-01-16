import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/ProductImageSlider.css";

const ProductImageSlider = ({ imageList }) => {
  const id = Date.now();
  const nextclassName = `swiper-button-next-${id}`;
  const prevclassName = `swiper-button-prev-${id}`;

  // Dynamically disable loop if there are not enough slides
  const isLoopEnabled = imageList?.length > 1;

  return (
    <div className="product-slider-container">
      <button className={`slider-button slider-button-prev ${nextclassName}`}>
        <FaAngleLeft className="icon-lg" />
      </button>
      <button className={`slider-button slider-button-next ${prevclassName}`}>
        <FaAngleRight className="icon-lg" />
      </button>
      <Swiper
        className="product-image-slider"
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides
        navigation={{
          nextEl: "." + prevclassName,
          prevEl: "." + nextclassName,
        }}
        pagination={{
          clickable: false,
        }}
        modules={[Navigation, Pagination]}
        loop={isLoopEnabled} // Enable loop only if there are enough slides
        autoplay={isLoopEnabled ? { delay: 1000 } : false} // Disable autoplay if loop is off
      >
        {imageList?.map((image, index) => {
          return (
            <SwiperSlide key={"productImage-" + index} className="slider-slide">
              <div className="slider-image-container rounded-top-3">
                <img
                  src={image}
                  className="slider-image rounded-top-3"
                  alt="Product Card slider-image"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
