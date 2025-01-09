import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OnlineShopDesignStudio = ({ data }) => {
  return (
    <section style={{ marginTop: '50px', marginBottom: '60px' }}>
      <Container fluid className="px-lg-5 px-xl-5 px-xxl-5">
        <Row className="text-center mb-5">
          <Col>
            <h2
              style={{
                fontSize: '2rem',
                paddingBottom: '1.25rem',
                display: 'inline-block',
              }}
              className="fw-normal mb-0"
            >
              {data?.DISCRIPTION?.[0]?.main_title}
            </h2>
            <div
              style={{
                borderBottom: '1px solid black',
                marginRight: '11rem',
                marginLeft: '11rem',
              }}
            ></div>
          </Col>
        </Row>

        <div>
          <Row>
            <Col>
              {data?.DISCRIPTION?.map((item, index) => {
                if (index !== 0) {
                  return (
                    <div key={index} style={{ marginBottom: '1.25rem' }}>
                      <h4
                        style={{
                          fontSize: '1.125rem',
                          lineHeight: '1.25rem',
                          fontWeight: '400',
                          color: 'black',
                          marginBottom: '1rem',
                        }}
                      >
                        {item?.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          lineHeight: '1.25rem',
                          color: '#7A7A7A',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {item?.description}
                      </p>
                    </div>
                  );
                }
                return null; // Skip rendering for the first element
              })}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default OnlineShopDesignStudio;
