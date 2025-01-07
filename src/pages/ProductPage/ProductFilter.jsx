import React, { useState } from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../../styles/ProductPage.css"

const data = [
  {
    title: "Category",
    name: "Category",
    items: [
      { label: "Umbrella Lehenga(983)", value: "electronics" },
      { label: "Classic Sherwani(419)", value: "fashion" },
      { label: "Indowestern Sherwani(407)", value: "home_kitchen" },
      { label: "A Line Lehenga(305)", value: "home_kitchen" },
      { label: "Dresses and Gown(169)", value: "home_kitchen" },
      { label: "Bangles(38)", value: "home_kitchen" },
      { label: "Umbrella Lehenga(983)", value: "electronics" },
      { label: "Classic Sherwani(419)", value: "fashion" },
      { label: "Indowestern Sherwani(407)", value: "home_kitchen" },
      { label: "A Line Lehenga(305)", value: "home_kitchen" },
      { label: "Dresses and Gown(169)", value: "home_kitchen" },
    ],
  },
  {
    title: "Fabric",
    name: "price",
    items: [
      { label: "Under $100", value: "under_100" },
    ],
  },
  {
    title: "Price",
    name: "price",
    items: [
      { label: "Under $100", value: "under_100" },
      { label: "$100 - $500", value: "100_500" },
      { label: "Above $500", value: "above_500" },
    ],
  },
  {
    title: "Color",
    name: "price",
    items: [
      { label: "Under $100", value: "under_100" },
    ],
  },
  {
    title: "Rating",
    name: "price",
    items: [
      { label: "Under $100", value: "under_100" },
    ],
  },
  {
    title: "Discount",
    name: "price",
    items: [
      { label: "Under $100", value: "under_100" },
    ],
  },
];

const ProductFilter = () => {
  const [isExpanded, setIsExpanded] = useState([]);

  const handleAccordionChange = (title) => {
    setIsExpanded((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleCheckboxChange = (filterName, value) => {
    console.log(`Filter: ${filterName}, Value: ${value}`);
    // Add your filter logic here
  };

  return (
    <Accordion className="product-page-accordion">
      {data.map((filterData, index) => (
        <Card key={index} className="border-0 border-bottom" style={{ borderRadius: "15px" }}>
          <Accordion.Item eventKey={index.toString()} style={{ borderRadius: "15px" }}>
            <Accordion.Header
              onClick={() => handleAccordionChange(filterData.title)}
              className="d-flex align-items-center"
              style={{ borderRadius: "15px" }}
            >
              <span className="text-capitalize fw-medium">
                {filterData.title}
              </span>
              <span className="ms-auto">
                {isExpanded.includes(filterData.title) ? (
                  <FaMinus />
                ) : (
                  <FaPlus />
                )}
              </span>
            </Accordion.Header>
            <Accordion.Body className="py-3" style={{ backgroundColor: "#F6F6F6" }}>
              <Form
                className="overflow-auto custom-scrollbar"
                style={{ maxHeight: "200px" }}
              >
                {filterData.items.map((item, itemIndex) => (
                  <Form.Check
                    key={item.value + itemIndex}
                    type="checkbox"
                    id={`${filterData.name}-${item.value}`}
                    label={item.label}
                    onChange={() =>
                      handleCheckboxChange(filterData.name, item.value)
                    }
                    className="text-capitalize py-1"
                  />
                ))}
              </Form>
            </Accordion.Body>

          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  );
};

export default ProductFilter;
