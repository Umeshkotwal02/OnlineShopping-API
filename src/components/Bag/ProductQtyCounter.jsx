import React, { useEffect, useState } from "react";
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
    <div className="border border-[#CBCBCB] rounded-[5px] p-[5px] flex items-center gap-2">
      <button onClick={handleMinusProductQty}>
        <FaChevronLeft color="#555555" />
      </button>
      <p className="text-lg font-medium font-jost !leading-[1.1]">
        {productCount}
      </p>
      <button onClick={handleAddProductQty}>
        <FaChevronRight color="#555555" />
      </button>
    </div>
  );
};

export default ProductQtyCounter;
