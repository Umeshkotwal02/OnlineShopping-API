import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../Constant/constApi";

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

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}about_company`);
      if (data && data?.STATUS === 200) {
        setCompanyInfo(data?.DATA?.[0]);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.MESSAGE ||
          err?.message ||
          "Failed to fetch information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb list={breadcrumbArray} className="px-0" />
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        {!loading && companyInfo ? (
          <div className="fw-medium">
            {/* Company Info */}
            <p
              className="text-justify fw-medium"
              style={{ fontSize: "1.2rem", textAlign: "justify" }}
            >
              {companyInfo.long_description}
            </p>

            <h4 className="mt-4">Vision</h4>
            <p
              className=""
              style={{ fontSize: "1.15rem", textAlign: "justify" }}
            >
              {companyInfo?.vision}
            </p>

            <h4 className="mt-4">Mission</h4>
            <p className="" style={{ fontSize: "1.15rem" }}>
              {companyInfo.mission}
            </p>

            {/* Founders Section */}
            <div className="">
              <h4 className="mt-4">Founders</h4>
              {companyInfo.details && companyInfo.details.length > 0 ? (
                companyInfo.details.map((founder, index) => (
                  <div className="row my-4" key={index}>
                    <div className="col-md-4">
                      <img
                        src={founder.image}
                        className="img-fluid rounded-3"
                        alt={founder.name}
                        loading="lazy"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <p className="fs-4 fw-bold text-black mb-2">
                        {founder.name}
                      </p>
                      <p className="fs-5 text-muted mb-2">
                        {founder.position}
                      </p>
                      <p className="fs-6 text-black">
                        {founder.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No founders' details available.</p>
              )}
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
