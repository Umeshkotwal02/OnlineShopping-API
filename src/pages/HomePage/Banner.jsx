import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Banner = ({ saleBanner }) => {
  return (
    <Container fluid className='px-lg-5 px-xl-5 px-xxl-5'>
      <Row>
        <Col className='px-0'>
          <Link to='/' className='d-none d-md-block'>
            {saleBanner?.map((item, index) => (
              <img
                key={item}
                src={item?.file}
                alt={`Banner4 ${index + 1}`}
                className="w-100"
                style={{
                  boxShadow: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)",
                  borderRadius: "30px"
                }}
              />
            ))}
          </Link>
          <Link to='/' className='d-block d-md-none'>
            {saleBanner?.map((item, index) => (
              <img
                key={index}
                src={item?.file}
                alt={`Slide ${index + 1}`}
                className="w-100"
                style={{
                  background: "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)"
                }}
              />
            ))}
          </Link>
        </Col>
      </Row>
    </Container>
  );
};


export default Banner;
