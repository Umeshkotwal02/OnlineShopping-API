import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { PlusIcon, MinusIcon, XClose } from "../assets/SvgIcons";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
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
import { API_URL } from "../Constant/constApi";
import Loader from "../components/Loader";
import { Button, Card, Col, Container, Dropdown, Form, Row } from "react-bootstrap";


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
    <Link
      to={"/"}
      underline="hover"
      key="1"
      color="inherit"
      className="text-[#666666] text-base lg:text-md !leading-[1.16] font-normal font-jost  hover:underline capitalize"
    >
      Home
    </Link>,
    <p
      key={2}
      className="text-[#A36300] text-base lg:text-md !leading-[1.16] font-normal font-jost  capitalize"
    >
      Product Page
    </p>,
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
        className="flex gap-2 py-1.5 md:py-2.5 px-2.5 border border-dashed border-[#898989] rounded-3xl"
        onClick={() => changeFilterData({ key: e.fillName, val: e.value })}
      >
        <span className="text-sm md:text-base md:leading-5 font-jost text-[#898989]">
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb list={breadcrumbArray} />
          <Container fluid className="my-4">

            <Row>
              {/* Sidebar Filter */}
              <Col lg={3} className="d-none d-lg-block">
                <h3 className="h4 mb-4">Filter</h3>
                {filterOptions?.map((filterdata, index) => {
                  if (filterdata.name.toLowerCase() !== 'sort') {
                    const sortedItems = filterdata.data?.sort((a, b) => {
                      const isCheckedA = appliedfilterData[filterdata.name]?.includes(a.value);
                      const isCheckedB = appliedfilterData[filterdata.name]?.includes(b.value);
                      return isCheckedB - isCheckedA;
                    });

                    return (
                      <Accordion
                        key={index}
                        className="!shadow-none !border-0 !border-b border-[#dcdcdc] rounded-none my-0 accordion-main"
                        expanded={isExpanded.includes(filterdata.title)}
                      >
                        <AccordionSummary
                          className="h-[60px] accordion-btn"
                          expandIcon={
                            isExpanded.includes(filterdata.title) ? (
                              <MinusIcon />
                            ) : (
                              <PlusIcon />
                            )
                          }
                          aria-controls={`panel-content-${index}`}
                          id={`panel-header-${index}`}
                          onClick={() =>
                            handleAccordionChange(filterdata.title)
                          }
                        >
                          <span className="text-base leading-5 font-medium font-jost capitalize">
                            {filterdata.title}
                          </span>
                        </AccordionSummary>
                        <AccordionDetails className="bg-[#F6F6F6] p-4">
                          <FormGroup className="accordion-list max-h-52 overflow-y-auto !flex-nowrap">
                            {sortedItems?.map((item, itemIndex) => (
                              <FormControlLabel
                                onClick={() =>
                                  handleCheckboxChange(
                                    filterdata.name,
                                    item.value
                                  )
                                }
                                key={item.value + itemIndex}
                                className="text-base leading-5 font-jost text-black capitalize"
                                control={
                                  <Checkbox
                                    checked={
                                      appliedfilterData[
                                        filterdata.name
                                      ]?.indexOf(item.value) >= 0
                                    }
                                    style={{ color: "#E9B159" }}
                                  />
                                }
                                label={item.label}
                              />
                            ))}
                          </FormGroup>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                  return null;
                })}
              </Col>

              {/* Products Section */}
              <Col lg={9}>
                <Row className="align-items-center justify-content-between mb-4">
                  <Col>
                    <h3 className="h4 mb-3">Lehenga Wedding Dresses Collection</h3>
                    <div className="d-flex flex-wrap gap-2">
                      <Button variant="outline-secondary" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <ShowFilterTitles />
                    </div>
                  </Col>
                  <Col className="d-flex align-items-center gap-3">
                    <span>Sort by:</span>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary">
                        {selectedSortValue}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {filterOptions &&
                          filterOptions[0]?.data.map((e, i) => (
                            <Dropdown.Item
                              key={i}
                              onClick={() => changeFilterData({ key: filterOptions[0].name, val: e.value })}
                            >
                              {e.label}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

                {/* Products Grid */}
                {productPageDetails?.CATEGORY_PRODUCT?.length > 0 ? (
                  <Row>
                    {productPageDetails?.CATEGORY_PRODUCT?.map((item, index) => (
                      <Col xs={6} sm={4} md={3} lg={2} key={index} className="mb-4">
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

                {/* Pagination */}
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
          {/* Filter Overlay */}
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
