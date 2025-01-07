import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <Container fluid className='px-lg-5 px-xl-5 px-xxl-5'>
    <Row>
      <Col className='px-0'>
        <Link to='/' className='d-none d-md-block'>
          <img src={require('../../assets/images/Banner/Banner.png')} className='w-100' alt="" />
        </Link>
        <Link to='/' className='d-block d-md-none'>
          <img src={require('../../assets/images/Banner/Banner2.png')} className='w-100' alt="" />
        </Link>
      </Col>
    </Row>
  </Container>
  );
};


export default Banner;
