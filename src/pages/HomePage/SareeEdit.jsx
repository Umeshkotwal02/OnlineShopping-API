import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SarreEditIcon } from "../../assets/SvgIcons";

const SareeEdit = ({ data }) => {
    return (
        <Container fluid className='px-md-2 px-lg-5 px-xl-5 px-xxl-5 py-lg-5 py-xl-5 py-xxl-5'>
            {/* Bridal Edit */}
            <h3 className="text-start fw-bold my-3 ms-2 mt-4 d-lg-none">The Saree Edit</h3>
            <p className='fw-normal text-center fs-3 d-none d-lg-block text-black'>The Saree Edit</p>
            <p className='text-center fw-normal d-none d-lg-block' style={{ fontFamily: "Jost", color: "black" }}><i>"Embrace the festival magic, let joy fill every moment."</i></p>
            <Row className="justify-content-center g-3">
                {/* Left Section */}
                <Col lg={4} md={4} className="d-grid gap-4">
                    <Row className="g-3">
                        <div className="col-12">

                            <img
                                src={data?.multiple_images?.files?.[0]}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="1"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-6">

                            <img
                                src={data?.multiple_images?.files?.[1]}

                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="2"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-6">

                            <img
                                src={data?.multiple_images?.files?.[2]}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="3"
                                loading="lazy"
                            />
                        </div>
                    </Row>
                </Col>

                {/* Center Section */}
                <Col lg={4} md={4}>
                    <div className="position-relative overflow-hidden h-100">
                        <img
                            src={data?.multiple_images?.files?.[3]}

                            className="img-fluid rounded-4 object-cover transition-transform scale-hover h-100"
                            alt="4"
                            loading="lazy"
                        />
                        <div className="position-absolute bottom-0 start-0 end-0 bg-opacity-75 bg-dark text-white rounded-4">
                            <h3 className="text-center my-2 fs-5">
                                Pre Drape All Sarees <span className="ps-2"><SarreEditIcon /></span>
                            </h3>
                        </div>
                    </div>
                </Col>

                {/* Right Section */}
                <Col lg={4} md={4} className="d-grid gap-4">
                    <Row className="g-3">
                        <div className="col-6">

                            <img
                                src={data?.multiple_images?.files?.[6]}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="5"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-6">

                            <img
                                src={data?.multiple_images?.files?.[5]}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="6"
                                loading="lazy"
                            />
                        </div>
                        <div className="col-12">

                            <img
                                src={data?.multiple_images?.files?.[4]}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt="7"
                                loading="lazy"
                            />
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default SareeEdit;