import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Constant/constApi";

const TermAndConditionPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Terms & Condition
    </span>,
  ];

  const fetchTermsApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}Infopages`);
      setTerms(response.data.DATA);
    } catch (error) {
      console.error("There was an error fetching the terms!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsApi();
  }, []);

  // Function to insert line breaks in text
  const insertLineBreaks = (content) => {
    return content.replace(/\./g, ".<br/>");
  };

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        <div className="privacy-terms-container mb-5">
          <div className="py-10">
            <h4 className="text-xl lg:text-2xl font-medium mb-3">Terms & Condition</h4>
            <p className="text-medium"
              style={{ fontSize: "1rem", textAlign: "justify", color: "black" }}x>
              {terms.term_and_condition ? (
                <div
                  className="text-sm xl:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: insertLineBreaks(terms.term_and_condition),
                  }}
                />
              ) : (
                <p>No terms and conditions available at the moment.</p>
              )}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndConditionPage;
