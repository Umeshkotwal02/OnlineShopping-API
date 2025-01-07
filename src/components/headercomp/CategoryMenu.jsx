import React from 'react';
import { Container, Nav, Col, Navbar } from 'react-bootstrap';
import "../../styles/Menu.css";
import { Link } from 'react-router-dom';
import { headerCatData } from '../../config/ConstData';

const CategoryMenu = () => {
  return (
    <Container fluid className="menu-container pt-2 px-5 d-none d-lg-block">
      <Navbar className="responsive-navbar-nav pb-0">
        <Nav className="w-100 justify-content-center">
          {headerCatData.map((menu, index) => (
            <div className={"menu-item"}>
              {/* <Col className={`menu-item ${index === 0 || index === headerCatData.length - 1 ? "text-center" : ""}`} key={index}> */}
              <Nav.Link className="menu-button">{menu.title}</Nav.Link>
              <div
                className={`dropdown-content p-3 ${menu.dropdown.length > 0 ? "dropdown-with-items" : "dropdown-only-image"
                  }`}
              >
                {/* Check if there are dropdown items */}
                {menu.dropdown.length > 0 ? (
                  menu.dropdown.map((dropdown, idx) => (
                    <div key={idx} className="mx-4">
                      <p className="list-title text-start ms-1 text-black" style={{fontWeight:"550"}}>{dropdown.category}</p>
                      {dropdown.items.map((item, i) => (
                        <li key={i} className="p-1 text-black">
                          {/* <Link to={item.link} className="list-item">
                          {item.name}
                        </Link> */}

                          <Link to="/products-page" className="list-item">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="no-dropdown px-5">
                    {/* Show image only if there are no dropdown items */}
                    {menu.image && <img src={menu.image} alt={menu.title} />}
                  </div>
                )}

                <div>
                  {/* Always show image inside dropdown if it exists */}
                  {menu.dropdown.length > 0 && menu.image && (
                    <div className="dropdown-image">
                      <img src={menu.image} alt={menu.title} />
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </Nav>
      </Navbar>
    </Container >
  );
};

export default CategoryMenu;
