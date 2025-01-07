import React, { useState } from "react";
import { IoBagOutline, IoStar } from "react-icons/io5";
import { Button, Form } from "react-bootstrap";
import { RiHeartAddLine } from "react-icons/ri";
import ProductDetailsSlider from "./ProductDetailsPage/ProductDetailsSlider";
import QuantityCounter from "./ProductDetailsPage/QuantityCounter";
import {
  CashOnDelIcon,
  ExchangeIcon,
  ShippingIcon,
  StitchingIcon,
} from "../assets/SvgIcons";
import { Container, Row, Col } from 'react-bootstrap';
import CustomerReview from "./ProductDetailsPage/CustomerReview"
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";
import ProductAllInformation from "./ProductDetailsPage/ProductAllInformation";
import "../styles/ProductDetails.css";
import SimilarProduct from "./ProductDetailsPage/SimilarProduct";
import OnlineShopDesignStudio from "./HomePage/OnlineShopDesignStudio";

const ProductDetails = () => {

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
      title: "stitching services",
    },
    {
      icon: <ShippingIcon />,
      title: "WORLDWIDE SHIPPING",
    },
  ];

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Product Page
    </span>,
    <span key="2" className="text-dark fw-light">
      Product Details Page
    </span>
  ];
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [stitchingValue, setStitchingValue] = useState("female");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [loading, setLoading] = useState(false);

  // Static Data
  const productInfo = {
    product_name: "Pink Ethnic",
    product_detail: "Sea Green Georgette Semi-Stitched Lehenga and Unstitched Blouse with Dupatta (Set of 3)",
    product_sku_code: "SKU12345",
    average_rating: 3.5,
    total_rating: 55,
    product_price: 5400,
    product_discount: 40,
    colorist_images: [
      { varient_name: "Green", multiple_image: [require('../assets/images/ProductDetails/GreenSelect.png'), "image2.jpg"] },
      { varient_name: "Orange", multiple_image: [require('../assets/images/ProductDetails/orange.png'), "image4.jpg"] },
      { varient_name: "Blue", multiple_image: [require('../assets/images/ProductDetails/blue.png'), "image4.jpg"] },
      { varient_name: "Black", multiple_image: [require('../assets/images/ProductDetails/black.png'), "image4.jpg"] },
      { varient_name: "Blue", multiple_image: [require('../assets/images/ProductDetails/orange.png'), "image4.jpg"] },
    ],
    sizechart: true,
  };

  const availableOffers = [
    { heading: "GET FLAT 20% OFF", name: "NEW20", price: 100 },
  ];

  const handleAddToCartClick = (id) => {
    // Add to cart logic
    console.log("Added to cart:", id);
  };

  const handleChange = (e) => {
    setStitchingValue(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb list={breadcrumbArray} />
          <Container>
            <Row className="py-3">
              {/* Product Image Slider */}
              <Col lg={6}>
                {/* <ProductDetailsSlider /> */}
                <ProductDetailsSlider />
              </Col>

              {/* Product Details */}
              <Col lg={6}>
                <h4 className="">{productInfo.product_name}</h4>
                <p style={{ color: "#555555", fontSize: "1.3rem" }}>{productInfo.product_detail}</p>

                {/* Rating */}
                <div className="d-flex align-items-center mb-3">
                  <div className="border border-dark rounded px-2 py-1 d-flex align-items-center fw-bold">
                    <span>{productInfo.average_rating.toFixed(1)}</span>
                    <IoStar className="ms-2" />
                  </div>
                  <p className="ms-1 text-center m-0">Based on {productInfo.total_rating} ratings</p>
                </div>

                {/* Price */}
                <div className="mb-4 common-border">
                  <h3>
                    ₹{productInfo.product_price}{" "}
                    <span className="text-success ms-2">
                      {productInfo.product_discount}% Off
                    </span>
                  </h3>
                  <p>

                    Inclusive of all taxes
                  </p>
                </div>

                {/* Select Color */}
                <div className="">
                  <h4>Select Color</h4>
                  <h5 style={{ color: "#555555", fontWeight: "400" }}>Green</h5>
                  <Row className=" common-border">
                    <h3 className="d-flex d-col">
                      {productInfo.colorist_images?.map((item, index) => (
                        <Col
                          key={index}
                          className="position-relative ps-0 p-2"
                          style={{ width: "120px", height: "160px" }}
                          onClick={() => {
                            setSelectedColor(item.varient_name);
                            setSelectedColorImages(item.multiple_image);
                          }}
                        >
                          {/* <p className="text-center">{item.varient_name}</p>  */}
                          <img
                            src={item.multiple_image[0]}
                            alt={item.varient_name}
                            className="w-100 h-100 object-cover rounded"
                          />

                          {/* {selectedColor === item.varient_name && (
                        <div
                          className="position-absolute bg-dark bg-opacity-50"
                          style={{
                            top: "5%",
                            right: "6%",
                            padding: "47px",
                            paddingTop: "59%",
                            borderRadius: "7px",
                            border: "2px solid black",
                          }}
                        >
                          <FaRegCircleCheck className="text-white" />
                        </div>
                      )} */}
                        </Col>
                      ))}
                    </h3>
                  </Row>
                </div>

                {/* Available Offers */}
                {availableOffers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mt-4" >Available Offers:</h4>
                    {availableOffers.map((item, index) => (
                      <div key={index} className="border border-light mb-2 p-4 discount-coupon">
                        <Row className="align-items-center">
                          <Col xs={2} className="text-center">
                            <div className="text-white px-3 py-1 rounded">
                              <img
                                src={require("../assets/images/ProductDetails/discount-bag.png")}
                                alt="Product"
                                className="discount-bag"
                              />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <h2 className="fw-bolder">{item.heading}</h2>
                            <h5 style={{ color: "#515151" }}>Use Code: {item.name}</h5>
                          </Col>
                          <Col xs={4} className="text-center">
                            <button className="coupon-btn" onClick={() => alert(`Copied: ${item.name}`)}>
                              COPY
                            </button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    {!showAllOffers && availableOffers.length > 2 && (
                      <div className="text-end">
                        <Button variant="link" onClick={() => setShowAllOffers(true)}>
                          See All Offers
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {!showAllOffers && availableOffers.length > 2 && (
                  <div className="text-end">
                    <Button variant="link" onClick={() => setShowAllOffers(true)}>
                      See All Offers
                    </Button>
                  </div>
                )}
                {/* Stitching Options */}
                <div className="mb-4">
                  <h5>Lehenga Choli:</h5>
                  <Row>
                    <Col>
                      <Form className="custom-check-form">
                        {["Unstitched Lehenga Choli", "Standard Stitching", "Customize Stitching"].map((stitching, index) => (
                          <Form.Check
                            key={index}
                            type="radio"
                            label={stitching}
                            value={stitching}
                            checked={stitchingValue === stitching}
                            onChange={handleChange}
                            inline
                            className=""
                          />
                        ))}
                      </Form>
                    </Col>
                    <Col>
                      <div className="text-end">₹0</div>
                      <div className="text-end">₹1499</div>
                      <div className="text-end">₹1899</div>
                    </Col>
                  </Row>
                </div>

                {/* Quantity and Size Chart */}
                <div className="d-flex align-items-center mb-4">
                  <h5 className="me-2">Quantity: </h5>
                  <QuantityCounter />
                </div>

                {/* Wishlist and Cart */}

                <div className="d-flex gap-3 mb-4">
                  <Button
                    variant=""
                    className={` ${isWishlisted ? "disabled" : ""} `}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    style={{ backgroundColor: "#EDEDED", borderRadius: "5px" }}
                  >
                    <RiHeartAddLine className="fs-4" />
                  </Button>
                  <Button className="btn" onClick={() => handleAddToCartClick(productInfo.product_sku_code)} style={{ backgroundColor: "#B51B3B", borderRadius: "5px", border: "none", width: "50%", paddingBottom: "0.8rem", paddingTop: "0.8rem" }}>
                    <IoBagOutline /> Add to Bag
                  </Button>
                  <Button className="btn" onClick={() => handleAddToCartClick(productInfo.product_sku_code)} style={{ backgroundColor: "#03A685", borderRadius: "5px", border: "none", width: "50%" }}>
                    <IoBagOutline /> Buy Now
                  </Button>
                  &nbsp;
                </div>

                <Container className="py-3 mb-4 rounded" style={{ backgroundColor: "#EDEDED" }}>
                  <Row className="d-flex justify-content-between align-items-center">
                    {bagShowOff.map((item, index) => (
                      <Col
                        key={index}
                        xs={6}
                        md={3}
                        className="text-center d-flex flex-column align-items-center"
                      >
                        <div
                          className="icon mb-2 d-flex justify-content-center align-items-center"
                          style={{
                            width: "80px",
                            height: "55px",
                          }}
                        >
                          {item.icon}
                        </div>
                        <div className="text-sm text-uppercase fw-medium" style={{ fontSize: "1rem", marginTop: "5px" }}>
                          {item.title}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Container>


                {/* Product Information */}
                <ProductAllInformation />
              </Col>
              <hr />
              &nbsp;
              <SimilarProduct />
            </Row>
          </Container>
          <CustomerReview />
          <OnlineShopDesignStudio />
        </>
      )
      }
    </>
  );
};


export default ProductDetails;
