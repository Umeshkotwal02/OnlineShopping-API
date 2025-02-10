import React, { useEffect, useState } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { API_URL } from "../../constants/constApi";

const CustomerReview = ({ customClass }) => {
  const [review, setReviews] = useState([]); 
  const { id } = useParams();
  const [selectedReview, setSelectedReview] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .post(`${API_URL}allreviews`, { product_id: id })
      .then((response) => setReviews(response.data.DATA))
      .catch((error) => console.error("Error fetching reviews!", error));
  }, []);

  const handleImageGalleryOpen = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleImageGalleryClose = () => setShowModal(false);

  if (review.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-40">
        <p className="fs-5">No reviews available.</p>
      </div>
    );
  }

  return (
    <>
      {review.map((data, index) => (
        <div className="d-flex align-items-start gap-3 mb-4" key={index}>
          <div className="flex-shrink-0 rounded-circle overflow-hidden border border-secondary" style={{ width: "60px", height: "60px" }}>
            <img src={data?.user_profile} className="w-100 h-100 object-fit-cover" alt="" loading="lazy" />
          </div>
          <div>
            <h4 className="fs-5 fw-semibold mb-2">{data?.user_name}</h4>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Rating value={parseFloat(data?.product_review_star).toFixed(1)} readOnly icon={<FaStar className="text-warning" />} emptyIcon={<FaStar className="text-secondary" />} />
              <p className="text-muted mb-0">{moment(data?.created_at).format("DD MMM, YYYY")}</p>
            </div>
            <p className="fs-6 text-muted">{data?.product_review_message}</p>
            <div className={`d-flex flex-nowrap gap-3 mt-3 overflow-auto ${customClass}`}>
              <Button variant="link" className="p-0" onClick={() => handleImageGalleryOpen(data)}>
                {data?.review_images.map((media, mediaIndex) => (
                  media.endsWith(".mp4") ? (
                    <video key={mediaIndex} className="rounded w-100" controls>
                      <source src={media} type="video/mp4" />
                    </video>
                  ) : (
                    <img key={mediaIndex} className="rounded w-100" src={media} alt="" />
                  )
                ))}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleImageGalleryClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Image Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel interval={null} indicators={false} prevIcon={<FaAngleLeft className="fs-3 text-dark" />} nextIcon={<FaAngleRight className="fs-3 text-dark" />}>
            {selectedReview?.review_images?.map((media, index) => (
              <Carousel.Item key={index}>
                {media.endsWith(".mp4") ? (
                  <video className="w-100" controls>
                    <source src={media} type="video/mp4" />
                  </video>
                ) : (
                  <img className="d-block w-100" src={media} alt="" loading="lazy" />
                )}
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="mt-3">
            <h5>{selectedReview?.user_name}</h5>
            <p className="text-muted mb-1">{moment(selectedReview?.created_at).format("DD MMM, YYYY")}</p>
            <p>{selectedReview?.product_review_message}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomerReview;
