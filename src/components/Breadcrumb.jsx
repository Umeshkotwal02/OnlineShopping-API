import React from "react";
import { Breadcrumbs } from "@mui/material";
import { FaChevronRight } from "react-icons/fa6";
const Breadcrumb = ({ list }) => {
  return (
    <div className="bg-white px-lg-5 px-xl-5 px-xxl-5 d-none d-lg-block">
      <div className="py-2 w-100 px-1 mx-auto " style={{ maxWidth: "1804px" }}>
        <Breadcrumbs
          separator={<FaChevronRight className="text-sm  fw-normal" />}
          aria-label="breadcrumb"
        >
          {list}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Breadcrumb;
