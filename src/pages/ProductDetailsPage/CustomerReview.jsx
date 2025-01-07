import React, { useState } from "react";
import { FaStar, FaTimes, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/ProductDetails.css";
import { IoIosArrowDown } from "react-icons/io";


// Sample Static Data
const staticReviews = [
  {
    id: 1,
    user_profile: require("../../assets/images/ProductDetails/reviewcut1.png"),
    user_name: "Anglo Saxon",
    created_at: "25 Sep, 2023",
    product_review_star: 3,
    product_review_message: "Pink and white teardrop cut zirconia gemstones adorn this opulent jewellery set, which has been fashioned out of brass. Two tone plated and a good match.",
    review_images: [
    ],
  },
  {
    id: 2,
    user_profile: require("../../assets/images/ProductDetails/reviewcut2.png"),
    user_name: "Daanish Sodhi",
    created_at: "25 Sep, 2023",
    product_review_star: 3,
    product_review_message: "Pink and white teardrop cut zirconia gemstones adorn this opulent jewellery set, which has been fashioned out of brass. Two tone plated and a good match.",
    review_images: [
      require('../../assets/images/ProductDetails/img1.png'),
      require('../../assets/images/ProductDetails/img2.png'),
      require('../../assets/images/ProductDetails/img3.png')
    ],
  },
  {
    id: 3,
    user_profile: require("../../assets/images/ProductDetails/reviewcut3.png"),
    user_name: "Kim Sabharwal",
    created_at: "25 Sep, 2023",
    product_review_star: 3,
    product_review_message: "Pink and white teardrop cut zirconia gemstones adorn this opulent jewellery set, which has been fashioned out of brass. Two tone plated and a good match.",
    review_images: [
    ],
  },
  {
    id: 4,
    user_profile: require("../../assets/images/ProductDetails/reviewcut4.png"),
    user_name: "Lalit Mane",
    created_at: "25 Sep, 2023",
    product_review_star: 3,
    product_review_message: "Pink and white teardrop cut zirconia gemstones adorn this opulent jewellery set, which has been fashioned out of brass. Two tone plated and a good match.",
    review_images: [
    ],
  },
  {
    id: 5,
    user_profile: require("../../assets/images/ProductDetails/reviewcut4.png"),
    user_name: "Lalit Mane",
    created_at: "25 Sep, 2023",
    product_review_star: 3,
    product_review_message: "Pink and white teardrop cut zirconia gemstones adorn this opulent jewellery set, which has been fashioned out of brass. Two tone plated and a good match.",
    review_images: [
    ],
  }
];

const CustomerReview = () => {
  const [reviews] = useState(staticReviews);
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const [visibleReviews, setVisibleReviews] = useState(4);


  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleImageGalleryOpen = (review) => {
    setOpenImageGallery(true);
    setSelectedReview(review);
  };
  const handleSeeMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  const handleImageGalleryClose = () => setOpenImageGallery(false);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Customer reviews</h4>
      {reviews.length === 0 ? (
        <div className="text-center my-5">
          <p>No reviews available.</p>
        </div>
      ) : (
        <>
          {reviews.slice(0, visibleReviews).map((data) => (
            <div key={data.id} className="d-flex mb-4 mobi-review">
              <div className="flex-shrink-0 me-3">
                <img
                  src={data.user_profile}
                  className="rounded-circle border"
                  alt="User"
                  width="50"
                  height="50"
                />
              </div>
              <div>
                <h5>{data.user_name}</h5>
                <div className="d-flex align-items-center mb-2">
                  <Rating
                    value={parseFloat(data.product_review_star).toFixed(1)}
                    readOnly
                    icon={<FaStar className="text-warning" />}
                    emptyIcon={<FaStar className="text-muted" />}
                  />
                  <span className="fs-2 mx-2 fw-normal text-secondary">l</span>
                  <span className="text-muted">
                    {formatDate(data.created_at)}
                  </span>
                </div>
                <p
                  style={{ fontSize: "1.1rem" }}
                  className="web-para-review"
                >
                  {data.product_review_message}
                </p>
                <div className="d-flex gap-2 mt-2">
                  {data.review_images.map((media, index) => (
                    <img
                      key={index}
                      src={media}
                      alt="Review"
                      className="img-thumbnail p-0 d-none d-lg-block"
                      style={{
                        width: "100px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageGalleryOpen(data)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          {visibleReviews < reviews.length && (
            <div className="text-start my-4 fw-medium fs-5">
              <div className="" style={{ color: "#03A685", paddingLeft: "5%" }} onClick={handleSeeMore}>
                See more reviews <IoIosArrowDown style={{ color: "#03A685", fontWeight: "500", }} />
              </div>

              <div className="d-lg-none text-center" style={{ color: "#03A685" }} onClick={handleSeeMore}>
                See more reviews <IoIosArrowDown style={{ color: "#03A685", fontWeight: "500" }} />
              </div>
            </div>
          )}
        </>
      )}


      {/* Modal for Image Gallery */}
      <Modal
        show={openImageGallery}
        onHide={handleImageGalleryClose}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <Swiper
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
            >
              {selectedReview.review_images?.map((media, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={media}
                    alt={`Slide ${index}`}
                    className="w-100"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev">
              <FaAngleLeft size={30} />
            </div>
            <div className="swiper-button-next">
              <FaAngleRight size={30} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImageGalleryClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerReview;
