import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const ProductQtyCounter = ({ onChange, defaultValue }) => {
  const [productCount, setProductCount] = useState(defaultValue || 1);

  const handleAddProductQty = () => {
    setProductCount((prev) => ++prev);
  };
  const handleMinusProductQty = () => {
    setProductCount((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    onChange && onChange(productCount);
  }, [productCount]);

  return (
    <div className="d-flex align-items-center border rounded p-1">
      <Button variant="light" onClick={handleMinusProductQty} size="sm" className="p-0">
        <FaChevronLeft color="#555555" />
      </Button>
      <p className="fs-5 fw-medium m-0">
        {productCount}
      </p>
      <Button variant="light" size="sm" className="p-0" onClick={handleAddProductQty}>
        <FaChevronRight className="text-secondary" />
      </Button>
    </div>

  );
};

export default ProductQtyCounter;
