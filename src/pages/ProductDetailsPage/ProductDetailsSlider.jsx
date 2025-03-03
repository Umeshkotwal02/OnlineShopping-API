import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "../../styles/ProductDetails.css";

const ProductDetailsSlider = ({ images }) => {

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
      const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      zoomRef.current.style.transformOrigin = `${(x / width) * 100}% ${(y / height) * 100}%`;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Thumbnail Navigation */}
        <div className="col-md-2 p-0 d-none d-md-block">
          <div className="thumbnail-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${activeIndex === index ? "active-thumbnail" : ""}`}
                onClick={() => handleThumbClick(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-img"
                />
              </div>
            ))}
            <div style={{ marginTop: "-21%", padding: "" }}>
              <div className="thumbnail-nav d-flex justify-content-around bg-black text-white rounded-bottom fs-5">
                <div onClick={handlePrev}>
                  <FaAngleUp />
                </div>
                <div className="" onClick={handleNext}>
                  <FaAngleDown />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Image Slider */}
        <div className="col-md-10 mobile-product-details-col">
          <div className="main-image position-relative">
            <img
              src={images[activeIndex]}
              alt={`Main ${activeIndex + 1}`}
              className=""
              onClick={toggleModal}
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
    </div >
  );
};

export default ProductDetailsSlider;