import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/NewOnOnlineSwiper.css";

const NewArrivalOfferCard = ({ itemInfo }) => {
  const navigate = useNavigate();

  // Function to create a URL-friendly product name
  const productName = (name = "") => {
    return name.trim().replace(/\s+/g, "-").toLowerCase();
  };

  // Function to truncate the product name for display
  const truncateProductName = (name) => {
    if (name.length > 22) {
      return name.substring(0, 22) + "...";
    }
    return name;
  };

  return (
    <div className="new-on-online">
      {/* Product Image */}
      <div className="new-on-online-image">
        <img
          src={itemInfo?.product_image || "/images/line-lehenga.png"}
          className="new-on-online-img"
          alt="product"
          onClick={() =>
            navigate(`/product/${itemInfo.id}/${productName(itemInfo.product_name)}`)
          }
          loading="lazy"
        />
      </div>

      {/* Product Name */}
      <h3
        className="position-absolute start-0 bottom-0 text-center text-dark fw-medium text-rotate text-uppercase p-3"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "1rem" }}
      >
        {truncateProductName(itemInfo?.product_name || "")}
      </h3>

      {/* Discount Label */}
      <h3 className="new-on-online-discount">
        MIN {parseInt(itemInfo?.product_discount)}% OFF
      </h3>
    </div>
  );
};

export default NewArrivalOfferCard;
