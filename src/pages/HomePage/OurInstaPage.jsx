import React from "react";
import "../../styles/OurInstaPage.css";
import { Link } from "react-router-dom";

const OurInstaPage = ({ instaBanner }) => {
    return (
        <Link
            to={`https://www.instagram.com/kapoorlehengasaree/`}
            className="text-decoration-none"
        >
            <div className="our-stores-section">
                <div className="position-relative mx-auto our-stores-wrapper">
                    {/* Background Image */}
                    <div className="our-stores-image" style={{
                        backdropFilter: "blur(2px)"
                    }}>
                        {instaBanner?.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt={`Our Story + insta-page`}
                                className="img-fluid"
                                style={{
                                    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)"
                                }}
                            />
                        ))}
                    </div>
                    <div className="position-relative z-index-10 d-inline-block text-center px-3 py-2 py-md-4 py-xl-4 text-white" >
                        <h1 className="h3 h-xl5 our-stores-button" style={{ fontFamily: "Junge" }}>VISIT OUR INSTAGRAM DIARIES</h1>
                        <p className="mb-0 lead follow" style={{ fontFamily: "Roboto" }}>FOLLOW TO KNOW MORE</p>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default OurInstaPage;
