import React, { useState } from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../../styles/ProductPage.css"
import { FliterIcon, SortByIcon } from "../../assets/SvgIcons";


const ProductFilter = ({
  handleFilterClick,
  handleFilterChange,
  selectedFilters,
  handleCheckboxLocalChange,
  showFilterOverlay,
  filterOptions,
  activeFilterIndex,
  handleCloseClick,
  handleApplyFilters,
  handleSortByClick
}) => {
  const [isExpanded, setIsExpanded] = useState([]);

  const handleAccordionChange = (title) => {
    if (isExpanded.includes(title)) {
      setIsExpanded(isExpanded.filter((t) => t !== title));
    } else {
      setIsExpanded([...isExpanded, title]);
    }
  };

  const handleCheckboxChange = (filterName, value) => {
    handleCheckboxLocalChange(filterName, value);
  };

  return (
    <>
      <div className="d-block d-lg-none d-flex justify-content-evenly align-items-center gap-2 fixed-bottom w-100 z-50" style={{ backgroundColor: "#B51B3B" }}>
        <div className="d-flex justify-content-center align-items-center gap-2 text-xl fw-medium text-center py-4">
          <FliterIcon size={24} />
          <div className="text-white" onClick={handleFilterClick}>
            Filter
          </div>
        </div>
        <div className="display-1" style={{ color: "#FFFFFF80" }}>|</div>
        <div className="d-flex justify-content-center align-items-center gap-2 text-xl fw-medium text-center py-4" >
          <SortByIcon size={24} />
          <div className="text-white" onClick={handleSortByClick}>
            Sort
          </div>
        </div>
      </div>

      {showFilterOverlay && (
        <div className="d-block d-lg-none position-fixed top-0 start-0 w-100 h-100 z-1002 bg-white d-flex flex-column">
          <div className="fs-5 fw-medium p-3 border-bottom">
            FILTER BY
          </div>

          <div className="flex-grow-1 d-flex">
            <div className="">
              {filterOptions?.map((filterData, index) => {
                if (filterData.name.toLowerCase() !== "sort") {
                  return (
                    <div
                      key={index}
                      className={`p-3 cursor-pointer text-capitalize ${activeFilterIndex === index ? "" : ""
                        }`}
                      onClick={() => handleFilterChange(index)}
                    >
                      {filterData.title}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="w-75 p-3">
              <Accordion className="product-page-accordion">
                {filterOptions?.map((filterData, index) => {
                  if (
                    filterData.name.toLowerCase() !== "sort" &&
                    activeFilterIndex === index
                  ) {
                    const sortedItems = filterData.data?.sort((a, b) => {
                      const isCheckedA = selectedFilters[
                        filterData.name
                      ]?.includes(a.value);
                      const isCheckedB = selectedFilters[
                        filterData.name
                      ]?.includes(b.value);
                      return isCheckedB - isCheckedA;
                    });

                    return (
                      <Card
                        key={index}
                        className="border-0 border-bottom"
                        style={{ borderRadius: "15px" }}
                      >
                        <Accordion.Item
                          eventKey={index.toString()}
                          style={{ borderRadius: "15px" }}
                        >
                          <Accordion.Header
                            onClick={() =>
                              handleAccordionChange(filterData.title)
                            }
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
                          <Accordion.Body
                            className="py-3"
                            style={{ backgroundColor: "#F6F6F6" }}
                          >
                            <Form
                              className="overflow-auto custom-scrollbar"
                              style={{ maxHeight: "200px" }}
                            >
                              {sortedItems?.map((item, itemIndex) => (
                                <Form.Check
                                  key={item.value + itemIndex}
                                  type="checkbox"
                                  id={`${filterData.name}-${item.value}`}
                                  label={item.label}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      filterData.name,
                                      item.value
                                    )
                                  }
                                  className="text-capitalize py-1"
                                />
                              ))}
                            </Form>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    );
                  }
                  return null;
                })}
              </Accordion>
            </div>
          </div>

          <div className="d-flex justify-content-center py-2 border-top">
            <button
              className="btn btn-link fs-5 fw-medium"
              onClick={handleCloseClick}
            >
              Close
            </button>
            <button
              className="btn btn-link fs-5 fw-medium"
              onClick={handleApplyFilters}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
