import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";

const AboutUsPage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      About Us
    </span>,
  ];

  // Static data for the company info
  const fetchCompanyInfo = () => {
    setLoading(true);
    // Simulating fetching data with static content
    const data = {
      long_description: "Born in Mumbai, India in 2007, Kapoor evokes the very spirit of the city it was founded in. An upstart, innovative, and dynamic brand - Kapoor offers the best of contemporary, ethnic Indian fashion and fusion-wear styles. Staying true to the brand's unique promise of premium and wearable fashion, Kapoor unveils fresh collections and all-new designs throughout the fashion calendar. Kapoor design and aesthetic sensibility seek inspiration from all walks of life- be it the beauty of nature and heritage in art, architecture and culture, intricate creations, and the modern world to the home-bound handloom traditions of India.",
      vision: "To be a company that is a benchmark in the Indian fashion industry for its offerings and experiences.",
      mission: "To be a preferred company of choice in Indian fashion globally for its delightful customer service, and quality product offerings by constantly evolving using innovation and design.",
      details: [
        {
          image: require("../assets/images/OtherImgs/ceo.png"),
          name: "Shravan Gupta",
          position: "Chairman at Kailpar Engineering C Ltd",
          description: "From an early age, he saw the building up of textile capabilities, the diversification of its product base, and emergence which gave birth to the business idea. From specializing in sourcing & supplying quality textile raw materials across the world, today his efforts have let the company be one of the leading importers of silk fabrics. His contagious zeal has let fashion companies across the globe entrust the brand with their development needs. Later his idea gave birth to the brand, KAPOOR Fashion which has achieved a remarkable presence as a manufacturer & exporter in Women's Ethnic Wear.",
        },
      ],
    };
    setCompanyInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb list={breadcrumbArray} className="px-0" />
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        {!loading && companyInfo ? ( // Add this conditional check
          <div className="font-medium">
            <p className="text-justify font-medium" style={{ fontSize: "1.2rem", textAlign: "justify" }}>
              {companyInfo.long_description}
            </p>

            <h4 className="mt-4">Vision</h4>
            <p className="" style={{ fontSize: "1.15rem", textAlign: "justify" }}>
              {companyInfo.vision}
            </p>

            <h4 className="mt-4">Mission</h4>
            <p className="" style={{ fontSize: "1.15rem" }}>
              {companyInfo.mission}
            </p>

            <div className="">
              <h4 className="">Founders</h4>
              <p className="" style={{ fontSize: "1.15rem" }}>
                To be a preferred company of choice in Indian fashion globally for its delightful customer service, and quality product offerings by constantly evolving using innovation and design.
              </p>

              <div className="row">
                <div className="d-flex gap-4 mb-5 flex-row">
                  <div className="w-100" style={{ maxWidth: "250px" }}>
                    <img
                      src={require("../assets/images/OtherImgs/ceo.png")}
                      className="img-fluid rounded-3"
                      alt="Jasdeep Kapoor"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-100 flex-grow-1 align-self-center">
                    <p className="h4 text-black mb-3">
                      Shravan Gupta <br />
                      <small className="text-dark">Chairman at Kailpar Engineering C Ltd</small>
                    </p>
                    <p className="text-black" style={{ fontSize: "1.2rem",textAlign: "justify" }}>
                      From an early age, he saw the building up of textile capabilities, the diversification of its product base, and emergence which gave birth to the business idea. From specializing in sourcing & supplying quality textile raw materials across the world, today his efforts have let the company be one of the leading importers of silk fabrics. His contagious zeal has let fashion companies across the globe entrust the brand with their development needs. Later his idea gave birth to the brand, KAPOOR Fashion which has achieved a remarkable presence as a manufacturer & exporter in Women's Ethnic Wear
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p> // Loading fallback
        )}
      </Container>
    </>
  );

};

export default AboutUsPage;
