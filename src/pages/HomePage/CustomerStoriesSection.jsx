import React from "react";
// import CustomerStories from "./CustomerStories";
import "../../styles/CustomerStories.css";
import CustomerStories from "../../components/CustomerStories";

const CustomerStoriesSection = ({ data }) => {

    return (
        <section className="customer-stories-section">
            <h2 className="customer-section-title">Customer Stories</h2>
            <div className="customer-container">
                {data?.testimonials?.map((item, index) => (
                    <div className="customer-card-wrapper" key={index}>
                        <CustomerStories info={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CustomerStoriesSection;
