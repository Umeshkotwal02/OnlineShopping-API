import React, { useState } from "react";
import "../../styles/CategoryMobile.css";

const DataConst = [
    {
        id: 1,
        title: "New Arrival",
        image: require("../../assets/images/CateMobi/img-1.png"),
        dropdown: [
            {
                category: "Style",
                items: [
                    { name: "See All Saree", link: "products-page" },
                    { name: "Ready to Ship Saree", link: "products-page" },
                    { name: "Embroidered Saree", link: "products-page" },
                    { name: "Designer Saree", link: "products-page" },
                    { name: "Sequin Saree", link: "products-page" },
                    { name: "Ready Pleated Saree", link: "products-page" },
                    { name: "Plain Saree with", link: "products-page" },
                    { name: "Plain Saree", link: "products-page" },
                    { name: "Classic Saree", link: "products-page" },
                    { name: "Printed Saree", link: "products-page" },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "New",
        image: require("../../assets/images/CateMobi/img-2.png"),
        dropdown: [
            {
                category: "Style",
                items: [
                    { name: "See All Saree", link: "products-page" },
                    { name: "Ready to Ship Saree", link: "products-page" },
                    { name: "Embroidered Saree", link: "products-page" },
                    { name: "Designer Saree", link: "products-page" },
                    { name: "Sequin Saree", link: "products-page" },
                    { name: "Ready Pleated Saree", link: "products-page" },
                    { name: "Plain Saree with", link: "products-page" },
                    { name: "Plain Saree", link: "products-page" },
                    { name: "Classic Saree", link: "products-page" },
                    { name: "Printed Saree", link: "products-page" },
                ],
            },
        ],
    },
    {
        id: 3,
        title: "New Arrival 0",
        image: require("../../assets/images/CateMobi/img-3.png"),
        dropdown: [
            {
                category: "Style",
                items: [
                    { name: "See All Saree", link: "products-page" },
                    { name: "Ready to Ship Saree", link: "products-page" },
                    { name: "Embroidered Saree", link: "products-page" },
                    { name: "Designer Saree", link: "products-page" },
                    { name: "Sequin Saree", link: "products-page" },
                    { name: "Ready Pleated Saree", link: "products-page" },
                    { name: "Plain Saree with", link: "products-page" },
                    { name: "Plain Saree", link: "products-page" },
                    { name: "Classic Saree", link: "products-page" },
                    { name: "Printed Saree", link: "products-page" },
                ],
            },
        ],
    },
];


const CategoryMobile = () => {
    const [activeCategory, setActiveCategory] = useState(null); // Stores the active category
    const [activeDropdown, setActiveDropdown] = useState(null); // Stores the active dropdown category

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
                <div className="col-4 category-sidebar p-0 m-0"> 
                    <h5 className="category-title">Categories</h5>
                    <ul className="list-unstyled">
                        {DataConst.map((category, index) => (
                            <li
                                key={category.id}
                                className={`category-item  ${activeCategory === category.id ? "active" : ""
                                    }`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="category-image"
                                />
                                <span className="category-name">{category.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side */}
                <div className="col-8 category-content">
                    {activeCategory && (
                        <>
                            <h5 className="subcategory-title">
                                {DataConst.find((cat) => cat.id === activeCategory).title}
                            </h5>
                            {DataConst.find((cat) => cat.id === activeCategory).dropdown.map(
                                (dropdown, index) => (
                                    <div key={index} className="dropdown-section">
                                        <h6
                                            className="dropdown-category"
                                            onClick={() => handleDropdownClick(index)}
                                        >
                                            {dropdown.category}
                                            <span className="toggle-icon">
                                                {activeDropdown === index ? "-" : "+"}
                                            </span>
                                        </h6>
                                        {activeDropdown === index && (
                                            <ul className="list-unstyled dropdown-items">
                                                {dropdown.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <a href={item.link} className="dropdown-link">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                            )}
                        </>
                    )}
                    {!activeCategory && (
                        <p className="no-category">Select a category to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryMobile;
