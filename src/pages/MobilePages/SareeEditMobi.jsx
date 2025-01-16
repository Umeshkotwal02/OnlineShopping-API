import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { SarreEditIcon } from '../../assets/SvgIcons';

const SareeEditMobi = ({ data }) => {
    return (
        <div className="container my-5">
            <div className="row g-3">
                {/* Central Highlighted Image */}

                {/* Side Images */}

                <div className="col-md-9">
                    <img
                        src={data?.multiple_images?.files?.[1]}
                        className="img-fluid w-100 h-100 object-fit-cover rounded-4"
                        alt="Side 1"
                    />
                </div>
                <div className="col-md-3">
                    <Col>
                        <img
                            src={data?.multiple_images?.files?.[2]}
                            className="img-fluid w-100 h-100 object-fit-cover rounded-4"
                            alt="Side 2"
                        />
                    </Col>
                    <Col>
                        <img
                            src={data?.multiple_images?.files?.[3]}
                            className="img-fluid w-100 h-50 object-fit-cover rounded-4"
                            alt="Side 3"
                        />
                    </Col>
                </div>
                <div className="col-md-5">
                    <img
                        src={data?.multiple_images?.files?.[4]}
                        className="img-fluid w-100 h-100 object-fit-cover rounded-4"
                        alt="Side 3"
                    />
                </div>
                <div className="col-md-7">
                    <img
                        src={data?.multiple_images?.files?.[5]}
                        className="img-fluid w-100 h-100 object-fit-cover rounded-4"
                        alt="Side 4"
                    />
                </div>
            </div>
        </div>
    );
}

export default SareeEditMobi;
