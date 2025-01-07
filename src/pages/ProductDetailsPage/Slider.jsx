import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "./demo.css";

const ProductDetailsSlider = () => {
  const images = [
    require('../../assets/images/ProductDetails/img1.png'),
    require('../../assets/images/ProductDetails/img2.png'),
    require('../../assets/images/ProductDetails/image.png'),
    require('../../assets/images/ProductDetails/img3.png'),
    require('../../assets/images/ProductDetails/img4.png'),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = useRef(null);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };

  const handleThumbClick = (index) => {
    setActiveIndex(index);
  };

  const toggleModal = () => setModalOpen(!isModalOpen);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  const handleMouseMove = (e) => {
    if (zoomRef.current && isZoomed) {
      const { left, top, width, height } =
        zoomRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      zoomRef.current.style.transformOrigin = `${(x / width) * 100}% ${(y / height) * 100}%`;
    }
  };

  return (
    <div className="container fluid">
      <div className="row">
        {/* Thumbnail Navigation */}
        <div className="col-md-2 d-none d-md-block">
          <div className="d-flex flex-column align-items-center">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail mb-2 ${activeIndex === index ? "border-dark border-3" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleThumbClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="img-fluid"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            ))}
            <div className="d-flex justify-content-between mt-2 thumbnail">
              <button className="btn btn-dark" onClick={handlePrev}>
                <FaAngleUp />
              </button>
              <button className="btn btn-dark" onClick={handleNext}>
                <FaAngleDown />
              </button>
            </div>
          </div>
        </div>

        {/* Main Image Slider */}
        <div className="col-md-10 p-0">
          <div className="main-image position-relative p-0">
            <img
              src={images[activeIndex]}
              alt={`Main ${activeIndex + 1}`}
              className="img-fluid w-100 p-0"
              onClick={toggleModal}
              style={{ cursor: "pointer", height: "100vh", borderRadius: "20px" }}
            />
          </div>
        </div>
      </div>

      {/* Modal for Fullscreen View */}
      <Modal show={isModalOpen} onHide={toggleModal} size="lg" centered>
        <Modal.Body className="p-0 bg-dark">
          <div
            className="position-relative w-100 h-100 d-flex justify-content-center align-items-center"
            onMouseMove={handleMouseMove}
          >
            <img
              ref={zoomRef}
              src={images[activeIndex]}
              alt={`Zoomed ${activeIndex + 1}`}
              className={`img-fluid ${isZoomed ? "zoomed" : ""}`}
              onClick={toggleZoom}
              style={{
                cursor: isZoomed ? "zoom-out" : "zoom-in",
                transition: "transform 0.3s",
                transform: isZoomed ? "scale(1.5)" : "scale(1)",
              }}
            />
            <div className="button-product-de">
              <button
                className="btn btn-light position-absolute top-0 end-0 m-2"
                onClick={toggleModal}
              >
                <IoClose size={24} />
              </button>
              {activeIndex > 0 && (
                <button
                  className="btn btn-light position-absolute start-0 m-2"
                  onClick={handlePrev}
                >
                  <FaAngleLeft size={24} />
                </button>
              )}
              {activeIndex < images.length - 1 && (
                <button
                  className="btn btn-light position-absolute end-0 m-2"
                  onClick={handleNext}
                >
                  <FaAngleRight size={24} />
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetailsSlider;