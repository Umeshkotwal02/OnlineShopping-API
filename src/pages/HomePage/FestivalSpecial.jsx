import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FestivalSpecial = () => {
    return (
        <Container fluid className="py-0 pt-4 px-md-2 px-lg-5 px-xl-5 px-xxl-5">
            {/* Bridal Edit */}
            <div>
                <h3 className="text-center d-none d-lg-block mt-2" style={{ fontWeight: "400" }}>Festival Special
                </h3>
                <h3 className="text-start font-bold d-lg-none my-3 ms-2 mt-4">Festival Special</h3>
                <p className="text-center font-italic d-none d-lg-block"><i> "Embrace the festival magic, let joy fill every moment."</i></p>
            </div>
            <Row className="p-3 p-md-12 bridalBack h-75">
                <Col xs={12} md={12}>
                    <Row>
                        <Col xs={12} md={12} lg={12} xl={5} xxl={5} className="p-0 pe-3">
                            <div className="p-0">
                                <img
                                    src={require('../../assets/images/Festival-Special/img1.png')}
                                    className="w-100 transition-transform"
                                    alt="Bridal Edit"
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={12} lg={12} xl={7} xxl={7} className="pe-md-5">
                            <Row className="h-100">
                                <Col xs={12} className="pb-2 pb-lg-3" style={{ height: '50%' }}>
                                    <div className="p-0">
                                        <img
                                            src={require('../../assets/images/Festival-Special/img4.png')}
                                            className="w-100"
                                            alt="Bridal Edit"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} style={{ height: '50%' }}>
                                    <div className="pt-3">
                                        <img
                                            src={require('../../assets/images/Festival-Special/img2.png')}
                                            className="w-100"
                                            alt="Bridal Edit"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} style={{ height: '50%' }}>
                                    <div className="pt-3 ">
                                        <img
                                            src={require('../../assets/images/Festival-Special/img3.png')}
                                            className="w-100"
                                            alt="Bridal Edit"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default FestivalSpecial;