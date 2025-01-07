import React from "react";
import "../../styles/OurInstaPage.css";

const OurInstaPage = () => {
    return (
        <div fluid className="our-stores-section">
            <div className="position-relative mx-auto our-stores-wrapper">
                {/* Background Image */}
                <div className="our-stores-image">
                    <img
                       src={require("../../assets/images/instpage.png")}
                        alt="Our Story"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default OurInstaPage;
