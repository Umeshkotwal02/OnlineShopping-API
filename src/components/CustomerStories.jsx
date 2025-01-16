import React from "react";
import "../styles/CustomerStories.css";

const CustomerStories = ({ info }) => {
  return (
    <div className="customer-card">
      <div className="customer-image">
        <img
          src={info.file || "/images/customer-placeholder.jpeg"}
          alt="Customer"
        />
      </div>
      <h5 className="customer-name text-capitalize">{info.testimonial_name}</h5>
      <p className="customer-message text-capitalize">{info.testimonial_message}</p>
    </div>
  );
};

export default CustomerStories;
