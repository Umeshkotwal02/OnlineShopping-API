import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Faq from "../components/Faq";
import { Container } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../Constant/constApi";

const FaqsPage = () => {
  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light text-decoration-none">
      FAQs
    </span>,
  ];

  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating fetch operation
  const fetchFaqs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}Faqs`);
      if (data && data?.STATUS === 200) {
        setFaqData(data?.DATA || []);
        // console.log("shajshja", data?.DATA);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.MESSAGE || err?.message || "Failed to fetch faqs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <div className="loader-circle-9">
              Kapoor
              <span></span>
            </div>
          </div>
        </div>
      )}
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
