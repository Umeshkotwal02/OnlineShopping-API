import React, { useState } from "react";

const Faq = ({ faqData }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleAccordionChange = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="accordion" id="faqAccordion">
      {faqData.map((item, index) => {
        const id = "faqs" + index;
        const isExpanded = expandedId === id;

        return (
          <div
            className="mb-3"
            key={id}
            style={{
              backgroundColor: isExpanded ? "white" : "#F3F3F3",
              border: isExpanded ? "2px solid black" : "",
              transition: "all 0.3s ease",
              borderRadius: "10px"
            }}
          >
            <h2 className="accordion-header" id={`${id}-header`}>
              <button
                className={`accordion-button fw-normal ${!isExpanded ? "collapsed" : ""}`}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={id}
                onClick={() => handleAccordionChange(id)}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#F3F3F3",
                  fontSize: "1.1rem"
                }}
              >
                {item.page_title}
              </button>
            </h2>
            <div
              id={id}
              className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
              aria-labelledby={`${id}-header`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body" style={{ color: "#6C6C6C", fontSize:"0.83rem" }}>{item.page_description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
