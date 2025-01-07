import React from "react";
// import CustomerStories from "./CustomerStories";
import "../../styles/CustomerStories.css";
import CustomerStories from "../../components/CustomerStories";

export const testimonialsData = [
    {
        file: require("../../assets/images/CoustomerStories/img1.png"),
        testimonial_name: "Poornima Naik",
        testimonial_message: "Beautiful Saree.. Quick Delivery And We'll Cooperative Staff.. Personally Shared Details And Videos Of Product Before Delivery.. Loved It.. Thank You Anaya 🙂",
    },
    {
        file: require("../../assets/images/CoustomerStories/img2.png"),
        testimonial_name: "Rubina Bhati",
        testimonial_message: "Loved the clothing. The fabric is breathable and comfortable. Look wise also it's fine. The colour is a little dull but the embroidery is very good. The Dupatta is just amazing. Loved the combo. One minus point that the pearls or other beads are coming out in one wash. Rest is fine..",
    },
    {
        file: require("../../assets/images/CoustomerStories/img3.png"),
        testimonial_name: "Muskan Sharma",
        testimonial_message: "I placed an order for a red georgette online. The saree was delivered before the promised date and the quality was good. Also, a pair of ear rings were sent as a compliment. Their customer service needs a special mention. Would definitely recommend them.",
    },
];


const CustomerStoriesSection = () => {
  
    return (
            <section className="customer-stories-section">
                <h2 className="customer-section-title">Customer Stories</h2>
                <div className="customer-container">
                    {testimonialsData.map((item, index) => (
                        <div className="customer-card-wrapper" key={index}>
                            <CustomerStories info={item} />
                        </div>
                    ))}
                </div>
            </section>
    );
};

export default CustomerStoriesSection;
