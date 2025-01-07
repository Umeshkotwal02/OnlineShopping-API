import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";

const TermAndConditionPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data simulating the API response
  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Terms & Condition
    </span>,
  ];

  // Static Terms terms data
  const termsConData = [
    {
      title: "Terms & Condition",
      content: `The Website Owner, including subsidiaries and affiliates (“www.ktcfashion.com” or “Kesaria” or “we” or “us” or “our”) provides the information contained on the website or any of the pages comprising the website (“website”) to visitors (“visitors”) (cumulatively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.

      The term 'you' refers to the user or viewer of our website.
      If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern http://www.Kesariatextile.in's relationship with you in relation to this website.`,
    },
    {
      title: "The use of this website is subject to the following terms of use",
      content: `1. The content of the pages of this website is for your general information and use only.It is subject to change without notice

      2. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law
      
      3. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements
      
      4. This website contains material which is owned by or licensed to us.This material includes, but is not limited to, the design, layout, look, appearance and graphics.Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions
      
      5. All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website
      
      6. Unauthorized use of this website may give rise to a claim for damages and/ or be a criminal offence
      
      7. From time to time this website may also include links to other websites.These links are provided for your convenience to provide further information.They do not signify that we endorse the website.We have no responsibility for the content of the linked website

  8. You may not create a link to this website from another website or document without Kesaria prior written consent

  9. Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority`,
    },
  ];

  // Simulate loading of static data
  useEffect(() => {
    setLoading(false);
    setTerms(termsConData);
  }, []);

  // Function to insert line breaks in text
  const formatContent = (content) => {
    return content.split("\n").map((text, index) => (
      <React.Fragment key={index}>
        {text.trim()}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        <div className="privacy-terms-container mb-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            terms.map((termsItem, index) => (
              <div key={index} className="privacy-terms-section">
                <h4 className="mt-4">{termsItem.title}</h4>
                <p
                  className="text-medium"
                  style={{ fontSize: "1rem", textAlign: "justify", color: "black" }}
                >
                  {formatContent(termsItem.content)}
                </p>
              </div>
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default TermAndConditionPage;