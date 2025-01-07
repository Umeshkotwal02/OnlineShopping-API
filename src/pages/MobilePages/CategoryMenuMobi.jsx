import React from "react";
import { Card, Image } from "react-bootstrap";


const menuItems = [
  {
    name: "Sale",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "New Arrivals",
    image: require("../../assets/images/CateMobi/img-2.png"),
  },
  {
    name: "Half Saree",
    image: require("../../assets/images/CateMobi/img-5.png"),
  },
  {
    name: "Fashion Saree",
    image: require("../../assets/images/CateMobi/img-4.png"),
  },
  {
    name: "Lehenga",
    image: require("../../assets/images/CateMobi/img-3.png"),
  },
  {
    name: "Gown",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Wedding",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Celebrity Outfits",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Occasions",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Engagement",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Reception",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
  {
    name: "Others",
    image: require("../../assets/images/CateMobi/img-1.png"),
  },
];


const CategoryMenuMobi = () => {
  return (
    <div
      style={{
        overflowX: "auto",
        display: "flex",
        flexWrap: "nowrap",
        scrollbarWidth: "none",
      }}
      className="hide-scrollbar d-lg-none py-2 px-3"
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="m-1"
          style={{
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <Card.Body>
            <Image
              src={item.image}
              roundedCircle
              width={70}
              height={70}
              className="border-none"
              alt="mobile-categoty-image"
            />
            <Card.Text className="fw-bold" style={{ fontFamily: "Roboto" }}>
              {item.name}
            </Card.Text>
          </Card.Body>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenuMobi;
