import React, { useEffect, useState } from "react";
import { Stack, Pagination } from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import toast from "react-hot-toast";
import axios from "axios";
import { STORAGE } from "../config/config";
import ProductFilter from "./ProductPage/ProductFilter";
import NewArrivalCard from "../components/homepage/NewArriveCard";
import { API_URL } from "../constants/constApi";
import Loader from "../components/Loader";
import { Accordion, Card, Col, Container, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { XClose } from "../assets/SvgIcons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../styles/ProductPage.css"



const ProductPage = () => {
  const [productPageDetails, setProductPageDetails] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const category = new URLSearchParams(window.location.search)?.get("category");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showPagination, setShowPagination] = useState(true);
  const [appliedfilterData, setAppliedFilterData] = useState({
    ...location?.state,
  });
  // console.log("appliedfillterdata", appliedfilterData);
  const [valueLabelMapping, setValueLabelMapping] = useState({});
  const [selectedSortValue, setSelectedSortValue] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products-page");
    window.scrollTo(0, 0);
  };

  const [isExpanded, setIsExpanded] = useState([]);

  useEffect(() => {
    const initialExpanded = ["Price"];
    filterOptions.forEach((filter) => {
      if (
        appliedfilterData[filter.name]?.length > 0 &&
        !initialExpanded.includes(filter.title)
      ) {
        initialExpanded.push(filter.title);
      }
    });
    setIsExpanded(initialExpanded);
  }, [filterOptions, appliedfilterData]);

  const handleAccordionChange = (id) => {
    setIsExpanded((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCheckboxChange = (key, value) => {
    changeFilterData({ key, val: value });
    if (!isExpanded.includes(key)) {
      setIsExpanded([...isExpanded, key]);
    }
  };

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Product Page
    </span>,
  ];

  const pageSize = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalpageset, setTotalpageset] = useState(0);
  const [pageset, setpageset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchProductPageDetails = async (page = 1) => {
    try {
      setLoading(true);
      const userProfile = JSON.parse(
        localStorage?.getItem(STORAGE?.USERDETAIL)
      );

      const response = await axios.post(`${API_URL}productsfilter`, {
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        user_id: userProfile?.id,
        filter: appliedfilterData,
        page: page,
        limit: "15",
      });

      if (response && response.data && response.data.STATUS === 200) {
        setProductPageDetails({ ...response.data.DATA });

        setTotalpageset(response.data.TOTAL_PRODUCTS);
        setpageset(response.data.COUNT);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.MESSAGE ||
        err?.message ||
        "Failed to fetch information."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalpageset / pageSize);

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);

    fetchProductPageDetails(value).then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const fetchFilterOptions = async () => {
    try {
      const { data } = await axios.post(`${API_URL}productsvarients`, {
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        is_mobile: "1",
      });

      if (data && data.STATUS === 200) {
        setFilterOptions(data.DATA);
        // console.log("dt", data.DATA);

        const mapping = {};
        data.DATA.forEach((filter) => {
          filter.data.forEach((item) => {
            mapping[item.value] = item.label;
          });
        });

        setValueLabelMapping(mapping);
      }

      if (data.DATA[0]?.data?.length > 0) {
        setSelectedSortValue(data.DATA[0].data[0].value);
      }
    } catch (err) {
      console.error(err);
      console.error(err.response);
      toast.error(
        err?.response?.data?.MESSAGE ||
        err?.message ||
        "Failed to fetch information."
      );
    }
  };

  useEffect(() => {
    fetchProductPageDetails();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  const getProduct = async () => {
    // console.log("appliedfilterData :: ", appliedfilterData);
  };

  const changeFilterData = (obj) => {
    if (obj?.key) {
      // console.log("obj ::", obj);

      const oldData = Array.isArray(appliedfilterData[obj?.key])
        ? appliedfilterData[obj?.key]
        : [];
      const updateData =
        oldData?.indexOf(obj?.val) >= 0
          ? oldData?.filter((e) => e != obj?.val)
          : [...oldData, obj?.val];

      appliedfilterData[obj?.key] = updateData?.filter(
        (e, i) => updateData.indexOf(e) == i
      );

      if (obj?.key === "sort") {
        appliedfilterData[obj?.key] = obj?.val;
      }

      setAppliedFilterData({ ...appliedfilterData });
      fetchProductPageDetails();

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setAppliedFilterData({});
    fetchProductPageDetails();
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [data, setData] = useState([]);

  const fetchHomePageDetails = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}home`, {
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_id: userProfile?.id,
        is_mobile: "0",
        is_admin: "0",
      });

      if (data && data.STATUS === 200) {
        setData(data.DATA || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageDetails();
  }, []);

  useEffect(() => {
    const searchTerm = location.state?.search;
    if (searchTerm) {
      // console.log("Search term:", searchTerm);
    }
  }, [location]);

  const ShowFilterTitles = () => {
    const checkAppliedData = { ...appliedfilterData };

    delete checkAppliedData.sort;
    delete checkAppliedData.search;

    const appliedKeys = Object.keys(checkAppliedData);

    const dataArr = filterOptions
      ?.filter((e) => appliedKeys.includes(e.name))
      ?.map((e) => ({
        name: e.name,
        data: e.data?.filter((r) =>
          appliedfilterData[e.name]?.includes(r.key || r.value)
        ),
      }))
      ?.flatMap((e) => e.data?.map((x) => ({ ...x, fillName: e.name })));

    return dataArr?.map((e) => (
      <button
        key={`${e.fillName}-${e.value}`}
        style={{
          borderRadius: "50px",
          color: "#898989",
          border: "1px dashed #C6C6C6",
          backgroundColor: "white",
          fontSize: "0.85rem",
        }}
        className="px-3 py-1 d-flex justify-content-around align-items-center gap-2"
        onClick={() => changeFilterData({ key: e.fillName, val: e.value })}
      >
        <span className="text-capitalize">
          {e.fillName} : {e.label}
        </span>
        <span>
          <XClose />
        </span>
      </button>
    ))
  }

  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState(appliedfilterData);

  const handleFilterClick = () => {
    const firstFilterIndex = filterOptions.findIndex(
      (filterdata) => filterdata.name.toLowerCase() !== "sort"
    );
    setActiveFilterIndex(firstFilterIndex);
    setShowFilterOverlay(true);
  };

  const handleCloseClick = () => {
    setShowFilterOverlay(false);
  };

  const handleFilterChange = (index) => {
    setActiveFilterIndex(index);
  };

  const handleCheckboxLocalChange = (filterName, value) => {
    const updatedFilters = { ...selectedFilters };
    const currentValues = updatedFilters[filterName] || [];
    if (currentValues.includes(value)) {
      updatedFilters[filterName] = currentValues.filter((v) => v !== value);
    } else {
      updatedFilters[filterName] = [...currentValues, value];
    }
    setSelectedFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    for (const filterName in selectedFilters) {
      selectedFilters[filterName].forEach((value) => {
        handleCheckboxChange(filterName, value);
      });
    }

    setShowFilterOverlay(false);
  };

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb list={breadcrumbArray} />
          <Container fluid className="my-1 px-lg-5 px-xl-5 px-xxl-5">
            <Row>
              {/* Sidebar Filter */}
              <Col lg={3} style={stickyStyle} className="d-none d-lg-block">
                <h3 className="h4 mb-4">Filter</h3>
                {filterOptions?.map((filterdata, index) => {
                  if (filterdata.name.toLowerCase() !== 'sort') {
                    const sortedItems = filterdata.data?.sort((a, b) => {
                      const isCheckedA = appliedfilterData[filterdata.name]?.includes(a.value);
                      const isCheckedB = appliedfilterData[filterdata.name]?.includes(b.value);
                      return isCheckedB - isCheckedA;
                    });

                    return (
                      <Accordion key={index} className="product-page-accordion">
                        <Card key={index} className="border-0 border-bottom" style={{ borderRadius: "15px" }}>
                          <Accordion.Item eventKey={index.toString()} style={{ borderRadius: "15px" }}>
                            <Accordion.Header
                              onClick={() => handleAccordionChange(filterdata.title)}
                              className="d-flex align-items-center"
                              style={{ borderRadius: "15px" }}
                            >
                              <span className="text-capitalize fw-medium">
                                {filterdata.title}
                              </span>
                              <span className="ms-auto">
                                {isExpanded.includes(filterdata.title) ? (
                                  <FaMinus />
                                ) : (
                                  <FaPlus />
                                )}
                              </span>
                            </Accordion.Header>
                            <Accordion.Body className="py-3" style={{ backgroundColor: "#F6F6F6" }}>
                              <Form className="overflow-auto custom-scrollbar" style={{ maxHeight: "200px" }}>
                                {sortedItems?.map((item, itemIndex) => (
                                  <Form.Check
                                    key={item.value + itemIndex}
                                    type="checkbox"
                                    label={item.label}
                                    id={`checkbox-${item.value}`}
                                    checked={appliedfilterData[filterdata.name]?.includes(item.value)}
                                    onChange={() =>
                                      handleCheckboxChange(filterdata.name, item.value)
                                    }
                                    className="text-capitalize py-1"
                                  />
                                ))}
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Card>
                      </Accordion>

                    );
                  }
                  return null;
                })}
              </Col>

              {/* Products Section */}
              <Col lg={9}>
                <div className="d-flex justify-content-between align-items-center my-2">
                  <h5>Lehenga Wedding Dresses Collection</h5>
                  <div>
                    <Accordion className="border-0 sort-by">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="d-flex align-items-center gap-3">
                            <span className="me-2">Sort by:</span>
                            <div>
                              <DropdownButton
                                id="dropdown-sort"
                                title={
                                  <div className="d-flex align-items-center text-secondary">
                                    {selectedSortValue
                                      ? filterOptions[0].data.find(
                                        (item) => item.value === selectedSortValue
                                      )?.label || "Sort by Latest"
                                      : "Sort by Latest"}
                                    <span className="" style={{ marginLeft: "55px" }}>
                                      {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    </span>
                                  </div>
                                }
                                onToggle={(isOpen) => setIsDropdownOpen(isOpen)} // Handle dropdown open/close state
                                style={{
                                  backgroundColor: "#F5F4F4",
                                  borderRadius: "5px",
                                  color: "#828282",
                                  border: "1px solid #C6C6C6",
                                  fontSize: "1.1rem",
                                }}
                                variant=""
                                className="custom-dropdown" // Add custom class
                              >
                                {filterOptions[0]?.data.map((e, i) => (
                                  <Dropdown.Item
                                    key={i}
                                    onClick={() => changeFilterData({ key: filterOptions[0].name, val: e.value })}
                                    className="border-bottom px-0 py-2"
                                    style={{ fontSize: "1rem" }}
                                  >
                                    {e.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </div>
                          </div>
                        </Accordion.Header>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <Col>
                  <div className="d-flex gap-2 my-4">
                    <button
                      onClick={clearFilters}
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
                    <ShowFilterTitles />
                  </div>
                </Col>

                {/* Products Grid */}
                {productPageDetails?.CATEGORY_PRODUCT?.length > 0 ? (
                  <Row>
                    {productPageDetails?.CATEGORY_PRODUCT?.map((item, index) => (
                      <Col xs={6} sm={6} md={4} lg={3} xl={3} xxl={3} key={index} className="mb-4">
                        <NewArrivalCard product={item} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <h2 className="h5">Product Unavailable</h2>
                    <p>No products match the current filter criteria.</p>
                  </div>
                )}

              </Col>

              {/* Pagination */}
              <Stack spacing={2} alignItems="center" className="d-flex justify-content-center align-item-center font-jost pagination justify-content-center align-item-center gap-4 fw-bold">
                {productPageDetails?.CATEGORY_PRODUCT?.length >=
                  pageset && (
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      variant="outlined"
                      shape="rounded"
                      nextIconButtonText="Next"
                      nextIconButtonProps={{
                        sx: {
                          backgroundColor: "blue",
                          color: "white",
                        },
                      }}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          border: "none",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "black !important",
                          color: "#fff",
                        },
                        "& .MuiButtonBase-root": {
                          borderRadius: "0",
                          height: "40px",
                          width: "40px",
                          fontSize: "20px",
                        },
                      }}
                      onChange={handlePaginationChange}
                    />
                  )}
              </Stack>
            </Row>
          </Container >
          {/* Filter Overlay */}
          < ProductFilter
            handleFilterClick={handleFilterClick}
            showFilterOverlay={showFilterOverlay}
            filterOptions={filterOptions}
            handleCloseClick={handleCloseClick}
            handleApplyFilters={handleApplyFilters}
            activeFilterIndex={activeFilterIndex}
            handleFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
            handleCheckboxLocalChange={handleCheckboxLocalChange}
          />
        </>

      )
      }
    </>
  );
};

export default ProductPage;
