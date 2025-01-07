import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";

const PrivancyPolicy = () => {
  const [policy, setPolicy] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static data simulating the API response
  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light">
      Privacy Policy
    </span>,
  ];

  // Static privacy policy data
  const policyData = [
    {
      title: "What do we do with your information?",
      content: `When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
      When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
      Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.`,
    },
    {
      title: "How do you get my consent?",
      content: `When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
      If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
      How do I withdraw my consent?
      If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at info.kesaria@kesariatextile.com`,
    },
    {
      title: "Changes to this privacy policy",
      content: `We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
      If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.`,
    },
    {
      title: "Disclosure",
      content: `We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.`,
    },
    {
      title: "Age of consent",
      content: `By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.`,
    },
    {
      title: "Security",
      content: `To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
      If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.`,
    },
  ];

  // Simulate loading of static data
  useEffect(() => {
    setLoading(false);
    setPolicy(policyData);
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
        <div className="privacy-policy-container mb-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            policy.map((policyItem, index) => (
              <div key={index} className="privacy-policy-section">
                <h4 className="mt-4">{policyItem.title}</h4>
                <p
                  className="text-medium"
                  style={{ fontSize: "1.2rem", textAlign: "justify", color:"black" }}
                >
                  {formatContent(policyItem.content)}
                </p>
              </div>
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default PrivancyPolicy;