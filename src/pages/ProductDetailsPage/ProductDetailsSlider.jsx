import React, { useState, useRef } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoClose } from "react-icons/io5";

const ProductDetailsSlider = ({ images }) => {
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [activeMainIndex, setActiveMainIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = useRef(null);

  const handleMainSlideChange = (swiper) => {
    setActiveMainIndex(swiper.activeIndex);
    if (thumbSwiper && thumbSwiper !== null) {
      const thumbSlidesInView = thumbSwiper.params.slidesPerView;
      const thumbIndexInView = swiper.activeIndex - thumbSlidesInView / 2;
      const thumbIndexMax = images.length - thumbSlidesInView;
      const newThumbIndex =
        thumbIndexInView < 0
          ? 0
          : thumbIndexInView > thumbIndexMax
          ? thumbIndexMax
          : thumbIndexInView;
      thumbSwiper.slideTo(newThumbIndex);
    }
  };

  const handleThumbClick = (index) => () => {
    mainSwiper.slideTo(index);
    setActiveMainIndex(index);
  };

  const handlePrev = () => {
    if (activeMainIndex > 0) {
      mainSwiper.slideTo(activeMainIndex - 1);
      setActiveMainIndex(activeMainIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeMainIndex < images.length - 1) {
      mainSwiper.slideTo(activeMainIndex + 1);
      setActiveMainIndex(activeMainIndex + 1);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsZoomed(false); // Reset zoom when closing modal
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  const handleMouseMove = (e) => {
    if (zoomRef.current && isZoomed) {
      const { left, top, width, height } =
        zoomRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      zoomRef.current.style.transformOrigin = `${(x / width) * 100}% ${
        (y / height) * 100
      }%`;
    }
  };

  return (
    <>
      <div className="d-flex" style={{ height: "700px", overflow: "hidden" }}>
        {/* Thumbnail Swiper */}
        <div className="d-none d-sm-block col-2">
          <div className="h-100">
            <Swiper
              onSwiper={setThumbSwiper}
              spaceBetween={10}
              slidesPerView={4}
              direction="vertical"
              modules={[FreeMode, Thumbs]}
            >
              {images?.map((item, index) => (
                <SwiperSlide key={`thumb-${index}`}>
                  <div
                    className={`w-100 h-100 border ${
                      activeMainIndex === index ? "border-warning" : "border-light"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={handleThumbClick(index)}
                  >
                    <img
                      src={item}
                      alt="product-thumbnail"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length >= 4 && (
              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-dark w-50"
                  onClick={handlePrev}
                  style={{ height: "40px" }}
                >
                  <FaAngleUp />
                </button>
                <button
                  className="btn btn-dark w-50"
                  onClick={handleNext}
                  style={{ height: "40px" }}
                >
                  <FaAngleDown />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Swiper */}
        <div className="col-12 col-sm-10 ps-3">
          <Swiper
            onSlideChange={handleMainSlideChange}
            onSwiper={setMainSwiper}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="h-100"
          >
            {images?.map((item, index) => (
              <SwiperSlide key={`main-${index}`}>
                <div
                  className="d-flex justify-content-center align-items-center h-100"
                  style={{ cursor: "zoom-in" }}
                  onClick={handleOpen}
                >
                  <img
                    src={item}
                    alt="product-main"
                    className="img-fluid"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          {/* Image with Zoom */}
          <div
            className="position-relative d-flex align-items-center justify-content-center w-100"
            onMouseMove={handleMouseMove}
          >
            <img
              ref={zoomRef}
              src={images[activeMainIndex]}
              className={`img-fluid transition-transform ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              alt="zoomed-product"
              style={{
                cursor: isZoomed ? "zoom-out" : "zoom-in",
                maxHeight: "90%",
              }}
              onClick={toggleZoom}
              loading="lazy"
            />
            <button
              className="btn btn-light rounded-circle position-absolute"
              style={{ bottom: "20px", left: "50%", transform: "translateX(-50%)" }}
              onClick={handleClose}
            >
              <IoClose />
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProductDetailsSlider;
