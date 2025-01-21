import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Constant/constApi";

const PrivancyPolicy = () => {
  const [policy, setPolicy] = useState(null); // Changed to null since the policy is a single object
  const [loading, setLoading] = useState(true);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Privacy Policy
    </span>,
  ];

  const fetchpolicyApi = async () => {
    try {
      const response = await axios.get(`${API_URL}Infopages`);
      if (response.data && response.data.DATA) {
        setPolicy(response.data.DATA);
      } else {
        setPolicy(null); // Fallback to null if data is not available
      }
    } catch (error) {
      console.error("There was an error fetching the policy!", error);
      setPolicy(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpolicyApi();
  }, []);
  
  const insertLineBreaks = (content) => {
    return content.replace(/\./g, ".<br/>");
  };

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        <div className="privacy-policy-container mb-5">
          {loading ? (
            <p>Loading...</p>
          ) : policy ? (
            <div
              className="text-medium"
              style={{ fontSize: "1.2rem", textAlign: "justify", color: "black" }}
              dangerouslySetInnerHTML={{
                __html: insertLineBreaks(policy.privacy_policy),
              }}
            />
          ) : (
            <p>No policies available at the moment.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default PrivancyPolicy;
