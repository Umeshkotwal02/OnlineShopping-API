import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Faq from "../components/Faq";
import { Container } from "react-bootstrap";

const FaqsPage = () => {
  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light text-decoration-none">
      FAQs
    </span>,
  ];

  // Static FAQ Data
  const [faqData, setFaqData] = useState([
    {
      question: "Can you tell me what kinds of payments Kesaria Textile Company will accept?",
      answer: "The Kesaria Textile Company accepts payments made via NEFT, Cash on Delivery (COD), UPI, Net Banking, Credit Card, Debit Card, and Wire Transfer.",
    },
    {
      question: "Do I have to pay anything else for shipping?",
      answer: "Shipping typically takes 5-7 business days, depending on your location.",
    },
    {
      question: "When can we expect delivery?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "When will I receive my order, and how will it be delivered?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How can I track the status of my order's delivery?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How will my order be packaged?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How does Kesaria Textile Company make sure its consumers don't have any trouble receiving their orders?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How can I place an order?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How to find saree manufacturer?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "Who is the biggest manufacturer of sarees in Surat?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How to become saree manufacturer?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "Which brand is best for sarees?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How to start selling sarees?",
      answer: "Yes, we offer international shipping to select countries.",
    },
    {
      question: "How to start a saree business without money?",
      answer: "Yes, we offer international shipping to select countries.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Simulating fetch operation
  const fetchFaqs = () => {
    setLoading(true);
    // Simulated API response with static data (already set above)
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <section className="">
        <Container fluid className="px-lg-5 px-xl-5 px-xxl-5 mb-5">
          <h3 className="h3 mb-4 text-start">Here are some common questions about Online Shop Company</h3>
          <Faq faqData={faqData} />
        </Container>
      </section>
    </>
  );
};

export default FaqsPage;
