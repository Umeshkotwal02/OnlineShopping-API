import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container } from "react-bootstrap";
import "../../styles/CheckOutPage.css";
import BagCard from "./BagCard";
import AddressOffcanvas from "./AddressCanva";

// Here use static data create array and map it & here used tailwind css replace it with react Bootstrap or normal css
const AddressCard = ({ info, fetchAddresses, onSelectAddress }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddresscanvas, setShowAddresscanvas] = useState(false); // Address Offcanvas
    const [isOpen, setIsOpen] = useState(false);


    //Address
    const handleShowAddresscanvas = () => {
        document.body.classList.add("body-lock");
        setIsOpen(false);
        setShowAddresscanvas(true);
    };
    const handleCloseAddresscanvas = () => {
        document.body.classList.remove("body-lock");
        setShowAddresscanvas(false);
    };

    const editAddress = (address) => {
        setSelectedAddress(address);
    };



    const deleteAddress = async (addressId) => {
        // Implement delete functionality here
        console.log("Delete Address:", addressId);
    };

    const staticAddresses = [
        {
            address_id: 1,
            address_name: "Piyush Kalsariya",
            address_is_default: true,
            address_address: "146, Laxmi Narayan Nagar-1 Dindoli Road, Surat-394210 Gujarat, Indiya",
        },
        {
            address_id: 2,
            address_name: "Rohit Kumar",
            address_is_default: false,
            address_address: "146, Laxmi Narayan Nagar-1 Dindoli Road, Surat-394210 Gujarat, Indiya",
        },
        {
            address_id: 3,
            address_name: "Mehul Desai",
            address_is_default: false,
            address_address: "146, Laxmi Narayan Nagar-1 Dindoli Road, Surat-394210 Gujarat, Indiya",
        },
    ];

    return (
        <Container>
            <Row>
                <Col xxl={7} xl={7} md={7} sm={12} xs={12}>
                    <Row>
                        <h3 className="font-medium">Choose Address</h3>
                        <p>Detailed address will help our delivery partner reach your <br /> doorstep quickly</p>
                        {staticAddresses.map((info) => (
                            <div key={info.address_id} className="col-md-6 mb-4">
                                <div className="card border p-3 web-bg-color" style={{ borderRadius: "10px" }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <h4 className="mb-0">{info.address_name}</h4>
                                        {info.address_is_default && (
                                            <span className="badge ms-4 bg-white py-2 px-3 default-Add-btn1" style={{ borderRadius: "50px" }} >DEFAULT</span>
                                        )}
                                    </div>
                                    <p className="text-muted">{info.address_address}</p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-light border-rad-fivepx"
                                            onClick={() => editAddress(info)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-light border-rad-fivepx"
                                            onClick={() => deleteAddress(info.address_id)}
                                        >
                                            Delete
                                        </button>
                                        <Button
                                            variant="dark"
                                            onClick={() => onSelectAddress(info)}
                                            className="d-flex align-items-center border-rad-fivepx text-white"
                                        >
                                            Deliver Here <FaArrowRightLong className="ms-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add New Address Button */}
                        <div className="col-md-6 mb-4">
                            <div
                                className="card border p-3 d-flex align-items-center justify-content-center bg-white btn"
                                style={{ height: '100%', borderRadius: "10px" }}
                                onClick={handleShowAddresscanvas}
                            >
                                <span className="d-block mb-3 text-center">
                                    <GoPlus className="fs-1 text-dark mx-auto" />
                                </span>
                                <h3 className="fs-5 text-center m-0 ">Add New Address</h3>
                            </div>
                        </div>
                    </Row>
                </Col>
                <AddressOffcanvas show={showAddresscanvas} handleClose={handleCloseAddresscanvas} />

                {/* Bag Concept */}
                <Col xxl={5} xl={5} md={5} sm={12} xs={12}>
                    <BagCard />
                </Col>
            </Row>
        </Container>
    );
};

export default AddressCard;
