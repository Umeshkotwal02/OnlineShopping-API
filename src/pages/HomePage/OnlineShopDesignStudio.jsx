import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../../styles/OnlineShopDesignStudio.css";

const OnlineShopDesignStudio = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState(2); // Default to 2 items on small screens

  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        // Mobile (extra small screens)
        setVisibleItems(3);
      } else if (screenWidth >= 576 && screenWidth < 768) {
        // Small tablets
        setVisibleItems(3);
      } else if (screenWidth >= 768 && screenWidth < 992) {
        // Large tablets (md)
        setVisibleItems(4);
      } else {
        // Desktop and larger screens (lg, xl, xxl)
        setVisibleItems(data?.DISCRIPTION?.length); // Show all items
      }
    };

    // Run on component mount
    updateVisibleItems();

    // Add event listener for window resize
    window.addEventListener('resize', updateVisibleItems);

    // Clean up the event listener
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [data]);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="online-shop-section">
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="main-title">
              {data?.DISCRIPTION?.[0]?.main_title}
            </h2>
            <div className="divider"></div>
          </Col>
        </Row>

        <div className='Below-Data'>
          <Row>
            <Col>
              {data?.DISCRIPTION?.map((item, index) => {
                if (index !== 0 && (showAll || index < visibleItems)) {
                  return (
                    <div key={index} className="description-item">
                      <h4 className="description-title">
                        {item?.title}
                      </h4>
                      <p className="description-text">
                        {item?.description}
                      </p>
                    </div>
                  );
                }
                return null;
              })}

              {/* Conditional "Read More" or "Show Less" button */}
              <div className="text-center">
                {data?.DISCRIPTION?.length > visibleItems && (
                  <div
                    className="text-start fw-bold"
                    style={{ color: "#B51B3B", cursor: "pointer" }}
                    onClick={handleToggle}
                  >
                    {showAll ? 'Show Less...' : 'Read More...'}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default OnlineShopDesignStudio;
