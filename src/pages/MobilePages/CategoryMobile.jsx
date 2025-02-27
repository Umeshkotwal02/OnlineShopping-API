import React, { useEffect, useState } from "react";
import "../../styles/CategoryMobile.css";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../constants/constApi";
import { Link } from "react-router-dom";

const CategoryMobile = () => {
    const [activeCategory, setActiveCategory] = useState(null); // Stores the active category
    const [activeDropdown, setActiveDropdown] = useState(null); // Stores the active dropdown category
    const [headerButtons, setHeaderButtons] = useState([]);

    const fetchHeaderButtons = async () => {
        try {
            const response = await axios.get(`${API_URL}header_api`);
            const { data } = response;

            if (data && data.STATUS === 200 && Array.isArray(data.DATA)) {
                setHeaderButtons(data.DATA);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error fetching header buttons:", err);
            toast.error(
                err?.response?.data?.MESSAGE ||
                err?.message ||
                "Failed to fetch header buttons."
            );
        }
    };

    useEffect(() => {
        fetchHeaderButtons();
    }, []);

    const handleCategoryClick = (categoryId) => {
        // Toggle the category selection
        setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
        setActiveDropdown(null); // Reset subcategory when switching categories
    };

    const handleDropdownClick = (dropdownIndex) => {
        // Toggle the dropdown
        setActiveDropdown((prev) => (prev === dropdownIndex ? null : dropdownIndex));
    };

    return (
        <div className="category-container">
            <div className="row">
                {/* Left Sidebar */}
                <div style={{ backgroundColor: "#F3F3F3" }}>
                    <h5 className="category-title">Categories</h5>
                </div>
                <div className="col-4 category-sidebar p-0 m-0">
                    <ul className="list-unstyled">
                        {headerButtons.map((item, index) => (
                            <li
                                key={index}
                                className={`category-item  ${activeCategory === item.id ? "active" : ""
                                    }`}
                                onClick={() => handleCategoryClick(item.id)}
                            >
                                {item.category_image && (
                                    <img
                                        src={item.category_image}
                                        alt={item.category_name}
                                        className="category-image"
                                    />
                                )}
                                <span className="category-name">{item.category_name}</span>

                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="col-8 category-content">
                    {headerButtons.subcategories && Object.keys(headerButtons.subcategories).length > 0 ? (
                        Object.entries(headerButtons.subcategories).map(([key, items], idx) => (
                            <div key={idx} className="dropdown-section">
                                {/* Subcategory type */}
                                <h6
                                    className="dropdown-category"
                                    onClick={() => handleDropdownClick(idx)}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize key */}
                                    <span className="toggle-icon">
                                        {activeDropdown === idx ? "-" : "+"}
                                    </span>
                                </h6>

                                {/* Subcategory items */}
                                {activeDropdown === idx && (
                                    <ul className="list-unstyled dropdown-items">
                                        {items.map((item) => (
                                            <li key={item.id}>
                                                <Link to="/products-page" className="list-item">
                                                    {item.category_name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-category">Select a category to see details</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CategoryMobile;
