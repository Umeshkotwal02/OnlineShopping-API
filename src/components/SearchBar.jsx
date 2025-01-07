import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";
import { SearchCloseIcon, SearchIcon } from "../assets/SvgIcons";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(5); // Controls how many results to show at a time
  const [closeSearchBar, setCloseSearchBar] = useState(false);

  // Static data to simulate API response
  const staticData = [
    {
      id: 1,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/Crush.png"),
    },
    {
      id: 2,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/DesignerSaree.png"),
    },
    {
      id: 3,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/FloralSaree.png"),

    },
    {
      id: 4,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/Reception.png"),
    },
    {
      id: 5,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/Wedding.png"),
    },
    {
      id: 6,
      category_name: "Ruffle Lehenga With Crop Top",
      image: require("../assets/images/CategoryByShopSlicks/lahenga.png"),
    },
  ];

  // Simulate search filtering based on the static data
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const filteredResults = staticData.filter((item) =>
      item.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm]);

  // Function to handle loading more results as the user scrolls down
  const loadMoreResults = () => {
    const increment = window.innerWidth <= 576 ? 2 : 5; // Smaller increments for mobile
    if (visibleResults < searchResults.length) {
      setVisibleResults((prevVisible) => prevVisible + increment);
    }
  };

  // Add resize listener to reset visibleResults on viewport width change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setVisibleResults(5); // Reset to 5 items for mobile view
      }
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (closeSearchBar) return null;

  return (
    <Container
      className="w-100 px-sm-0 h-auto"
      style={{ zIndex: 999 }}
    >
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div className="w-100">
            <div
              className="search-bar-container w-100 d-flex align-items-center bg-opacity-10 px-3 search-bar"
              style={
                searchTerm.length === 0
                  ? {
                    // here we can add some styles to the search bar when it's empty
                    // border: "1px solid #D3D1D1",
                  }
                  : {}
              }
            >
              <div className="d-lg-none">
                <FiSearch className="text-dark fs-3" />
              </div>
              
              <div className="d-none d-lg-block">
                <SearchIcon className="text-dark p-0" />
              </div>

              <input
                type="text"
                placeholder="Search for products..."
                className="search-input  form-control border-0 search-hover search-input text custom-placeholder align-self-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <SearchCloseIcon
                  onClick={() => {
                    setSearchTerm(""); // Clear the search input
                    setSearchResults([]); // Clear the search results
                  }}
                />
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
                      .map((product) => (
                        <div
                          key={product.id}
                          className="search-related-product w-100"
                          onClick={() => {
                            setSearchTerm(""); // Clear the search input
                            setSearchResults([]); // Clear the search results
                            setCloseSearchBar(true); // Close the search bar
                            navigate(`/category-detail-page/${product.id}`); // Navigate to the detail page
                          }}
                        >
                          <div className="main-search-product d-flex align-items-center">
                            <img
                              src={product.image}
                              alt={product.category_name}
                              className="search-image"
                            />
                            <p className="ms-3 mb-0 text-wrap search-title">
                              {product.category_name}
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
