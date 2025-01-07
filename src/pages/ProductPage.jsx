import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import SortBy from "./ProductPage/SortBy";
import { XClose } from "../assets/SvgIcons";
import ProductList from "./ProductPage/ProductList";
import Loader from "../components/Loader";
import { useState } from "react";
import ProductFilter from "./ProductPage/ProductFilter";

const ProductPage = () => {

  const [loading, setLoading] = useState(true);

  // Simulating loading for 2 seconds
  useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer); 
  }, []);

  if (loading) {
      return <Loader />;
  }

  const listyle = {
    color: "white",
    backgroundColor: "black",
    listStyleType: "none",
  };

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Product Page
    </span>,
  ];

  // Static data for product and filter details
  // const [appliedfilterData, setAppliedFilterData] = useState({ category: [], price: [] });
  // const [selectedSortValue, setSelectedSortValue] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 12;

  // const clearFilters = () => {
  //   setAppliedFilterData({ category: [], price: [] });
  //   // Reset product data
  // };


  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container fluid className="my-1 px-lg-5 px-xl-5 px-xxl-5">
        <Row>
          <Col lg={3} className="custom-column">
            <h5>Filter</h5>
            <ProductFilter />
          </Col>

          <Col lg={9} className="custom-column-product-list">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Lehenga Wedding Dresses Collection</h5>
              <SortBy />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex justify-content-around align-items-center gap-2">
                <button
                  // onClick={clearFilters}
                  style={{
                    borderRadius: "50px",
                    color: "black",
                    backgroundColor: "#F5F4F4",
                    border: "1px solid #C6C6C6",
                    fontSize: "0.85rem",
                  }}
                  className="px-3 py-1 d-flex justify-content-around align-items-center gap-2"
                >
                  Clear All
                </button>

                <button
                  // onClick={clearFilters}
                  style={{
                    borderRadius: "50px",
                    color: "#898989",
                    border: "1px dashed #C6C6C6",
                    backgroundColor: "white",
                    fontSize: "0.85rem",
                  }}
                  className="px-3 py-1 d-flex justify-content-around align-items-center gap-2"
                >
                  Product Type: Umbrella Lehenga
                  <XClose className="ps-2" />
                </button>

                <button
                  // onClick={clearFilters}
                  style={{
                    borderRadius: "50px",
                    color: "#898989",
                    border: "1px dashed #C6C6C6",
                    backgroundColor: "white",
                    fontSize: "0.85rem",
                  }}
                  className="px-3 py-1 d-flex justify-content-around align-items-center gap-2"
                >
                  Size: 45
                  <XClose className="ps-2" />
                </button>
              </div>
            </div>
            <Row>
              <ProductList />
            </Row>

            <div className="">
              {/* dynamic... up div  className="pagination"*/}
              {/* <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>{currentPage}</span>
              <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(productPageDetails.length / pageSize)}>
                Next
              </Button> */}

              {/* Static... */}
              <ul className="pagination justify-content-center align-item-center gap-4 fw-bold">
                <li
                  className="page-item py-1 px-3"
                  style={listyle}
                >
                  <Link
                    className="text-decoration-none fw-bold"
                    to="/products-page"
                    style={{ color: "white" }}
                  >
                    1
                  </Link>
                </li>
                <li className="page-item py-1 px-2" style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                }}><Link className=" text-decoration-none fw-bold" style={{ color: "black" }} to="/products-page">2</Link></li>
                <li className="page-item py-1 px-2"  style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                }} ><Link className=" text-decoration-none fw-bold" style={{ color: "black" }} to="/products-page">3</Link></li>
                 <li className="page-item py-1 px-2"  style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                }} ><Link className="text-decoration-none fw-bold" style={{ color: "black" }} to="/products-page">4</Link></li>
                 <li className="page-item"  style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                }} ><Link className="p-2 text-decoration-none fw-bold" style={{ color: "black" }} to="/products-page">...</Link></li>
                 <li className="page-item py-1 px-2"  style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                }} ><Link className=" text-decoration-none fw-bold" style={{ color: "black" }} to="/products-page">25</Link></li>
                <li className="page-item py-1" style={{
                  color: "black",
                  backgroundColor: "white",
                  listStyleType: "none",
                  border: "1px solid black"
                }}>
                  <Link className="p-2  text-decoration-none fw-bold fw-bold" style={{ color: "black" }} to="/products-page">Next  &gt; </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default ProductPage;
