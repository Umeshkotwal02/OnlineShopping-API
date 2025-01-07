import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const SareeEditMobi = () => {
    return (
        <Container fluid className='py-4 px-4 px-md-2 d-lg-none'>
            {/* Bridal Edit */}
            <p className='text-center fs-2'>The Saree Edit</p>
            <p className='text-center' style={{ fontFamily: "Jost" }}><i>""Embrace the festival magic, let joy fill every moment."</i></p>
            <Row className=' ps-3 pe-3 p-md-12 SareeEdit'>
                <Col className='' >
                    <Row>
                        <Col md={8} sm={8} xs={8}>
                            <div className=''>
                                <img
                                    src={require('../../assets/images/SareeEdit/img4-Main.png')}
                                    className='w-100'
                                    alt="Bridal Edit"
                                />
                            </div>
                        </Col>
                        <Col md={4} sm={4} xs={4}>
                            <Row>
                                <div className='p-0'>
                                    <img
                                        src={require('../../assets/images/SareeEdit/img8.png')}
                                        className='w-100 '
                                        alt="Bridal Edit"
                                    />
                                </div>
                            </Row>
                            <Row>
                                <div className='p-0'>
                                    <img
                                        src={require('../../assets/images/SareeEdit/img9.png')}
                                        className='w-100'
                                        alt="Bridal Edit"
                                    />
                                </div>
                            </Row>
                        </Col>
                    </Row>

                    {/* secound row */}
                    <Row>
                        <Col md={4} sm={4} xs={4}>
                            <div className='p-0'>
                                <img
                                    src={require('../../assets/images/SareeEdit/img10.png')}
                                    className='w-100'
                                    alt="Bridal Edit"
                                />
                            </div>
                        </Col>
                        <Col md={8} sm={8} xs={8}>

                            <div className='p-0'>
                                <img
                                    src={require('../../assets/images/SareeEdit/img11.png')}
                                    className='w-100'
                                    alt="Bridal Edit"
                                />
                            </div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SareeEditMobi;
