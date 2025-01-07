import React from "react";
import { Offcanvas, Form } from "react-bootstrap";

const AddressOffcanvas = ({ show, handleClose }) => {

    const handleAddSubmit = () => {
        handleClose(true)
    }
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>New Address</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form className="Address-Form">
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Country" value="India"
                                    className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Full Name" className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Mobile Number"
                                    maxLength="10"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    className="Address-Form"
                                />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Flat, House, No, Building, Company"
                                    className="Address-Form"
                                />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Area, Street, Village" className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Landmark" className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="number" placeholder="Pincode" className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="Town/City" className="Address-Form" />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Control type="text" placeholder="State" className="Address-Form" />
                            </Form.Group>
                        </div>

                        <div className="mb-3">
                            <Form>
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Label className="me-2 mb-0 fw-medium">Use as default address</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        className="default-switch"
                                    />
                                </Form.Group>
                            </Form>

                        </div>
                        <button type="button mt-3" className="btn-payment w-100" onClick={handleAddSubmit}>
                            Submit
                        </button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default AddressOffcanvas;
