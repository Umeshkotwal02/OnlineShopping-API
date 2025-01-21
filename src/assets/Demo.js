import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaAmazon } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { FaXmark } from "react-icons/fa6";
import { Rating } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AddPhotoIcon } from "../assets/SvgIcons";
import { TextareaAutosize } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import SuggestionBlock from "../components/SuggestionBlock";
import { STORAGE } from "../config/config";
import axios from "axios";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderDetailsPage = () => {
  const breadcrumbArray = [
    <Link
      to="/"
      underline="hover"
      key="1"
      color="inherit"
      className="text-[#666666] text-base lg:text-md !leading-[1.16] font-normal font-jost  hover:underline capitalize"
    >
      Home
    </Link>,
    <Link
      to="/my-order"
      underline="hover"
      key="1"
      color="inherit"
      className="text-[#666666] text-base lg:text-md !leading-[1.16] font-normal font-jost  hover:underline capitalize"
    >
      My Order
    </Link>,
    <p
      key={2}
      className="text-[#A36300] text-base lg:text-md !leading-[1.16] font-normal font-jost  capitalize"
    >
      Order Details
    </p>,
  ];
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [itemStatus, setItemStatus] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelProductIndex, setCancelProductIndex] = useState(null);
  const [productIndex, setProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));

  const fetchOrderDetailApi = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const response = await axios.post("orderdetails", {
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

  const [downloadInvoice, setDownloadInvoice] = useState("");
  const fetchDoenloadInvoice = async () => {
    try {
      const { data } = await axios.post("generateinvoice", {
        order_id: orderId,
      });
      console.log("invoice", data.DATA);
      setDownloadInvoice(data.DATA);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      // setLoading(false); // Set loading to false after the request completes
    }
  };
  useEffect(() => {
    fetchDoenloadInvoice();
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
      const { data } = await axios.post("cancelorder", {
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
    setIsDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setIsDialogOpen(false);
    setCancelProductIndex(null);
  };

  const submitCancelReason = () => {
    if (cancelProductIndex !== null) {
      handleCancelOrder(orderId, cancelProductIndex, cancelReason);
    }
    setIsDialogOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ----------------------------for cancel order---------------------
  // ----------------------------for Return order---------------------

  const [dialogVisible, setDialogVisible] = useState(false);
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
      const { data } = await axios.post("return_productsave", {
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
        setDialogVisible(false);
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
    // setDialogVisible(true);
    if (selectedProductIds.length === 0) {
      toast.error("Please select product to return.");
    } else {
      setDialogVisible(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  const handleSubmit = () => {
    console.log("Return Reason:", returnReason);

    handleReturnProduct(orderId);
    handleCloseDialog();

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

  // ----------------------------for return order---------------------

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
    setProductIndex(index);
    setOpenWriteReview(true);
  };

  const handleWriteReviewClose = () => {
    setOpenWriteReview(false);
    setValue(0);
    setReviewMessage("");
    setImages([]);
    setVideos([]);
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
      const { data } = await axios.post("savereview", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("review", data);
      if (data && data?.STATUS === 200) {
        toast.success(data?.MESSAGE || "Review added");
        handleWriteReviewClose();
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
          <div className="loader-container">
            <div className="loader-circle-9">
              Kapoor
              <span></span>
            </div>
          </div>
        </div>
      )}
      {/* <TopBar />
      <Header /> */}
      <Breadcrumb list={breadcrumbArray} />
      <div className="max-w-[1600px] mx-auto px-3">
        <div className="my-[17px] md:mb-[30px]"></div>
        <h3 className="text-xl md:text-2xl xl:text-2xl !leading-[1.22] font-jost font-medium mb-[15px]">
          Order Details
        </h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-[15px] gap-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3.5 w-full sm:w-auto justify-between">
            <div>
              <h5 className="xs:text-sm md:text-lg !leading-[120%] font-medium text-[#474545] mb-1.5">
                Ordered on {orderDetails?.order_detail[0]?.order_date}
              </h5>
            </div>
            <span className="hidden lg:inline-block">|</span>
            <div>
              <h5 className="xs:text-sm md:text-lg !leading-[120%] font-medium text-[#474545] mb-1.5">
                Order# {orderDetails?.order_detail[0]?.order_number}
              </h5>
            </div>
          </div>

          <div className="">
            <a
              href={downloadInvoice?.invoice_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-max xs:text-sm md:text-lg !leading-[120%] font-medium text-[#03A685]"
            >
              Download Invoice
            </a>
          </div>
        </div>
        <div className="border-2 border-[#EBEBEB] p-3 sm:p-4 md:p-[30px]">
          <div className="flex flex-wrap -mx-3 gap-y-4 justify-between">
            <div className="w-full md:w-6/12 lg:w-3/12 xl:w-1/5 px-3">
              <h4 className="text-lg md:text-2xl font-medium !leading-relaxed mb-2.5">
                Shipping Address
              </h4>
              <p className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] max-w-[200px] break-words whitespace-normal">
                {orderDetails?.sheeping_address?.order_shipping_address}
              </p>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 xl:w-1/5 px-3">
              <h4 className="text-lg md:text-2xl font-medium !leading-relaxed mb-2.5">
                Payment Methods
              </h4>
              <div className="flex items-center gap-2">
                <p className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040]">
                  {orderDetails?.order_summary?.payment_method}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-5/12 px-3">
              <h4 className="text-lg md:text-2xl font-medium !leading-relaxed mb-2.5">
                Order Summary
              </h4>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-start">
                      Bag Total:
                    </td>
                    <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-end">
                      ₹ {orderDetails?.order_summary?.total_before_gst}
                    </td>
                  </tr>
                  <tr>
                    <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-start">
                      Packing Charge:
                    </td>
                    <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-end">
                      ₹ 0
                    </td>
                  </tr>

                  {userProfile?.user_type === "btob" ? (
                    <tr>
                      <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-start">
                        GST 18%:
                      </td>
                      <td className="xs:text-sm md:text-lg !leading-[120%] font-jost text-[#404040] py-[5px] text-end">
                        ₹ {orderDetails?.order_summary?.total_gst_amount}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  <tr>
                    <td className="xs:text-sm md:text-lg!leading-[120%] font-jost font-bold text-[#404040] py-[5px] text-start">
                      Total Pay:
                    </td>
                    <td className="xs:text-sm md:text-lg !leading-[120%] font-jost font-bold text-[#404040] py-[5px] text-end">
                      ₹ {orderDetails?.order_summary?.total_after_gst}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="my-5">
          {orderDetails?.product_detail?.map((item, index) => {
            const isSelected = selectedProductIds.includes(item.product_id);
            return (
              <>
                <div
                  key={index}
                  className={`border-2 border-[#EBEBEB] mt-5 ${
                    isSelected ? "bg-[#f0f0f0]" : ""
                  }`}
                >
                  <div className="flex flex-wrap gap-4 md:gap-2 justify-between items-center cursor-pointer">
                    <div
                      className="flex gap-3 md:gap-5 xl:gap-[30px] md:flex-1 w-full p-3 sm:p-4 md:p-[30px]"
                      onClick={() => handleProductSelect(item.product_id)}
                    >
                      <div className="flex-shrink-0 w-24 h-28 md:w-[155px] md:h-[195px] ">
                        <img
                          loading="lazy"
                          src={item?.product_images}
                          className="w-full h-full object-top object-cover cursor-pointer"
                          alt=""
                        />
                      </div>
                      <div className="max-w-[620px] w-full">
                        <h3 className="text-lg xs:text-xl md:text-xl !leading-[134%] font-normal text-black mb-3 md:mb-4">
                          {item?.product_name}
                        </h3>
                        <p className="md:text-2xl xl:text-3xl leading-9 font-bold text-black mb-4">
                          {item?.product_sub_total}
                          <span className="text-sm md:text-[15px] !leading-[120%] text-[#828181] font-medium line-through">
                            {" "}
                            MRP:₹{item?.product_mrp}
                          </span>{" "}
                          <span className="block md:inline-block text-sm md:text-[15px] !leading-[120%] text-[#F30404] font-medium">
                            {" "}
                            [{item?.product_discount}% OFF]
                          </span>
                        </p>
                        {item?.stitching_price > 0 ? (
                          <p className="text-lg xs:text-xl md:text-xl !leading-[134%] font-normal text-black mb-3 md:mb-4">
                            Stitching Price: ₹{item.stitching_price}
                          </p>
                        ) : null}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                          <p className="text-sm xs:text-base md:text-lg xl:text-xl !leading-[65%] text-[#312F2F]">
                            Qty:{item?.product_quantity}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
                          <p
                            className={`text-center rounded-[10px] p-1 ${getStatusStyle(
                              item?.status
                            )}`}
                          >
                            {item?.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    {item.status === "complete" && (
                      <div className="buttons flex-shrink-0 w-full md:w-[200px] xl:w-[300px] flex flex-col sm:flex-row md:flex-col gap-4 p-3 sm:p-4 md:p-[30px]">
                        <button className="flex-1 md:flex-auto md:w-full bg-[#E9B159] text-white xl:text-sm !leading-loose font-medium p-2 sm:p-3">
                          Buy it again
                        </button>
                        <button
                          className="flex-1 md:flex-auto md:w-full bg-[#F4F4F4] border border-[#D1D1D1] text-black xl:text-sm !leading-loose font-medium p-2 sm:p-3"
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
        </div>
      </div>
      <div className="flex justify-center mt-3 mb-6">
        <div>
          {orderDetails?.order_detail[0]?.order_status !== "cancel" &&
            orderDetails?.order_detail[0]?.order_status !== "return" &&
            (orderDetails?.order_detail[0]?.order_status === "complete" ? (
              <button
                className="w-full bg-[#E9B159] text-white sm:text-xl md:text-base xl:text-[25px] leading-loose font-medium p-2 sm:p-3"
                onClick={handleReturnButtonClick}
              >
                Return Order
              </button>
            ) : (
              <button
                className="w-full bg-[#E9B159] text-white sm:text-xl md:text-base xl:text-[25px] leading-loose font-medium p-2 sm:p-3"
                onClick={openCancelDialog}
              >
                Order Cancel
              </button>
            ))}
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDialogOpen}
        onClose={submitCancelReason}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow-lg max-w-[400px] w-full">
            <h2 className="text-xl font-bold mb-2 text-center">Cancel Order</h2>
            <div className="text-sm text-center mb-3">
              Do you want to send the item cancellation request?
            </div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Write the reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeCancelDialog}
              >
                Cancel
              </button>
              <button
                className="bg-[#E9B159] text-white px-4 py-2 rounded"
                onClick={submitCancelReason}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={dialogVisible}
        onClose={handleCloseDialog}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-[400px] w-full">
            <h2 className="text-xl mb-4">Reason for Return</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Write the reason for ReturnProduct..."
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              rows="4"
              cols="50"
            />
            <div className="flex justify-end">
              <button
                className="bg-[#E9B159] text-white px-4 py-2 rounded  mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openWriteReview}
        onClose={handleWriteReviewClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="fixed inset-0 px-4 xl:p-0 overflow-y-auto">
          <div className="max-w-[700px] w-full bg-white mx-auto my-5">
            <div className="bg-[#EAEAEA] flex items-center justify-between px-4 sm:px-5 xl:pl-10 xl:pr-[30px] py-3 sm:py-[18px]">
              <h3 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl !leading-none font-jost font-medium text-black">
                Write Review
              </h3>
              <button onClick={handleWriteReviewClose} className="">
                <FaXmark className="text-2xl xl:text-[30px] text-[#716C6C]" />
              </button>
            </div>
            <div className="py-6 sm:py-4 px-4 sm:px-6 lg:px-[55px]">
              <div className="flex items-center gap-2 sm:gap-6 mb-5">
                {productIndex !== null && (
                  <div className="flex items-center gap-2 sm:gap-6">
                    <div className="flex-shrink-0 h-20 w-20 sm:h-[120px] sm:w-[120px]">
                      <img
                        loading="lazy"
                        src={
                          orderDetails?.product_detail[productIndex]
                            ?.product_images
                        }
                        className="h-full w-full object-cover object-top"
                        alt=""
                      />
                    </div>
                    <h4 className="sm:text-[15px] md:text-lg xl:text-lg 2xl:text-2xl !leading-[134%] font-jost text-black max-w-[509px]">
                      {orderDetails?.product_detail[productIndex]?.product_name}
                    </h4>
                  </div>
                )}
                {/* ))} */}
              </div>
              <div className="mb-5 md:mb-8 xl:mb-[10px]">
                <h4 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl !leading-[120%] font-jost font-medium text-black mb-3 lg:mb-5">
                  How would you rate it?
                </h4>
                <Rating
                  className="!text-3xl xl:!text-[30px] text-[#DC9A35]"
                  name="rating"
                  value={value}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5 md:mb-8 xl:mb-[30px]">
                <h4 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl !leading-[120%] font-jost font-medium text-black mb-3 lg:mb-5">
                  Share a video or photo
                </h4>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  {[...images, ...videos].map((file, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-20 h-24 sm:w-[120px] sm:h-[142px] border-[1.5px] border-dashed border-[#BAB8B8] rounded-[3px] relative"
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          loading="lazy"
                          src={URL.createObjectURL(file)}
                          alt={`review-${index}`}
                          width="100"
                          height="100"
                        />
                      ) : (
                        <video width="100" height="100" controls>
                          <source
                            src={URL.createObjectURL(file)}
                            type={file.type}
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <button
                        onClick={() =>
                          file.type.startsWith("image/")
                            ? removeImage(index)
                            : removeVideo(index - images.length)
                        }
                        className="absolute right-2 top-2 bg-white text-[#FF2E2E] rounded-full border-0"
                      >
                        <IoCloseCircleSharp className="text-sm h-full w-full" />
                      </button>
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-20 h-24 sm:w-[120px] sm:h-[142px] grid place-content-center border-[1.5px] border-dashed border-[#BAB8B8] bg-white rounded-[3px] relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <button className="">
                      <AddPhotoIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-5 md:mb-8 xl:mb-[30px]">
                <h4 className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl !leading-[120%] font-jost font-medium text-black mb-3 lg:mb-5">
                  Write your review
                </h4>
                <div className="w-full ">
                  <TextareaAutosize
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                    placeholder="Please write your review here..."
                    sx={{ "&::placeholder": { color: "#858585" } }}
                    className="scrollbar-none w-full !text-lg sm:!text-xl !leading-none font-jost font-normal py-3 sm:p-5 text-black !h-[150px] lg:!h-[221px] max-w-[935px] outline-0 resize-none !overflow-y-auto border-[1.5px] border-[#BAB8B8]"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleSubmitReview}
                  className="max-w-[532px] mx-auto bg-[#E9B159] p-3 xl:p-3 w-full text-lg lg:text-2xl font-medium leading-10 text-center text-white"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Footer /> */}
    </>
  );
};

export default OrderDetailsPage;
