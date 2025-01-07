import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { Modal } from "react-bootstrap";
import "../../styles/Order.css"
import { ReviewClose } from "../../assets/SvgIcons";


const modalData = {
    product: {
        name: "Pink Ethnic",
        image: require("../../assets/images/form-checkout/reviewproduct.png"),
        description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
    },
    ratings: [1, 2, 3, 4, 5],
    files: [
        { type: "image/png", url: require("../../assets/images/form-checkout/reviewpic1.png") },
        { type: "image/png", url: require("../../assets/images/form-checkout/reviewpic2.png") },
        { type: "video/mp4", url: "https://www.w3schools.com/html/movie.mp4" },
    ],
};

const ReviewModal = ({ show, handleClose }) => {
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("");
    const [files, setFiles] = useState(modalData.files);

    const handleFileChange = (e) => {
        const newFiles = [...files, ...e.target.files];
        setFiles(newFiles);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleSubmitReview = () => {
        // Handle review submission
        alert("Review Submitted!");
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="web-bg-color mb-0">
                <Modal.Title>Write Review</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex gap-3">
                    <div className="product-image-container">
                        <img
                            src={modalData.product.image}
                            alt={modalData.product.name}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="product-name">{modalData.product.name}</h5>
                        <p className="text-muted small cart-para">{modalData.product.description}</p>
                    </div>
                </div>

                <div className="mb-3">
                    <h5>How would you rate it?</h5>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                </div>

                <div className="mb-4">
                    <h5>Share a video or photo</h5>
                    <div className="d-flex flex-wrap gap-3">
                        {files.map((file, index) => (
                            <div key={index} className="file-container">
                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={file.url}
                                        alt={`review-${index}`}
                                        className="file-image"
                                    />
                                ) : (
                                    <video controls style={{
                                        width: "100%", height: "100%",
                                        objectFit: "fill"
                                    }}>
                                        <source src={file.url} type={file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                <span
                                    onClick={() => handleRemoveFile(index)}
                                    className="btn-remove"
                                >
                                    <ReviewClose className="text-danger" />
                                </span>
                            </div>
                        ))}
                        <div className="file-container add-file">
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                                className="file-input"
                                onChange={handleFileChange}
                            />
                            <img src={require("../../assets/images/form-checkout/ReviewChooseFile.png")} alt="ReviewChooseFile" />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h5>Write your review</h5>
                    <textarea
                        value={reviewMessage}
                        onChange={(e) => setReviewMessage(e.target.value)}
                        placeholder="Please write your review here..."
                        className="form-control review-textarea web-bg-color border-0 rounded-3"
                        rows="4"
                        cols="40"
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSubmitReview}
                        className="px-4 py-2  bg-black btn-lg rounded-5 text-white"
                    >
                        Submit
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;
