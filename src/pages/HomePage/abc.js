import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { STORAGE } from "../config/config";
import axios from "axios";
import { API_URL } from "../Constant/constApi";
import toast from "react-hot-toast";
import { XClose } from "../assets/SvgIcons";
import Loader from "../components/Loader";
import { Accordion, Button, Card, Col, Container, Form, Pagination, Row, Stack } from "react-bootstrap";
import NewArrivalSection from "./HomePage/NewArrivalSection";
import ProductFilter from "./ProductPage/ProductFilter";
import { FaMinus, FaPlus } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import NewArrivalCard from "../components/homepage/NewArriveCard";

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
    navigate("/product-page");
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
        <span className="small text-md-md lh-md text-muted text-capitalize">
          {e.fillName} : {e.label}
        </span>
        <span>
          <XClose className="ps-2" />
        </span>
      </button>
    ));
  };

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

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Loader />
        </div>
      ) : (
        <>
          <Breadcrumb list={breadcrumbArray} />
          <section className="my-4">
            <Container fluid className="my-1 px-lg-5 px-xl-5 px-xxl-5">
              <Row className="g-4">
                {/* Filter Section */}
                <Col lg={3} className="d-none d-lg-block">
                  <h3 className="h5 fw-medium text-start mb-4">Filter</h3>
                  {filterOptions?.map((filterdata, index) => {
                    if (filterdata.name.toLowerCase() !== "sort") {
                      const sortedItems = filterdata.data?.sort((a, b) => {
                        const isCheckedA = appliedfilterData[filterdata.name]?.includes(a.value);
                        const isCheckedB = appliedfilterData[filterdata.name]?.includes(b.value);
                        return isCheckedB - isCheckedA;
                      });

                      return (
                        <Accordion key={index} defaultActiveKey="0" className="product-page-accordion">
                          <Card key={index} className="border-0 border-bottom" style={{ borderRadius: "15px" }}>
                            <Accordion.Item eventKey={index.toString()} style={{ borderRadius: "15px" }}>
                              <Accordion.Header
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
                                      type="checkbox"
                                      key={item.value + itemIndex}
                                      id={`${filterdata.name}-${item.value}`}
                                      label={item.label}
                                      checked={appliedfilterData[filterdata.name]?.includes(item.value)}
                                      onChange={() => handleCheckboxChange(filterdata.name, item.value)}
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

                {/* Product Section */}
                <Col lg={9}>
                  <Row className="justify-content-between align-items-center mb-3 g-2">
                    <Col>
                      <h5>Lehenga Wedding Dresses Collection</h5>
                      <div className="d-flex gap-2">
                        <button style={{
                          borderRadius: "50px",
                          color: "black",
                          backgroundColor: "#F5F4F4",
                          border: "1px solid #C6C6C6",
                          fontSize: "0.85rem",
                        }}
                          className="px-3 py-1 d-flex justify-content-around align-items-center gap-2"
                          onClick={clearFilters}>
                          Clear All
                        </button>
                        <ShowFilterTitles />
                      </div>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <span className="me-2">Sort by:</span>
                      <Form.Select
                        value={selectedSortValue}
                        onChange={(e) => setSelectedSortValue(e.target.value)}
                        style={{ width: "150px" }}
                      >
                        {filterOptions[0]?.data.map((option, i) => (
                          <option
                            key={i}
                            value={option.value}
                            onClick={() =>
                              changeFilterData({ key: filterOptions[0].name, val: option.value })
                            }
                          >
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>

                  <Row className="g-3">
                    {productPageDetails?.CATEGORY_PRODUCT?.length > 0 ? (
                      productPageDetails?.CATEGORY_PRODUCT?.map((item, index) => (
                        <Col xs={6} sm={4} md={3} lg={2} key={index}>
                          <NewArrivalCard product={item} />
                        </Col>
                      ))
                    ) : (
                      <div className="text-center py-5">
                        <h2 className="h4 fw-medium">Product Unavailable</h2>
                        <p>No products match the current filter criteria.</p>
                      </div>
                    )}
                  </Row>
                  <Stack spacing={2} alignItems="center" className="font-jost">
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
                              backgroundColor: "#5C5C5C !important",
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
                </Col>
              </Row>
            </Container>
          </section>
          <ProductFilter
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
      )}
    </>
  );
};

export default ProductPage;
