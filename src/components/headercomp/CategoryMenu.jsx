import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../../styles/Menu.css";
import { Link } from "react-router-dom";

const CategoryMenu = ({ headerCatData }) => {
  return (
    <Container fluid className="menu-container pt-2 px-5 d-none d-lg-block">
      <Navbar className="responsive-navbar-nav pb-0">
        <Nav className="w-100 justify-content-center">
          {headerCatData.map((menu) => (
            <div className="menu-item" key={menu.id}>
              {/* Main category button */}
              <Nav.Link className="menu-button">{menu.category_name}</Nav.Link>
              <Link
                to={`/products-page`}
                className="d-block h-100 overflow-hidden"
              >
                {/* Dropdown */}
                <div
                  className={`dropdown-content p-3 ${menu.subcategories && Object.keys(menu.subcategories).length > 0
                    ? "dropdown-with-items"
                    : "dropdown-only-image"
                    }`}
                >
                  {/* Render subcategories */}
                  {menu.subcategories && Object.keys(menu.subcategories).length > 0 ? (
                    Object.entries(menu.subcategories).map(([key, items], idx) => (
                      <div key={idx} className="mx-4">
                        {/* Subcategory type */}
                        <p
                          className="list-title text-start ms-1 text-black"
                          style={{ fontWeight: "550" }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize key */}
                        </p>

                        {/* Subcategory items */}
                        {items.map((item) => (
                          <li key={item.id} className="p-1 text-black">
                            <Link to="/products-page" className="list-item">
                              {item.category_name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="no-dropdown px-5"> </div>
                  )}

                  {/* Always show category image inside dropdown */}
                  {menu.category_image && (
                    <div className="dropdown-image">
                      <img src={menu.category_image} alt={menu.category_name} />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </Nav>
      </Navbar>
    </Container>
  );
};

export default CategoryMenu;
