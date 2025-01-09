import {
    Accordion,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
  } from "@mui/material";
  import React from "react";
  import { MdOutlineFilterList } from "react-icons/md";
  
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
  }) => {
    return (
      <>
        {/* Filter Button */}
        <div className="d-block d-lg-none fixed-bottom bg-warning px-3">
          <div className="d-flex justify-content-center align-items-center gap-2 text-center py-3">
            <MdOutlineFilterList size="24" />
            <div className="text-uppercase fw-bold" onClick={handleFilterClick}>
              Filter
            </div>
          </div>
        </div>
  
        {/* Filter Overlay */}
        {showFilterOverlay && (
          <div className="d-block d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column">
            {/* Header */}
            <div className="fs-4 fw-bold p-3 border-bottom">Filter By</div>
  
            {/* Filter Content */}
            <div className="d-flex flex-grow-1">
              {/* Sidebar */}
              <div className="w-25 border-end bg-light">
                {filterOptions?.map((filterdata, index) => {
                  if (filterdata.name.toLowerCase() !== "sort") {
                    return (
                      <div
                        key={index}
                        className={`p-3 border-bottom text-capitalize ${
                          activeFilterIndex === index ? "fw-bold bg-white" : ""
                        }`}
                        onClick={() => handleFilterChange(index)}
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                          cursor: "pointer",
                        }}
                      >
                        {filterdata.title}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
  
              {/* Filter Details */}
              <div className="w-75 p-3">
                {filterOptions?.map((filterdata, index) => {
                  if (
                    filterdata.name.toLowerCase() !== "sort" &&
                    activeFilterIndex === index
                  ) {
                    const sortedItems = filterdata.data?.sort((a, b) => {
                      const isCheckedA = selectedFilters[filterdata.name]?.includes(
                        a.value
                      );
                      const isCheckedB = selectedFilters[filterdata.name]?.includes(
                        b.value
                      );
                      return isCheckedB - isCheckedA;
                    });
  
                    return (
                      <div key={index}>
                        <Accordion defaultExpanded>
                          <AccordionDetails>
                            <FormGroup className="overflow-auto" style={{ maxHeight: "240px" }}>
                              {sortedItems?.map((item, itemIndex) => (
                                <FormControlLabel
                                  onClick={() =>
                                    handleCheckboxLocalChange(
                                      filterdata.name,
                                      item.value
                                    )
                                  }
                                  key={item.value + itemIndex}
                                  className="text-capitalize"
                                  control={
                                    <Checkbox
                                      checked={
                                        selectedFilters[filterdata.name]?.indexOf(
                                          item.value
                                        ) >= 0
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
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
  
            {/* Footer Buttons */}
            <div className="d-flex justify-content-center gap-3 py-2 border-top">
              <button
                className="btn btn-outline-dark"
                onClick={handleCloseClick}
              >
                Close
              </button>
              <button
                className="btn btn-warning"
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
  