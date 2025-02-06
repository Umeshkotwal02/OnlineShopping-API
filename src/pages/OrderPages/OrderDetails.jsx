import React, { useEffect, useState } from "react";
// import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { FaXmark } from "react-icons/fa6";
import { Rating } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TextareaAutosize } from "@mui/material";
import { Form, Link, useParams } from "react-router-dom";
import axios from "axios";
import { STORAGE } from "../../config/config";
import { API_URL } from "../../constants/constApi";
import toast from "react-hot-toast";
import Breadcrumb from "../../components/Breadcrumb";
import { AddPhotoIcon } from "../../assets/SvgIcons";
import Loader from "../../components/Loader";
import { Button, Container, Modal } from "react-bootstrap";


const OrderDetails = () => {
  const breadcrumbArray = [
    <Link
      to="/" key="1" className="text-muted text-decoration-none">
      Home
    </Link>,
    <Link
      to="/my-order"
      className="text-muted text-decoration-none"
    >
      My Order
    </Link>,
    <span
      key="2" className="text-dark">
      Order Details
    </span >,
  ];


  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [itemStatus, setItemStatus] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelProductIndex, setCancelProductIndex] = useState(null);
  const [productIndex, setProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCancelModal, setShowCanselModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReturnClose = () => setShowReturnModal(false);
  const handleReturnShow = () => setShowReturnModal(true);
  const handleCancelClose = () => setShowCanselModal(false);
  const handleCancelShow = () => setShowCanselModal(true);
  const handleReviewClose = () => {
    setShowReviewModal(false)
    setOpenWriteReview(false);
    setValue(0);
    setReviewMessage("");
    setImages([]);
    setVideos([]);
  }
  const handleReviewShow = () => setShowReviewModal(true);
  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

  const fetchOrderDetailApi = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}orderdetails`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_id: userProfile?.id,
        order_id: orderId,
      });
      const data = response.data.DATA;
      setOrderDetails(data);
      const initialStatus = {};
      data.product_detail.forEach((item, index) => {
        initialStatus[index] = item.order_product_status;
      });
      setItemStatus(initialStatus);
      // console.log("djjdh::", itemStatus);
      // console.log("productDataff", response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetailApi();
  }, [orderId]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "complete":
        return "bg-green-200 text-green-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "cancel":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // ----------------------------for cancel order---------------------
  const handleCancelOrder = async (orderId, productIndex, reason) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}cancelorder`, {
        user_id: userProfile?.id,
        order_id: orderId,

        message: reason,
      });
      console.log(data);

      if (data && data.STATUS === 200) {
        setItemStatus((prevStatus) => ({
          ...prevStatus,
          [productIndex]: "cancel",
        }));
        toast.success(data.MESSAGE || "Cancel order successfully.");
      } else if (data && data.STATUS === 400) {
        toast.error(data.MESSAGE || "please enter any reason");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCancelDialog = (index) => {
    setCancelProductIndex(index);
    handleCancelShow();
  };

  const submitCancelReason = () => {
    if (cancelProductIndex !== null) {
      handleCancelOrder(orderId, cancelProductIndex, cancelReason);
    }
    handleCancelClose()
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ----------------------------for cancel order---------------------
  // ----------------------------for Return order---------------------

  const [returnReason, setReturnReason] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleReturnProduct = async (orderId, productIndex) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE.USERDETAIL));

    setLoading(true);
    try {
      console.log("return_productsave", {
        device_id: localStorage.getItem(STORAGE.DEVICEID),
        user_id: userProfile?.id,
        user_type: userProfile?.user_type,
        product_id: selectedProductIds,
        order_id: orderId,
        return_reason: returnReason,
      });
      const { data } = await axios.post(`${API_URL}return_productsave`, {
        device_id: localStorage.getItem(STORAGE.DEVICEID),
        user_id: userProfile?.id,
        user_type: userProfile?.user_type,
        product_id: selectedProductIds,
        order_id: orderId,
        return_reason: returnReason,
      });

      console.log(data);

      if (data && data.STATUS === 200) {
        toast.success(data?.MESSAGE || "Cancel order successfully.");
        setShowReturnModal(false);
      }
      if (data && data.STATUS === 400) {
        toast.error(data?.MESSAGE || "Cancel order successfully.");
      }
    } catch (error) {
      console.error("Error returning product:", error);
      toast.error("Error returning product.");
    } finally {
      setLoading(false);
    }
  };

  const handleReturnButtonClick = () => {
    if (selectedProductIds.length === 0) {
      toast.error("Please select a product to return.");
    } else {
      handleReturnShow();
    }
  };

  const handleSubmit = () => {
    if (returnReason !== null) {
      handleReturnProduct(orderId);
      console.log("Return Reason:", returnReason);
      handleReturnClose();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductSelect = (productId) => {
    setSelectedProductIds((prevSelectedProductIds) =>
      prevSelectedProductIds.includes(productId)
        ? prevSelectedProductIds.filter((id) => id !== productId)
        : [...prevSelectedProductIds, productId]
    );
  };

  console.log("selectedProductIds", selectedProductIds);

  // ----------------------------for return order End---------------------


  // ----------------------------for Review order Start---------------------

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviewMessage, setReviewMessage] = useState("");
  const [openWriteReview, setOpenWriteReview] = useState(false);

  const addImage = (image) => {
    setImages([...images, image]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const addVideo = (video) => {
    setVideos([...videos, video]);
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      addImage(file);
    } else if (file.type.startsWith("video/")) {
      addVideo(file);
    }
  };

  const handleWriteReviewOpen = (index) => {
    console.log("Opening review for product index:", index);
    handleReviewShow();
    setProductIndex(index);
  };


  const handleSubmitReview = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    const formdata = new FormData();
    formdata.append("device_id", localStorage.getItem(STORAGE?.DEVICEID));
    formdata.append(
      "product_id",
      orderDetails?.product_detail[productIndex]?.product_id
    );
    formdata.append("product_review_star", value);
    formdata.append("user_id", userProfile?.id);
    formdata.append("is_admin", 0);
    images.forEach((image, index) => {
      formdata.append(`review_images[${index}]`, image);
    });
    videos.forEach((video, index) => {
      formdata.append(`review_videos[${index}]`, video);
    });
    formdata.append("product_review_message", reviewMessage);

    try {
      const { data } = await axios.post(`${API_URL}savereview`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("review", data);
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "Review added");
        handleReviewClose();
        console.log("review-inside", data);
      } else if (data && data.STATUS === 400) {
        toast.error(data.MESSAGE || "Failed to review added");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <Breadcrumb list={breadcrumbArray} />
      <Container>
        {/* Order-Card Start ------------------------------------------------*/}
        <div className="container mt-4 border" style={{ borderRadius: "15px", backgroundColor: "#F3F3F3" }}>
          <h3 className="h4 mt-4 mb-2">Order Details</h3>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
              <div>
                <h5 className="mb-0" style={{ color: "#474545" }}>
                  Ordered on {orderDetails?.order_detail[0]?.order_date ?? "N/A"}
                </h5>
              </div>
              <span className="d-none d-lg-inline-block" style={{ color: "#474545" }}>|</span>
              <div>
                <h5 className="mb-0" style={{ color: "#474545" }}>
                  Order# {orderDetails?.order_detail[0]?.order_number ?? "N/A"}
                </h5>
              </div>
            </div>
            <div>
              <Link
                to={orderDetails?.order_detail[0]?.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-decoration-none"
                style={{ color: "#03A685" }}
              >
                Download Invoice
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-3 mb-3 text-capitalize">
              <h5>Shipping Address</h5>
              <p className="text-capitalize">{orderDetails?.sheeping_address?.order_shipping_address ?? "No address provided"}</p>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <h5>Payment Methods</h5>
              <p className="fw-normal text-muted mb-0 text-capitalize">
                {orderDetails?.order_summary?.payment_method ?? "N/A"}
              </p>
            </div>
            <div className="col-lg-6">
              <h5>Order Summary</h5>
              <table className="table" style={{ backgroundColor: "#F3F3F3" }}>
                <tbody>
                  <tr>
                    <td>Bag Total:</td>
                    <td className="text-end">₹ {orderDetails?.order_summary?.total_before_gst ?? 0}</td>
                  </tr>
                  {userProfile?.user_type === "btob" && (
                    <tr>
                      <td>GST 18%:</td>
                      <td className="text-end">₹ {orderDetails?.order_summary?.total_gst_amount ?? 0}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="fw-bold" style={{ color: "#03A685" }}>Total Pay:</td>
                    <td className="fw-bold text-end">₹ {orderDetails?.order_summary?.total_after_gst ?? 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Order-Card Emd ------------------------------------------------*/}



        {/* Other Order Start ------------------------------------------------*/}

        <div className="my-5">
          {orderDetails?.product_detail?.map((item, index) => {
            const isSelected = selectedProductIds.includes(item.product_id);
            return (
              <>
                <div
                  key={index}
                  className={`border mt-4 rounded-4 p-3 ${isSelected ? "border-2 border-secondary bg-light" : ""}`}
                  style={{ position: "relative" }}
                  onClick={() => handleProductSelect(item.product_id)}
                >
                  {isSelected && (
                    <img
                      src={require("../../assets/images/form-checkout/select-img.png")}
                      alt="Select Icon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translate(170%, -50%)",
                        width: "24px",
                        height: "24px",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <div className="d-flex align-items-center">
                    {/* Product Image */}
                    <div className="flex-shrink-0" style={{ width: "100px", marginRight: "16px" }}>
                      <img
                        loading="lazy"
                        src={item?.product_images}
                        className="w-100 h-100 object-fit-cover rounded"
                        alt=""
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow-1">
                      <h3 className="h6 text-black mb-2">{item?.product_name}</h3>
                      <p className="text-muted mb-2">
                        {item?.product_description || "Product description here..."}
                      </p>
                      <p className="fw-bold mb-0">
                        ₹{item?.product_sub_total}{" "}
                        <span className="text-muted text-decoration-line-through">
                          MRP: ₹{item?.product_mrp}
                        </span>{" "}
                        <span className="text-danger small">
                          [{item?.product_discount}% OFF]
                        </span>
                      </p>
                      <p className="mb-0">Qty: {item?.product_quantity}</p>
                    </div>

                    {/* Status and Action Buttons */}
                    {item.status === "complete" && (
                      <div className="d-flex flex-column gap-2 mt-3">
                        <button className="btn btn-outline-success rounded-3">
                          Complted
                        </button>

                        <button
                          className="ms-auto bg-dark text-center rounded-3 px-3 py-1 cmn-btn text-white"
                          onClick={() => handleWriteReviewOpen(index)}
                        >
                          Write Product Review
                        </button>

                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div >
        {/* Other Order Emd ------------------------------------------------*/}

        < div className="d-flex justify-content-center my-3" >
          <div>
            {orderDetails?.order_detail[0]?.order_status !== "cancel" &&
              orderDetails?.order_detail[0]?.order_status !== "return" &&
              (orderDetails?.order_detail[0]?.order_status === "complete" ? (
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
              ))}
          </div>
        </div>
        {/* -------------------------------------------- Return Modal Start------------------------------------------------------*/}
        <Modal show={showReturnModal} onHide={handleReturnClose} backdrop="static" centered>
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <div className="bg-white p-4 shadow-lg rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h2 className="text-center mb-3 fw-medium">Return Order</h2>
              <p className="text-center text-muted mb-3">
                Reason for Return
              </p>
              <textarea
                className="web-bg-color form-control mb-3 no-style border-0 rounded-4"
                placeholder="Enter Reason..."
                rows="5"
                cols="40"
                onChange={(e) => setReturnReason(e.target.value)}

              ></textarea>

              <div className="d-flex justify-content-end">
                <button
                  className="btn web-bg-color me-2 rounded-5"
                  onClick={handleReturnClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-dark rounded-5"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* -------------------------------------------- Return Modal End------------------------------------------------------*/}

        {/* -------------------------------------- Order-Cancel Modal-Start------------------------------------------------------*/}
        <Modal show={showCancelModal} onHide={handleCancelClose} backdrop="static" centered>
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <div className="bg-white p-4 shadow-lg rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h2 className="text-center mb-3 fw-medium">Cancel Order</h2>
              <p className="text-center text-muted mb-3">
                Do you want to send the item cancellation request?
              </p>
              <textarea
                className="web-bg-color form-control mb-3 no-style border-0 rounded-4"
                placeholder="Enter Reason..."
                rows="5"
                cols="40"
                onChange={(e) => setCancelReason(e.target.value)}
              ></textarea>

              <div className="d-flex justify-content-end">
                <button
                  className="btn web-bg-color me-2 rounded-5"
                  onClick={handleCancelClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-dark rounded-5"
                  onClick={submitCancelReason}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {/* ------------------------------------------ Order-Cancel Modal-End--------------------------------------------------*/}


        {/* ------------------------------------------ Review Modal-Start--------------------------------------------------*/}
        <Modal
          show={showReviewModal}
          onHide={handleReviewClose}
          size="lg"
          centered
        >
          <Modal.Header className="bg-light" closeButton>
            <Modal.Title className="text-dark">Write Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {productIndex !== null && orderDetails?.product_detail?.[productIndex] ? (
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  src={orderDetails?.product_detail[productIndex]?.product_images || ""}
                  alt="Product"
                  className="img-fluid rounded"
                  style={{ height: "120px", width: "120px", objectFit: "cover" }}
                />
                <h5 className="text-dark">
                  {orderDetails?.product_detail[productIndex]?.product_name}
                </h5>
              </div>
            ) : (
              <p>Loading product details...</p>
            )}

            <Form.Group className="mb-4">
              <Form.Label>How would you rate it?</Form.Label>
              <Rating
                name="rating"
                value={value}
                onChange={handleChange}
                className="text-warning fs-3"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Share a video or photo</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {[...images, ...videos].map((file, index) => (
                  <div
                    key={index}
                    className="position-relative border rounded"
                    style={{
                      height: "120px",
                      width: "120px",
                      overflow: "hidden",
                    }}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`review-${index}`}
                        className="img-fluid"
                      />
                    ) : (
                      <video width="100%" height="100%" controls>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                      </video>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        file.type.startsWith("image/")
                          ? removeImage(index)
                          : removeVideo(index - images.length)
                      }
                      className="position-absolute top-0 end-0"
                    >
                      <IoCloseCircleSharp />
                    </Button>
                  </div>
                ))}
                <div
                  className="border rounded d-flex justify-content-center align-items-center"
                  style={{
                    height: "120px",
                    width: "120px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                    className="position-absolute w-100 h-100 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <span>+ Add</span>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Write your review</Form.Label>
              <Form.Control
                as="textarea"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                placeholder="Please write your review here..."
                rows={4}
                style={{ resize: "none" }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleSubmitReview} className="w-100">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ------------------------------------------ Review Modal-End--------------------------------------------------*/}

      </Container >
    </>
  );
};

export default OrderDetails;
