import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SearchCloseIcon, SearchIcon } from "../assets/SvgIcons";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../Constant/constApi";
import { STORAGE } from "../config/config";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(5);
  const [closeSearchBar, setCloseSearchBar] = useState(false);

  // Function to fetch search data from the API
  const fetchSearchData = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}search`, {
        user_type: "btoc",
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_id: "",
        search: searchTerm,
      });

      // Extract data from response
      const { STATUS, DATA } = response.data;
      if (STATUS === 200) {
        setSearchResults(DATA || []);
      } else {
        setSearchResults([]);
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      setSearchResults([]);
    }
  };

  // Trigger API call whenever searchTerm changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchData();
    }, 300); // Add a debounce to avoid excessive API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const loadMoreResults = () => {
    const increment = window.innerWidth <= 576 ? 2 : 5; // Smaller increments for mobile
    if (visibleResults < searchResults.length) {
      setVisibleResults((prevVisible) => prevVisible + increment);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setVisibleResults(5); // Reset to 5 items for mobile view
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (closeSearchBar) return null;

  return (
    <Container className="w-100 px-sm-0 h-auto " style={{ zIndex: 999 }}>
      <Row>
        <Col xs={12} md={12} lg={12} className="mobile-search-setting">
          <div className="w-100">
            <div className="search-bar-container w-100 d-flex align-items-center bg-opacity-10 px-3 search-bar">
              <div className="d-lg-none">
                <FiSearch className="text-dark fs-3" />
              </div>

              <span className="d-none d-lg-block">
                <SearchIcon className="text-dark p-0" />
              </span>

              <input
                type="text"
                placeholder="Search for products..."
                className="search-input form-control border-0 search-hover text custom-placeholder align-self-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="cursor-pointer" role="button" onClick={() => {
                  setSearchTerm(""); // Clear the search input
                  setSearchResults([]); // Clear the search results
                }}>
                  <SearchCloseIcon

                  />
                </div>
              )}
              {searchTerm && (
                <div
                  className="dropdown-menu-custom"
                  onScroll={(e) => {
                    const bottom =
                      e.target.scrollHeight - e.target.scrollTop ===
                      e.target.clientHeight;
                    if (bottom) {
                      loadMoreResults(); // Load more results when scrolled to the bottom
                    }
                  }}
                >
                  {searchResults.length > 0 ? (
                    searchResults
                      .slice(0, visibleResults) // Limit the number of displayed results
                      .map((product, index) => (
                        <div
                          key={index}
                          className="search-related-product w-100"
                          onClick={() => {
                            setSearchTerm("");
                            setSearchResults([]);
                            setCloseSearchBar(true);
                            navigate(`/category-detail-page/${product.id}`);
                          }}
                        >
                          <div className="main-search-product d-flex align-items-center">
                            <img
                              src={product.product_thumbnail_image}
                              alt={product.suggestion}
                              className="search-image"
                            />
                            <p className="ms-3 mb-0 text-wrap search-title">
                              {product.suggestion}
                            </p>
                          </div>
                          <FaChevronRight className="search-arrow" />
                        </div>
                      ))
                  ) : (
                    <div className="no-results-message text-center py-2">
                      No product found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
