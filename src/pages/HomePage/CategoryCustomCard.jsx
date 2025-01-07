import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RightAngle } from "../../assets/SvgIcons";
import "../../styles/CategoryCard.css";

const CategoryCustomCard = () => {
  const handleNavigate = () => {
    console.log("Navigate to product page");
  };

  return (
    <Container fluid className="category-section" onClick={handleNavigate}>
      <h1>
      </h1>
    </Container>
  );
};

export default CategoryCustomCard;
