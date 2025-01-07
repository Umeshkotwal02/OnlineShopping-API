import React, { useState } from "react";
import { Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const filterOptions = [
  {
    name: "sort",
    data: [
      { label: "Sort by Latest", value: "newest" },
      { label: "Sort By Low To High Price", value: "low_to_high" },
      { label: "Sort By High To Low Price", value: "high_to_low" },
    ],
  },
];

const SortBy = () => {
  const [selectedSortValue, setSelectedSortValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state

  const changeFilterData = ({ key, val }) => {
    console.log(`Filter Key: ${key}, Value: ${val}`);
    setSelectedSortValue(val);
  };

  return (
    <Accordion className="border-0 sort-by">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="d-flex align-items-center gap-3">
            <span>Sort by:</span>
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
                    <span className="" style={{ marginLeft: "55px", }}>
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
                {filterOptions[0]?.data.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() =>
                      changeFilterData({
                        key: filterOptions[0].name,
                        val: option.value,
                      })
                    }
                    className="border-bottom px-0 py-2"
                    style={{ fontSize: "1rem" }}
                  >
                    {option.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
        </Accordion.Header>
      </Accordion.Item>
    </Accordion>
  );
};

export default SortBy;
