import React, { useEffect, useState } from 'react';
import "../../styles/CheckOutPage.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';
import { GoPencil, GoPlus } from 'react-icons/go';
import { Row, Col, Container } from 'react-bootstrap';
import Payment from './Payment';
import AddressCard from './AddressCard';
import { CashONIcon2, WalletIcon, WalletIcon2 } from '../../assets/SvgIcons';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { STORAGE } from '../../config/config';
import axios from 'axios';
import { API_URL } from '../../constants/constApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { LgBagIcon } from '../../assets/SvgIcons'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, FormControlLabel, InputBase, Radio, RadioGroup } from '@mui/material';
import { debounce } from "lodash";
import { fetchCartItems, updateCartItemThunk } from '../../redux/cart/cartThunk';
import OffCanvasBagCard from '../../components/chekoutcard/OffCanvasBagCard';
import RazorPay from "../../assets/images/RazorPay.png"
import caseondelivery from "../../assets/images/caseondelivery.png"
import SuccessModal from './SuccessModal';

const steps = [
  { id: 'SignUp', label: 'Sign Up', icon: <IoIosCheckmark className="" style={{ fontSize: "500%" }} />, isActive: true },
  { id: 'Address', label: 'Address', icon: <GoPencil className="fs-3" />, isActive: false },
  { id: 'Payment', label: 'Payment', icon: <WalletIcon />, isActive: false },
];

const CheckOutPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Address');
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = React.useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [showCouponcanvas, setShowCouponcanvas] = useState(false); // Address Offcanvas
  const [setCartInfo] = useState({});
  const { cartItems } = useSelector((state) => state.cart);
  const { cartInfo } = useSelector((state) => state.cart);
  const [showCouponCode, setShowCouponCode] = React.useState(false);
  const [itemInfo, setItemInfo] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);



  const navigate = useNavigate();
  const dispatch = useDispatch();


  const toggleAccordion = () => setIsOpen(!isOpen);

  const truncateProductName = (name) => {
    if (name.length > 10) {
      return name.substring(0, 10) + "...";
    }
    return name;
  };

  const truncateProductHeading = (name) => {
    if (name.length > 29) {
      return name.substring(0, 29) + "...";
    }
    return name;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateCart = (cartChildId, quantity) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your cart.");
      return;
    }
    dispatch(updateCartItemThunk(cartChildId, quantity));
  };
  const debouncedUpdateCartItem = debounce(handleUpdateCart, 500);

  const handleContinueSubmit = () => {
    navigate('/checkout-page', { state: { activeTab: 'Payment' } });
  };

  //Coupon
  const handleShowCouponcanvas = () => {
    
    setShowCouponcanvas(true);
  };
  const handleCloseCouponcanvas = () => {
    setShowCouponcanvas(false);
  };

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <Link to="" key="2" className="text-dark fw-light text-decoration-none">
      Bag
    </Link>,
    <span key="3" className="text-dark fw-light">
      Checkout
    </span>,
  ];

  const handleTabClick = (stepId) => {
    if (stepId !== 'SignUp') {
      setActiveTab(stepId);
    }
  };

  const paymentMethods = [
    {
      label: "COD (Cash on Delivery)",
      value: "cod",
      image: caseondelivery,
    },
    {
      label: "Razor Pay",
      value: "razorpay",
      image: RazorPay,
    },
  ];

  const onSubmit = (data) => {
    saveAddress(data);
  };

  const cartItem = useSelector((state) => state.cart.cartItems);

  const handleOrderSummary = async (addressId) => {
    try {
      const userProfile = JSON.parse(localStorage.getItem(STORAGE.USERDETAIL));
      const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
      const { data } = await axios.post(`${API_URL}order_summary`, {
        device_id: deviceId,
        is_admin: 0,
        is_mobile: 1,
        user_type: userProfile?.user_type,
        payment_from: "app",
        payment_method: paymentMethods[0].value,
        payment_reference_number: "",
        address_id: addressId,
        user_id: userProfile ? userProfile.id : "",
        total_weight: cartItem,
      });

      // console.log("Response from server:", data);

      if (data?.STATUS === 200) {
        const shippingDetails = data?.DATA?.shipping_details;
        setCartInfo(shippingDetails);
        // console.log("Shipping Details:", shippingDetails);
      } else if (data?.STATUS === 400) {
        console.error("Error:", data?.MESSAGE);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing COD payment:",
        error.message
      );
    }
  };

  const schema = yup.object().shape({
    address_pincode: yup.string().required("Pincode is required"),
    address_landmark: yup.string().required("Landmark is required"),
    address_country: yup.string().required("Country is required"),
    address_city: yup.string().required("City is required"),
    address_state: yup.string().required("State is required"),
    address_flate_house_company: yup
      .string()
      .required("House/Flat/Office No. is required"),
    address_area_street_village: yup
      .string()
      .required("Road Name/Area/Colony is required"),
    address_name: yup.string().required("Name is required"),
    address_mobile: yup
      .string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  });

  const defaultValues = {
    address_pincode: "",
    address_flate_house_company: "",
    address_area_street_village: "",
    address_is_default: "0",
    address_name: "",
    address_mobile: "",
    address_country: "",
    address_state: "",
    address_city: "",
    address_landmark: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const toggleAddressDrawer = (newOpen) => () => {
    !newOpen && reset();
    setShowAddressForm(newOpen);
  };

  const toggleCouponCodeDrawer = (newOpen) => () => {
    !newOpen && reset();
    setShowCouponCode(newOpen);
  };
  async function saveAddress(data) {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    const toastId = toast.loading("saving...");
    try {
      const { data: saveAddressData } = await axios.post(`${API_URL}saveaddress`, {
        ...data,
        user_id: localStorage.getItem("userId") || userProfile?.id,
      });

      if (saveAddressData && saveAddressData?.STATUS === 200) {
        await fetchAddresses();
        setShowAddressForm(false);
        // reset();
        toast.success("Address saved.");
        // console.log("ahahhah::", saveAddress);
      } else if (saveAddressData && saveAddressData?.STATUS === 400) {
        // console.log("kkmkmkmk:", saveAddressData.DATA);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.MESSAGE || "Failed to save address.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    toast.success("Your Address Add Successful");
    handleOrderSummary(address.address_id);
  };

  const handleactivepayment = () => {
    if (!selectedAddress) {
      toast.error(
        "please add address or click on delivery here to select address"
      );
    } else {
      setActiveTab("Payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ------------------------------ Payment & Coupon Code Concept Start ------------------------------------
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleCodPayment = async () => {
    try {
      const userProfile = JSON.parse(localStorage.getItem(STORAGE.USERDETAIL));
      const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
      const response = await axios.post(`${API_URL}saveorder`, {
        device_id: deviceId,
        is_admin: 0,
        is_mobile: 1,
        user_type: "btoc",
        payment_from: "app",
        payment_method: paymentMethods[0].value,
        shipping_name: selectedAddress ? selectedAddress.address_name : "",
        shipping_mobile: selectedAddress ? selectedAddress.address_mobile : "",
        shipping_flate_house_company: selectedAddress
          ? selectedAddress.address_flate_house_company
          : "",
        shipping_area_street_village: selectedAddress
          ? selectedAddress.address_area_street_village
          : "",
        shipping_landmark: selectedAddress
          ? selectedAddress.address_landmark
          : "",
        shipping_pincode: selectedAddress
          ? selectedAddress.address_pincode
          : "",
        shipping_city: selectedAddress ? selectedAddress.address_city : "",
        shipping_state: selectedAddress ? selectedAddress.address_state : "",
        shipping_country: selectedAddress
          ? selectedAddress.address_country
          : "",
        user_id: userProfile ? userProfile.id : "",
        code: userProfile?.user_refer_id,
        total_weight: cartItem,
      });

      if (response.data.STATUS === 200) {
        toast.success(response.data.MESSAGE);
        setModalMessage(response.data.MESSAGE);
        setOpenModal(true);
      } else if (response.data.STATUS === 400) {
        // console.error("COD payment failed:");
        toast.error(response.data.MESSAGE);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing COD payment:",
        error.message
      );
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (selectedPaymentMethod === "cod") {
      handleCodPayment();
      setIsButtonDisabled(true);
      localStorage.removeItem("selectedAddress");
    } else if (selectedPaymentMethod === "razorpay") {
      localStorage.removeItem("selectedAddress");
    }
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].value
  );

  const [couponData, setCouponData] = useState([]);
  const [selectedCodeName, setSelectedCodeName] = useState("");
  const fetchCouponCode = async () => {
    try {
      const response = await axios.get(`${API_URL}/allcoupan`);
      if (response.data.STATUS === 200) {
        setCouponData(response.data.DATA.coupon_banner);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the coupon code:",
        error.message
      );
    }
  };
  const handleCodeSelection = (codeName) => {
    setSelectedCodeName(codeName);
    setShowCouponCode(false);
  };
  useEffect(() => {
    fetchCouponCode();
  }, []);

  useEffect(() => { }, [couponData, selectedCodeName]);

  const verifyCouponCode = () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (selectedCodeName && userProfile) {
      axios
        .post(`${API_URL}/verifycode`, {
          device_id: localStorage.getItem(STORAGE?.DEVICEID),
          user_id: userProfile.id,
          coupon_code: selectedCodeName,
        })
        .then((response) => {
          if (response.data.STATUS === 200) {
            toast.success(response.data.MESSAGE);
            setCartInfo((prevCartInfo) => ({
              ...prevCartInfo,
              applied_coupon_code: response.data.coupon_code,
              applied_coupon_amount: response.data.coupon_amount,
              total_discount_amount: response.data.discount_amount,
            }));
            window.location.reload();
          }
          if (response?.data?.STATUS === 400) {
            toast.error(response?.data?.MESSAGE);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      console.error("User profile or selected code name is missing.");
    }
  };
  // ------------------------------ Payment & Coupon Code Concept End ------------------------------------


  const renderActiveView = () => {
    switch (activeTab) {
      case "Address":
        return (
          <>
            <Container>
              <Row>
                <Col xxl={7} xl={7} md={7} sm={12} xs={12}>
                  <h3 className="font-medium">Choose Address</h3>
                  <p>Detailed address will help our delivery partner reach your <br /> doorstep quickly</p>
                  {addresses?.map((address, index) => (
                    <AddressCard
                      key={"address" + index}
                      info={address}
                      fetchAddresses={fetchAddresses}
                      onSelectAddress={handleSelectedAddress}
                    />
                  ))}

                  {/* Add New Address Button */}
                  <div className="col-md-6 mb-4">
                    <div
                      className="card border p-3 d-flex align-items-center justify-content-center bg-white btn"
                      style={{ height: '100%', borderRadius: "10px" }}
                      // onClick={handleShowAddresscanvas}
                      onClick={() => {
                        setShowAddressForm(true);
                      }}
                    >
                      <span className="d-block mb-3 text-center">
                        <GoPlus className="fs-1 text-dark mx-auto" />
                      </span>
                      <h3 className="fs-5 text-center m-0 ">Add New Address</h3>
                    </div>
                  </div>
                </Col>
                {/* ------------------------------ Bag Concept Start---------------------------- */}
                <Col xxl={5} xl={5} md={5} sm={12} xs={12}>
                  {addresses.length > 0 && addresses[0]?.address_id ? (
                    <Container fluid>
                      <Row>
                        <Col>
                          <div className="card border p-3 web-bg-color">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4><LgBagIcon className="fs-2" /> Bag</h4>
                              <h4> {cartInfo?.cartcount} Items</h4>
                            </div>
                            {cartInfo?.cartdata?.map((item) => {
                              return (
                                <OffCanvasBagCard
                                  key={"cartItem" + item?.id}
                                  info={item}
                                  cartId={cartInfo?.cart_id}
                                  fetchCartItems={fetchCartItems}
                                />
                              )
                            })}

                            {/* ++++ Coupon Part ++++ */}
                            <hr />

                            <div className="accordion-container border-0 shadow-none rounded-3 my-0">
                              {/* Accordion Header */}
                              <div
                                className={`accordion-header d-flex align-items-center justify-content-between p-3 rounded `}
                                style={{ cursor: "pointer" }}
                                onClick={toggleAccordion}
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={require("../../assets/images/coupon.png")}
                                    alt="Coupon Icon"
                                    className="icon"
                                    style={{ width: "1.5rem" }}
                                  />
                                  <span className="fs-5 fw-medium">Coupon Code</span>
                                </div>
                                <div>
                                  {isOpen ? (
                                    <IoIosArrowUp size={24} className="text-dark" />
                                  ) : (
                                    <IoIosArrowDown size={24} className="text-dark" />
                                  )}
                                </div>
                              </div>

                              {/* Accordion Content */}
                              {isOpen && (
                                <div className="accordion-body rounded border-0">
                                  <div className="d-flex justify-content-between align-items-center rounded-5 px-3">
                                    <div style={{ width: "75%" }}>
                                      <input
                                        type="text"
                                        className="form-control border rounded-5"
                                        placeholder="Enter Coupon Code"
                                        value={selectedCodeName}
                                        onChange={(e) =>
                                          setSelectedCodeName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div style={{ width: "22%" }}>
                                      {selectedCodeName === "" ? (
                                        <button
                                          className="btn btn-dark  w-100 text-white fw-bold rounded-5"
                                          onClick={() =>
                                            setShowCouponCode(true)
                                          }
                                        >
                                          Select Coupon
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-dark  w-100 text-white fw-bold rounded-5"
                                          onClick={verifyCouponCode}
                                        >
                                          Apply
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>


                            {/* ++++ Price Details ++++ */}
                            <hr />
                            <div className="mb-2">
                              <div>
                                <h4 className="fw-bold" style={{ fontSize: "22px", marginBottom: "12px", fontWeight: "500", lineHeight: "1", }}>
                                  <HiOutlineCurrencyRupee className="fs-4" /> Price Details
                                </h4>
                              </div>
                              <div style={{ padding: "10px" }}>
                                <h5
                                  style={{
                                    fontSize: "20px",
                                    marginBottom: "12px",
                                    fontWeight: "500",
                                    lineHeight: "1",
                                  }}
                                >
                                  Price Summary
                                </h5>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555", }}>
                                    Bag Total
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo?.total_gross_amount || 0}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    Coupon
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo.applied_coupon_code ? cartInfo.applied_coupon_code : "0"}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    GST {cartInfo?.gst_percentage}%
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo?.gst_amount || 0}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p
                                    style={{
                                      fontSize: "1.2rem", marginBottom: "0.1rem",
                                      paddingTop: "10px",
                                      fontWeight: "600",
                                      color: "#03A685",
                                    }}
                                  >
                                    You Pay
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "1.2rem", marginBottom: "0.1rem",
                                      paddingTop: "10px",
                                      fontWeight: "600",
                                      color: "#03A685",
                                    }}
                                  >
                                    ₹{cartInfo?.total_net_amount || 0}
                                  </p>
                                </div>
                              </div>

                              {/* <button type="button mt-3" className="btn-payment w-100" onClick={handleContinueSubmit}> */}
                              <button type="button mt-3" className="btn-payment w-100"
                                onClick={handleactivepayment}
                              >
                                Continue
                              </button>
                            </div>
                          </div>


                        </Col>
                      </Row>
                      {/* <CouponCanva show={showCouponcanvas} handleClose={handleCloseCouponcanvas} /> */}

                    </Container>
                  ) : (
                    ""
                  )}
                </Col>

                {/* ------------------------------ Bag Concept End---------------------------- */}
              </Row>
            </Container >
          </>
        );

      case "Payment":
        const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
        const filteredPaymentMethods = paymentMethods;
        return (
          <>
            {activeTab === "Payment" && (
              <>
                <Container className="mt-4 px-lg-5 px-xl-5 px-xxl-5">
                  <Container className="px-lg-5 px-xl-5 px-xxl-5">
                    <Row className="px-lg-5 px-xl-5 px-xxl-5">
                      <Row className="px-lg-5 px-xl-5 px-xxl-5">
                        <div class="d-flex justify-content-between flex-wrap mt-4 mb-5">
                          {/* Price Details card */}
                          <Col sm={12} xs={12} lg={5} xxl={5} xl={5} >
                            <div style={{ padding: "20px", borderRadius: "15px", backgroundColor: "#F3F3F3" }} className="mb-2">
                              <div>
                                <h4 className="fw-bold" style={{ fontSize: "22px", marginBottom: "12px", fontWeight: "500", lineHeight: "1", }}>
                                  <HiOutlineCurrencyRupee className="fs-4" /> Price Details
                                </h4>
                              </div>
                              <div style={{ padding: "10px" }}>
                                <h5
                                  style={{
                                    fontSize: "20px",
                                    marginBottom: "12px",
                                    fontWeight: "500",
                                    lineHeight: "1",
                                  }}
                                >
                                  Price Summary
                                </h5>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555", }}>
                                    Bag Total
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo?.total_gross_amount || 0}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    Coupon
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo.applied_coupon_code ? cartInfo.applied_coupon_code : "0"}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    GST {cartInfo?.gst_percentage}%
                                  </p>
                                  <p style={{ fontSize: "1.2rem", marginBottom: "0.1rem", fontWeight: "400", color: "#555555" }}>
                                    ₹{cartInfo?.gst_amount || 0}
                                  </p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p
                                    style={{
                                      fontSize: "1.2rem", marginBottom: "0.1rem",
                                      paddingTop: "10px",
                                      fontWeight: "600",
                                      color: "#03A685",
                                    }}
                                  >
                                    You Pay
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "1.2rem", marginBottom: "0.1rem",
                                      paddingTop: "10px",
                                      fontWeight: "600",
                                      color: "#03A685",
                                    }}
                                  >
                                    ₹{cartInfo?.total_net_amount || 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Col>

                          {/* Payment card */}
                          <Col sm={12} xs={12} lg={6} xxl={6} xl={6}>
                            <div style={{ padding: "20px", borderRadius: "15px", backgroundColor: "#F3F3F3" }} className="">
                              <div >
                                <div className="px-3">
                                  <div className="mb-2">
                                    <h5 className=""> <WalletIcon2 />  Payment Method</h5>
                                  </div>
                                </div>
                                <div className="px-3">
                                  <img src="/images/map-address.png" alt="" />
                                </div>
                              </div>
                              <RadioGroup
                                aria-labelledby="payment-method-label"
                                onChange={(e) =>
                                  setSelectedPaymentMethod(e.target.value)
                                }
                                name="payment-method-group"
                              >
                                {filteredPaymentMethods.map((method, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between align-items-center gap-4 p-3 bg-white mb-2 rounded"
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={method.image}
                                        alt={method.label}
                                        className="bg-design"
                                        style={{ width: "60px", height: "60px" }}
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="flex-grow-1">
                                      <h6 className="h5 mb-3 fw-medium m-0">{method.label}</h6>
                                    </div>
                                    <FormControlLabel
                                      value={method.value}
                                      control={
                                        <Radio
                                          sx={{
                                            "&.Mui-checked": {
                                              color: "#000000",
                                            },
                                          }}
                                          className="gap-3"
                                        />
                                      }
                                      label=""
                                    />
                                  </div>

                                ))}
                              </RadioGroup>
                              <div>
                                <button
                                  type="button mt-3"
                                  className="btn-payment w-100"
                                  fullWidth
                                  size="large"
                                  onClick={handlePayment}
                                  disabled={isButtonDisabled}
                                >
                                  Payment
                                </button>
                                <SuccessModal
                                  open={openModal}
                                  onClose={handleCloseModal}
                                  message={modalMessage}
                                />
                              </div>
                            </div>
                          </Col>
                        </div>
                      </Row>
                    </Row>
                  </Container>
                </Container>
              </>
            )
            }
          </>
        )

      default:
        return null;
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  // Fetch Address Start --------------------------------------------------------------------------------------
  const fetchAddresses = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      const { data } = await axios.get(`${API_URL}myaddress`, {
        params: {
          user_id: userProfile?.id,
          limit: "20",
          pageno: "1",
        },
      });
      if (data && data?.STATUS === 200) {
        setAddresses(data?.DATA || []);
        // console.log("address", addresses);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.MESSAGE || "Failed to fetch addresses.");
    }
  };
  // Fetch Address End--------------------------------------------------------------------------------------

  useEffect(() => {
    fetchAddresses();
    window.scrollTo(0, 0);
  }, []);


  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container className="my-5">
        <Row className="w-100 align-items-center mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Col

                className={`d-flex align-items-center gap-2 justify-content-center text-center ${step.id === 'SignUp' || activeTab === step.id ? 'text-dark' : 'text-muted'
                  }`}
                onClick={() => handleTabClick(step.id)}
                style={step.id === 'SignUp' ? { cursor: 'pointer' } : {}}
              >
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle ${step.id === 'SignUp'
                    ? 'bg-dark text-white'
                    : activeTab === step.id
                      ? 'bg-dark text-white'
                      : 'bg-secondary text-white'
                    }`}
                  style={{
                    width: '10vw',
                    height: '10vw',
                    maxWidth: '60px',
                    maxHeight: '60px',
                  }}
                >
                  {step.icon}
                </div>
                <span className="fs-4 fw-medium">{step.label}</span>
              </Col>
              {index < steps.length - 1 && (
                <Col xs={2} md={2} sm={2} className="px-0 d-flex align-items-center justify-content-center">
                  <span
                    className="d-block w-100"
                    style={{
                      height: '3px',
                      borderTop: activeTab === steps[index + 1]?.id ? '3px dashed black' : '3px dashed rgba(150, 150, 150, 1)',
                    }}
                  />
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>

        <div>{renderActiveView()}</div>
      </Container>

      <Drawer
        open={showAddressForm}
        onClose={toggleAddressDrawer(false)} // Pass the function, not its result
        anchor="right"
      >
        <Box
          role="presentation"
          className="scrollbar "
        >
          <div style={{ maxWidth: "450px", width: "100vw" }}>
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3">
              <h3 className="h3">
                New Address
              </h3>
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  setShowAddressForm(false);
                }}
              >
                <IoIosClose size={40} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-100"
            >
              <div className="p-3 overflow-auto h-100">
                <div className="grid gap-3">
                  <div className="w-100">
                    <Controller
                      name="address_country"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Country"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_country?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_name"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Full Name"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors?.address_name?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_mobile"
                      control={control}
                      rules={{
                        required: "Mobile number is required",
                        validate: (value) => {
                          const regex = /^[0-9]{10}$/;
                          if (!regex.test(value)) {
                            return "Mobile number must be exactly 10 digits";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            placeholder="Mobile Number"
                            className="form-control web-bg-color p-2 Address-Form "
                            maxLength={10}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            }}
                          />
                          <p className="text-danger">
                            {errors?.address_mobile?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_flate_house_company"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Flat,House,No,Building"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_flate_house_company?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_area_street_village"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Area,Street,Village"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_area_street_village?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_landmark"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Landmark"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_landmark?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_pincode"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Pincode"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                              type="number"
                            />
                            <p className="text-danger">
                              {errors.address_pincode?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_city"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="Town/City"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_city?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Controller
                      name="address_state"
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <input
                              placeholder="State"
                              className="form-control web-bg-color p-2  Address-Form"
                              {...field}
                            />
                            <p className="text-danger">
                              {errors.address_state?.message}
                            </p>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <button type="submit"
                  className="btn-payment w-100">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Drawer>

      <Drawer open={showCouponCode} onClose={toggleAddressDrawer(false)} anchor="right">
        <div className="overflow-auto" style={{ maxWidth: "450px", width: "100vw" }}>
          <div className="w-100 h-100 bg-white position-absolute top-0 end-0">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary p-3">
              <h3 className="fs-4 fw-medium m-0">Coupon</h3>
              <button className="btn p-0" onClick={() => setShowCouponCode(false)}>
                <IoIosClose size={40} />
              </button>
            </div>

            {/* Content */}
            <div className="p-3">
              {couponData.length > 0 ? (
                couponData.map((code, index) => (
                  <div key={index} className="border border-2 border-secondary mb-2 p-2">
                    <div className="d-flex w-100">
                      {/* Coupon label */}
                      <div className="bg-danger bg-opacity-25 px-3 py-1 fw-bold position-relative rounded-end w-30 text-center text-danger text-capitalize">
                        {truncateProductName(code?.title || "")}
                        <img className="position-absolute"
                          // src={shoppingBag}
                          style={{ width: "20px", top: "5px", left: "10px" }}
                          loading="lazy" />
                        <img className="position-absolute"
                          // src={shopCart}
                          style={{ width: "20px", top: "15px", right: "10px", transform: "rotate(45deg)" }}
                          loading="lazy" />
                        <img
                          className="position-absolute"
                          style={{ width: "30px", bottom: "0", left: "0" }}
                          // src={shopBag}
                          loading="lazy" />
                      </div>

                      {/* Coupon Details */}
                      <div className="d-flex flex-column justify-content-center w-50 ps-2">
                        <div className="fw-bold text-dark">{truncateProductHeading(code?.heading || "")}</div>
                        <div className="text-muted small">Use Code: {code?.name}</div>
                      </div>

                      {/* Copy Button */}
                      <div className="d-flex align-items-center">
                        <button className="btn btn-dark text-white fw-bold px-3 py-1 rounded" onClick={() => handleCodeSelection(code?.name)}>
                          COPY
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No coupons available</p>
              )}
            </div>
          </div>
        </div>
      </Drawer>;

    </>
  );
};

export default CheckOutPage;
