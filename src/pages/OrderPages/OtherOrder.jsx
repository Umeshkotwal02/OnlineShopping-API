import React, { useState } from "react";
import "../../styles/Order.css";
import ReturnModal from "./ReturnModal";
import ReviewModal from "./ReviewModal";

const orderDetails = {
    product_detail: [
        {
            product_id: 1,
            product_images: require("../../assets/images/form-checkout/check1.png"),
            product_name: "Pink Ethnic",
            product_description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            product_sub_total: "₹4,000 (1 item) ",
            stitching_price: 200,
            product_quantity: 1,
            status: "Completed",
            order_status: "Completed",
            product_review: "Product Review",
        },
        {
            product_id: 2,
            product_images: require("../../assets/images/form-checkout/check2.png"),
            product_name: "Pink Ethnic",
            product_description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            product_sub_total: "₹4,000 (1 item) ",
            stitching_price: 200,
            product_quantity: 1,
            status: "pending",
            order_status: "Processing",
            product_review: "Product Review",
        },
        {
            product_id: 3,
            product_images: require("../../assets/images/form-checkout/check3.png"),
            product_name: "Pink Ethnic",
            product_description: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with...",
            product_sub_total: "₹4,000 (1 item) ",
            stitching_price: 200,
            product_quantity: 1,
            status: "Processing",
            order_status: "pending",
            product_review: "Product Review",
        },
    ],
};

const getStatusStyle = (status) => {
    if (status === "Completed") return "btn btn-outline-success";
    if (status === "pending") return "btn btn-outline-warning text-warning";
    if (status === "Processing") return "btn web-bg-color text-dark";
    return "bg-secondary text-white";
};

const OtherOrder = () => {
    const [selectedProductId, setSelectedProductId] = useState("");
    const [showReturnOrder, setShowReturnOrder] = useState(false);
    const [showReviewOrder, setShowReviewOrder] = useState(false);


    // Return Modal 
    const handleReturnButtonClick = () => {
        setShowReturnOrder(true);
        console.log("Return Order");
    };

    const handleCloseReturnOrder = () => {
        setShowReturnOrder(false);
        document.body.classList.remove("body-lock");
    };

    // Review Modal
    const handleReviewButtonClick = () => {
        setShowReviewOrder(true);
        console.log("Return Order");
    };

    const handleCloseReviewOrder = () => {
        setShowReviewOrder(false);
        document.body.classList.remove("body-lock");
    };


    const handleProductSelect = (productId) => {
        setSelectedProductId(productId);
    };

    const openCancelDialog = () => {
        console.log("Cancel Order");
    };

    const selectedProduct = orderDetails.product_detail.find(
        (item) => item.product_id === selectedProductId
    );

    return (
        <div className="my-5">
            {orderDetails.product_detail.map((item, index) => {
                const isSelected = item.product_id === selectedProductId;
                return (
                    <div
                        key={index}
                        className={`border mt-4 rounded-4 ${isSelected ? "border-2 border-secondary web-bg-color" : ""}`}
                        style={{ position: "relative" }}
                    >
                        {isSelected && (
                            <img
                                src={require("../../assets/images/form-checkout/select-img.png")}
                                alt="Select Icon"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "0%",
                                    transform: "translate(50%, -50%)",
                                    pointerEvents: "none",
                                }}
                            />
                        )}

                        <div
                            className="d-flex flex-wrap justify-content-between align-items-center p-3 cursor-pointer"
                            onClick={() => handleProductSelect(item.product_id)}
                        >
                            <div className="d-flex gap-3 flex-grow-1 w-100">
                                <div className="flex-shrink-0" style={{ width: "100px" }}>
                                    <img
                                        src={item.product_images}
                                        alt=""
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    <h3 className="h5 mb-3">{item.product_name}</h3>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-3">{item.product_description}</p>
                                        <button
                                            className={`ms-auto text-center py-1 cmn-btn fw-medium text-capitalize ${getStatusStyle(item.status)}`}
                                        >
                                            {item.status}
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-grow-1 gap-2">
                                            <p className="mb-0">Qty: {item.product_quantity}</p>
                                            <p className="mb-0 font-weight-bold text-dark">{item.product_sub_total}</p>
                                        </div>
                                        {item.status === "Completed" && (
                                            <div className="d-flex flex-column gap-2 mt-3">
                                                <button
                                                    className="ms-auto bg-dark text-center rounded px-3 py-1 cmn-btn text-white"
                                                    onClick={handleReviewButtonClick}
                                                >
                                                    Product Review
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {selectedProduct && (
                <div className="d-flex justify-content-center mt-3">
                    {selectedProduct.order_status === "Completed" ? (
                        <button
                            className="px-3 py-2 border-0 web-bg-color text-black rounded-5"
                            onClick={handleReturnButtonClick}
                        >
                            Return Order
                        </button>
                    ) : (
                        <button
                            className="px-3 py-2 border-0 web-bg-color text-black rounded-5"
                            onClick={openCancelDialog}
                        >
                            Order Cancel
                        </button>
                    )}
                </div>
            )}

            {/* Modal is only visible when showReturnOrder is true */}
            <ReturnModal show={showReturnOrder} handleClose={handleCloseReturnOrder} />
            <ReviewModal show={showReviewOrder} handleClose={handleCloseReviewOrder} />
        </div>
    );
};

export default OtherOrder;
