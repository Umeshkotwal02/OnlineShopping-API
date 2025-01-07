import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import headerContent from '../config/HeaderConfig';

const ShopByCategoryCard = ({  }) => {
    const location = useLocation(); // Using the useLocation hook to get the current pathname

    return (
        <>
            {headerContent.map((item, index) => {
                return (
                    (location.pathname === item.value && item?.data) && (
                        <Navbar key={index} className="main_sub_header d-none d-lg-block px-xl-5 py-1">
                            <Container fluid className="sub_heading fw-normal d-grid d-lg-flex justify-content-start justify-content-xxl-between text-uppercase gap-3 py-3 py-lg-0 p-xl-0">
                                {item?.data.map((newItem, newIndex) => {
                                    return (
                                        <Link key={newIndex} to={newItem.value}>
                                            {newItem.label}
                                            {newItem?.data && (
                                                <ul className="sub_menu fw-bold ">
                                                    {newItem?.data.map((subItem, subIndex) => {
                                                        return (
                                                            <li key={subIndex}>
                                                                {subItem.label}
                                                                <ul className="peta_menu p-0 pt-3 text-capitalize fw-light">
                                                                    {subItem?.data &&
                                                                        subItem?.data.map((petaItem, petaIndex) => {
                                                                            return <li key={petaIndex}>{petaItem.label}</li>;
                                                                        })}
                                                                </ul>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                            <li className="catImage">
                                                <img src={newItem.image} alt="" />
                                            </li>
                                        </Link>
                                    );
                                })}
                            </Container>
                        </Navbar>
                    )
                );
            })}
        </>
    );
};

export default ShopByCategoryCard;
