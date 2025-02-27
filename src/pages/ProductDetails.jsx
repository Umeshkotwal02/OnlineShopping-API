import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddCartProDetIcon, CashOnDelIcon, ExchangeIcon, ShippingIcon, StitchingIcon, } from "../assets/SvgIcons";
import Breadcrumb from "../components/Breadcrumb";
import { Accordion } from 'react-bootstrap';
import { FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import { RiHeartAddLine } from "react-icons/ri";
import { Row, Col, Button, Tooltip, OverlayTrigger, Container } from "react-bootstrap";
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegCircleCheck, FaHeart } from "react-icons/fa6";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import axios from "axios";
import { STORAGE } from "../config/config";
import QuantityCounter from "./ProductDetailsPage/QuantityCounter";
import ProductDetailsSlider from "./ProductDetailsPage/ProductDetailsSlider";
import { API_URL } from "../constants/constApi";
import Loader from "../components/Loader";
import SimilarProduct from "../components/SimilarProduct";
import "../styles/ProductDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartThunk";
import { addToWishlist, removeFromWishlist } from "../redux/wishlist/wishlistThunk";
import CustomerReviewSection from "./ProductDetailsPage/CustomerReviewSection";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 25,
  border: "1px solid #B0B0B0",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 25,
    backgroundColor: "#11B455",
  },
}));

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [productInfo, setProductInfo] = useState([]);
  const [stitchingOptions, setStitchingOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const { setShowLogin } = useContext(LoginDrawerContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductInfo = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}productdetail`, {
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        product_quantity: quantity || 1,
        is_mobile: "0",
        product_id: id,
        is_admin: "0",
      });

      if (data && data?.STATUS === 200) {
        setProductInfo(data?.DATA);

        setStitchingOptions(data?.DATA?.stiching_price);
        if (data?.DATA?.colorist_images?.length > 0) {
          const firstColor = data?.DATA?.colorist_images[0];
          setSelectedColor(firstColor.varient_name);
          setSelectedColorImages(firstColor.multiple_image);
        } else {
          setSelectedColorImages(data?.DATA?.default_images);
        }
      }
      // console.log("productInfo", data?.DATA);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [activeKey, setActiveKey] = useState("0");

  useEffect(() => {
    if (id) {
      fetchProductInfo();
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <Link to="/products-page" key="2" className="text-dark fw-light text-decoration-none">
      Product Page
    </Link>,
    <span key="2" className="text-dark fw-light">
      Product Details Page
    </span>
  ];

  const colorOptions = [
    {
      color: "purple",
      image: "/images/products/purplecholi.jpeg",
    },
    {
      color: "black",
      image: "/images/products/blackcholi.jpeg",
    },
    {
      color: "blue",
      image: "/images/products/bluecholi.jpeg",
    },
    {
      color: "orange",
      image: "/images/products/orangecholi.jpeg",
    },
    {
      color: "green",
      image: "/images/products/greencholi.jpeg",
    },
  ];

  const bagShowOff = [
    {
      icon: <CashOnDelIcon />,
      title: "CASH ON DELIVERY",
    },
    {
      icon: <ExchangeIcon />,
      title: "SIMPLE EXCHANGE",
    },
    {
      icon: <StitchingIcon />,
      title: "SIMPLE EXCHANGE",
    },
    {
      icon: <ShippingIcon />,
      title: "SIMPLE EXCHANGE",
    },
  ];
  const [openWriteReview, setOpenWriteReview] = useState(false);
  const handleWriteReviewOpen = () => setOpenWriteReview(true);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [ratingValue, setRatingValue] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const handleWishlistToggle = (productId) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
    setIsWishlisted(!isWishlisted);
  };

  const isLoggedIn = localStorage.getItem(STORAGE?.ISLOGIN);
  useEffect(() => {
    if (productInfo?.is_wishlist) setIsWishlisted(true);
    else setIsWishlisted(false);
  }, [productInfo]);

  const handleAddToCartClick = (productId, stitchingOptions = []) => {
    if (!productId) {
      toast.error("Product ID is required.");
      return;
    }
    dispatch(addToCart(productId, quantity, stitchingOptions));
  };

  // const [stitchingValue, setStitchingValue] = useState(0);
  const [stitchingValue, setStitchingValue] = useState("");
  const [stitchingPrice, setStitchingPrice] = useState(0);

  useEffect(() => {
    if (stitchingOptions && stitchingOptions.length > 0) {
      setStitchingValue(stitchingOptions[0].label);
      setStitchingPrice(stitchingOptions[0].price);
    }
  }, [stitchingOptions]);

  const handleChange = (event) => {
    const selectedOption = stitchingOptions.find(
      (option) => option.label === event.target.value
    );
    setStitchingValue(event.target.value);
    setStitchingPrice(selectedOption?.price || 0);
  };


  // ------------------- privacy-policy Start ------------------------

  const [policy, setPolicy] = useState({});

  const fetchpolicyApi = async () => {
    try {
      const response = await axios.get(`${API_URL}Infopages`);
      setPolicy(response.data.DATA);
    } catch (error) {
      console.error("There was an error fetching the policy!", error);
    }
  };
  useEffect(() => {
    fetchpolicyApi();
  }, []);

  // ------------------- privacy-policy End ------------------------

  // ------------------- Coupon Start ------------------------------

  const [showAllOffers, setShowAllOffers] = useState(false);

  const availableOffers = productInfo?.available_offers || [];

  const visibleOffers = showAllOffers
    ? availableOffers
    : availableOffers.slice(0, 2);

  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Code copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy code.");
      });
  };
  /*---------------------- Coupon _end ---------------------- */



  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const stickyStyle = isLargeScreen
    ? {
      position: "sticky",
      top: "133px",
      height: "max-content",
      zIndex: 2,
    }
    : {};

  const truncateProductName = (name) => {
    if (name.length > 8) {
      return name.substring(0, 8) + "";
    }
    return name;
  };

  const truncateProductHeading = (name) => {
    if (name.length > 29) {
      return name.substring(0, 29) + "...";
    }
    return name;
  };

  const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
  useEffect(() => {
    // dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <>
      {loading && (
        <Loader />
      )}
      <Breadcrumb list={breadcrumbArray} />
      <Container>
        <Row className="d-flex flex-wrap py-sm-0 py-md-2 py-lg-3 py-xl-3 py-xxl-3">
          <Col lg={6}
            style={stickyStyle}
            className="px-0"
          >
            <div className="w-100">
              <ProductDetailsSlider images={selectedColorImages} />
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <h4 className="text-capitalize product-details-name">{productInfo?.product_name}</h4>
              <p style={{ color: "#555555", fontSize: "1rem" }} className="text-capitalize">
                {productInfo?.product_detail}
              </p>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="border border-dark rounded px-2 py-1 d-flex align-items-center fw-bold">
                  <span> {parseFloat(productInfo?.average_rating).toFixed(1)}</span>
                  <TiStarFullOutline className="ms-2" />
                </div>
                <p className="mx-2 text-center m-0 fw-medium" style={{ color: "#555555" }}>Based on {productInfo?.total_rating} ratings</p>
              </div>

              {/* Price */}
              <div className="mb-4 common-border">
                <h3>
                  ₹{productInfo?.product_price}{" "}
                  <span className="text-success ms-2">
                    {productInfo?.product_discount}% Off
                  </span>
                </h3>
                <p className="my-2" style={{ color: "#555555", fontSize: "1.3rem" }}>
                  Inclusive of all taxes
                </p>
              </div>
              {Boolean(productInfo?.colorist_images?.length) && (
                <div>
                  {/* Divider */}
                  <div className="border-bottom my-2" style={{ borderColor: "#acacac" }}></div>

                  {/* Select Color Header */}
                  <div className="my-4 fw-medium fs-4 text-dark">
                    Select Color
                  </div>

                  {/* Color Options */}
                  <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                    {productInfo?.colorist_images?.map((item, index) => {
                      return (
                        <div
                          className="position-relative border border-3"
                          style={{
                            height: "110px",
                            width: "80px",
                            maxWidth: "130px",
                            maxHeight: "160px",
                            cursor: "pointer",
                          }}
                          key={item.varient_name}
                          onClick={() => {
                            setSelectedColor(item.varient_name);
                            setSelectedColorImages(item.multiple_image);
                          }}
                        >
                          <img
                            src={item.multiple_image[0]}
                            alt=""
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                          <p className="text-center text-capitalize mt-2">
                            {item.varient_name}
                          </p>
                          {selectedColor === item.varient_name && (
                            <div
                              className="position-absolute top-0 end-0 w-100 h-100 d-flex align-items-center justify-content-end"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                padding: "0.5rem",
                              }}
                            >
                              <FaRegCircleCheck className="text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {userProfile?.user_type === "btoc" ? (
                <>
                  <div className="mb-3">
                    <h4
                      className="my-3 text-xl font-medium text-black"
                    >
                      Available Offers:
                    </h4>
                    {visibleOffers.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="mb-2 coupon-card"
                          style={{ borderColor: "#e1e1e1" }}
                        >
                          {/* Left Rounded Gap */}
                          <div className="ticket-hole left"></div>

                          {/* Right Rounded Gap */}
                          <div className="ticket-hole right"></div>

                          <div className="d-flex w-100">
                            <Col xs={3} className="text-center rounded-end">
                              <div className="text-white rounded">
                                <img
                                  src={require("../assets/images/ProductDetails/discount-bag.png")}
                                  alt="Product"
                                  className="discount-bag"
                                />
                              </div>
                            </Col>
                            <Col
                              xs={6}
                              className="d-flex flex-column justify-content-center align-items-start text-responsive"
                            >
                              <div className="coupon-heading-text fw-bold text-dark text-capitalize text-start">
                                {truncateProductHeading(item?.heading || "")}
                                <span className="mx-2">{truncateProductName(item?.title || "")}</span>
                              </div>
                              <h5
                                className="text-muted text-sm text-center"
                                style={{ color: "#515151" }}
                              >
                                Use Code: {item?.name}
                              </h5>
                            </Col>
                            <Col xs={2} className="d-flex justify-content-center align-items-center">
                              <button className="coupon-btn" onClick={() => handleCopy(item?.name)}>
                                COPY
                              </button>
                            </Col>
                          </div>
                        </div>

                      );
                    })}
                    {!showAllOffers && availableOffers.length > 2 && (
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={() => setShowAllOffers(true)}
                          className="btn btn-light text-dark text-xs font-weight-bold px-4 py-2 rounded-3 mt-2"
                          style={{ backgroundColor: "#f1f1f1" }}
                        >
                          See All Offers
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}

              {/* Lehenga Choli: */}
              <div className="mb-3">
                <h5 className="my-2 fw-medium text-black">
                  Lehenga Choli:
                </h5>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={stitchingValue}
                  onChange={handleChange}
                >
                  {stitchingOptions &&
                    stitchingOptions.map((stitching, index) => {
                      return (
                        <div
                          key={"stitching-" + index}
                          className="d-flex align-items-center justify-content-between text-capitalize"
                        >
                          <FormControlLabel
                            value={stitching?.label}
                            control={
                              <Radio
                                sx={{
                                  "&.Mui-checked": {
                                    color: "#000000",
                                  },
                                }}
                              />
                            }
                            label={stitching?.label}
                            checked={stitching?.label === stitchingValue}
                          />
                          <div className="fw-normal text-muted text-end">
                            ₹{stitching?.price}
                          </div>
                        </div>
                      );
                    })}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <h5 className="fw-medium text-black mb-0">
                  Quantity:
                </h5>
                <QuantityCounter
                  onChange={(value) => setQuantity(value)}
                  quantity={quantity}
                />
              </div>

              <Row className="gy-3">
                <Col md={5} lg={2} xl={12} xxl={2} className="d-none d-lg-block">
                  <Button
                    variant=""
                    className="w-100"
                    style={{
                      backgroundColor: "#EDEDED", borderRadius: "5px",
                      border: "none",
                      width: "100%",
                      paddingBottom: "0.8rem",
                      paddingTop: "0.8rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleWishlistToggle(productInfo?.id || productInfo?.product_id);
                    }}
                  >
                    {isWishlisted ? (
                      <FaHeart className="icon heart-icon" />
                    ) : (
                      <RiHeartAddLine className="icon fs-4" />
                    )}
                  </Button>
                </Col>

                {/* Add-to-Cart Button */}
                <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} className="gap-3 ">
                  <Button
                    className="w-100 btn gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (isLoggedIn) {
                        handleAddToCartClick(productInfo?.product_id, productInfo?.quantity || productInfo?.id);
                      } else {
                        // setShowLogin(true);
                        toast.error("Please log in to manage your Add To Cart.");
                      }
                    }}
                    style={{
                      backgroundColor: "#B51B3B",
                      borderRadius: "5px",
                      border: "none",
                      width: "100%",
                      paddingBottom: "0.8rem",
                      paddingTop: "0.8rem",
                      display: "flex",
                      justifyContent: "center", // Centers horizontally
                      alignItems: "center", // Centers vertically
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>
                      <AddCartProDetIcon />
                    </span>
                    Add to Bag
                  </Button>
                </Col>

                <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5}>
                  <Button className="btn justify-content-centre"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (isLoggedIn) {
                        handleAddToCartClick(productInfo?.product_id, productInfo?.quantity || productInfo?.id);
                        // handleAddToCartClick(productInfo?.id || productInfo?.product_id, productInfo?.stitchingOptions, productInfo?.quantity);
                        navigate("/checkout-page");
                      } else {
                        // setShowLogin(true);
                        toast.error("Please log in to Buy Product.");
                      }
                    }}
                    style={{
                      backgroundColor: "#03A685", borderRadius: "5px",
                      border: "none",
                      width: "100%",
                      paddingBottom: "0.8rem",
                      paddingTop: "0.8rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    Buy Now
                  </Button>
                </Col>
              </Row>

              <div className="border-bottom my-3" style={{ borderColor: "#ACACAC", fontSize: "1px" }}></div>

              <Container className="py-3 mb-4 rounded" style={{ backgroundColor: "#EDEDED" }}>
                <Row className="d-flex justify-content-between align-items-center">
                  {bagShowOff.map((item, index) => (
                    <Col
                      key={index}
                      className="text-center d-flex flex-column align-items-center"
                    >
                      <div
                        className="icon mb-2 d-flex justify-content-center align-items-center product-details-bagShowOff"
                      >
                        {item.icon}
                      </div>
                      <div className="text-sm text-uppercase fw-medium product-details-bagShowOff-text" >
                        {item.title}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
              <div>
                <h5 className="fw-bold fs-5 text-black mb-2 text-capitalize">
                  Product Information
                </h5>

                {/* Accordion 1 */}
                <Accordion activeKey={activeKey}
                  onSelect={(key) => setActiveKey(key)}
                  className="shadow-none bg-none">
                  <Accordion.Item eventKey="panel1">
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={require("../assets/images/ProductDetails/boxicon2.png")}
                          alt=""
                          className="img-fluid"
                          style={{ width: "40px", height: "40px" }}
                          loading="lazy"
                        />
                        <div>
                          <h4 className="fw-bold fs-5 text-capitalize text-black mb-1">
                            Product Details
                          </h4>
                          <p className="text-muted text-sm mb-0 text-capitalize">
                            Care instructions, Pack contains
                          </p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="ps-3 ps-md-5">
                        <div className="row">
                          {productInfo?.variation?.map((item, index) => (
                            <div key={item?.label + index} className="col-6 mb-3">
                              <div className="text-black fw-medium text-capitalize" style={{ fontSize: "1rem" }}>
                                {item?.label}
                              </div>
                              <div className="fw-normal text-capitalize" style={{ fontSize: "1.2rem", color: "#555555" }}>
                                {item?.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* Accordion 2 */}
                <Accordion
                  activeKey={activeKey}
                  onSelect={(key) => setActiveKey(key)}
                  className="shadow-none bg-none"
                >
                  <Accordion.Item eventKey="panel2">
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={require("../assets/images/ProductDetails/exclaimed.png")}
                          alt=""
                          className="object-contain"
                          style={{ width: "2.8rem" }}
                          loading="lazy"
                        />
                        <div>
                          <h4 className="fs-5 fw-medium text-black mb-1">
                            Know your product
                          </h4>
                          <p className="text-muted text-sm mb-0 text-capitalize">
                            Description
                          </p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="ps-3 ps-md-5">
                        <p className="text-muted text-sm text-capitalize mb-0">
                          {productInfo?.product_detail}
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* Accordion 3 */}
                <Accordion activeKey={activeKey}
                  onSelect={(key) => setActiveKey(key)}
                  className="shadow-none bg-none">
                  <Accordion.Item eventKey="panel4">
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={require("../assets/images/ProductDetails/return-box.png")}
                          alt="Return and exchange policy"
                          className=""
                          style={{ width: "2.8rem" }}
                          loading="lazy"
                        />
                        <div>
                          <h4 className="fw-bold fs-5 text-capitalize text-black mb-1">
                            Return and exchange policy
                          </h4>
                          <p className="text-muted text-sm mb-0 text-capitalize">
                            Know more about return and exchange
                          </p>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="ps-3 ps-md-5">
                        <p className="text-muted text-sm text-capitalize text-justify mb-0">
                          {policy?.return_and_exchange_policy}
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <SimilarProduct
        title={"Similar Products"}
        info={productInfo?.similar_product}
      />

      <CustomerReviewSection productInfo={productInfo} BorderLinearProgress={BorderLinearProgress} />
    </>
  );
};

export default ProductDetailsPage;
