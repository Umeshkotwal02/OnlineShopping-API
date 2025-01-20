import React, { useEffect, useState } from "react";
import { button } from "react-bootstrap";
import "../../styles/ProductDetails.css";


const QuantityCounter = ({ onChange, quantity }) => {
  const [countValue, setCountValue] = useState(quantity || 1);

  const handleIncrement = () => {
    setCountValue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCountValue((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (onChange) onChange(countValue);
  }, [countValue, onChange]);

  return (
    <div className="d-flex align-items-start">
      <button
        onClick={handleDecrement}
        className="px-3  start-qut-btn"
      >
        -
      </button>
      <button
        onClick={handleIncrement}
        className="px-3  qut-btn"
      >
        {countValue}
      </button>
      <button
        onClick={handleIncrement}
        className="px-3  end-qut-btn"
      >
        +
      </button>
    </div>

  );
};

export default QuantityCounter;
