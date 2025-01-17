import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import "../../styles/ShopbyCatCard.css"
import { IoIosArrowForward } from 'react-icons/io'

const ShopByCategotyCard = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/product-page");
    };

    return (
        <Container fluid>
            <div className="custom-card-container d-flex justify-content-center align-items-center">
                <div className="card shadow-lg text-center p-3">
                    <div className="card-body">
                        <div className="icon-container mb-3">
                            <img
                                src={require("../../assets/images/shopbag.png")}
                                className="mx-auto w-50"
                                alt="company-badge-black"
                                loading="lazy"
                            />
                        </div>
                        <h4 className="card-title fw-bold" style={{ fontSize: "1.24rem" }}>Shop by Category</h4>
                        <p className="card-text fw-bold" style={{ fontSize: "0.7rem" }}>
                            "Browse, explore, and indulge in endless possibilities by category."
                        </p>
                        <Link to="products-page" className="btn btn-dark rounded-3 mx-3 d-flex align-items-center">
                            SHOP HERE <span className='text-white d-flex'> <IoIosArrowForward /></span> <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ShopByCategotyCard