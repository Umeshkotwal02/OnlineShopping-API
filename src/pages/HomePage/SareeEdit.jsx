import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import SareeEditMobi from '../MobilePages/SareeEditMobi';

const SareeEdit = ({ data }) => {
    return (
        <>
            <Container fluid className='px-md-2 d-none d-lg-block px-lg-5 px-xl-5 px-xxl-5 py-lg-5 py-xl-5 py-xxl-5'>
                {/* Bridal Edit */}
                <p className='text-center fs-2'>The Saree Edit</p>
                <p className='text-center' style={{ fontFamily: "Jost" }}><i>""Embrace the festival magic, let joy fill every moment."</i></p>
                <Row className=' ps-3 pe-3 p-md-12 SareeEdit'>
                    <Col className='col-12 col-md-12' >
                        <Row>
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Row>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[0]}
                                                className='w-100'
                                                alt="Bridal Edit-1"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='pt-4'>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[1]}
                                                className='w-100'
                                                alt="Bridal Edit-2"
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[2]}
                                                className='w-100'
                                                alt="Bridal Edit-3"
                                            />
                                        </div>

                                    </Col>

                                </Row>
                            </Col>
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <div className='p-0'>
                                    <img
                                        src={data?.multiple_images?.files[4]}
                                        className='w-100'
                                        alt="Bridal Edit-4"
                                    />
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Row>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[4]}
                                                className='w-100'
                                                alt="Bridal Edit-5"
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[5]}
                                                className='w-100'
                                                alt="Bridal Edit-6"
                                            />
                                        </div>

                                    </Col>

                                </Row>
                                <Row className='pt-4'>
                                    <Col>
                                        <div className='p-0'>
                                            <img
                                                src={data?.multiple_images?.files[6]}
                                                className='w-100'
                                                alt="Bridal Edit-7"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <SareeEditMobi />
        </>
    );
}

export default SareeEdit;
