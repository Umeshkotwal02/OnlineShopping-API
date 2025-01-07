import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/NewOnOnlineSwiper.css';

const NewArrivalOfferCard = ({ itemInfo }) => {
    const navigate = useNavigate();

    const productName = itemInfo?.product_name.replace(/\s+/g, "-").toLowerCase();

    const truncateProductName = (name) => {
        if (name.length > 18) {
            return name.substring(0, 22) + "...";
        }
        return name;
    };

    return (
        <div
            className="new-on-online"
        >
            <div className="new-on-online-image">
                <img
                    src={itemInfo?.product_image || "/images/line-lehenga.png"}
                    className="new-on-online-img"
                    alt="product"
                    onClick={() => navigate(`/product/${productName}`)}
                    loading="lazy"
                />
            </div>
            <h3 className="new-on-online-name">
                {truncateProductName(itemInfo?.product_name || "")}
            </h3>
            <h3 className="new-on-online-discount">
                MIN {parseInt(itemInfo?.product_discount)}% OFF
            </h3>

        </div>
    );
};

export default NewArrivalOfferCard;
