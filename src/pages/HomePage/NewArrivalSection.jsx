import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import "../../styles/NewArrivalCard.css";
import { FiHeart } from "react-icons/fi";
import ProductImageSlider from "../../components/homepage/ProductImageSlider";
import { STORAGE } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import addToWishlist, { fetchWishlistItem, removeFromWishlist } from "../../redux/wishlist/wishlistThunk";
import { addToCart,  } from "../../redux/cart/cartThunk";
import toast from "react-hot-toast";
import { TbHeartPlus } from "react-icons/tb";
import NewArrivalCard from "../../components/homepage/NewArriveCard";

const NewArrivalSection = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItem());
    // dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        setVisibleItems(4);
      } else if (screenWidth >= 576 && screenWidth < 768) {
        setVisibleItems(6);
      } else if (screenWidth >= 768 && screenWidth < 992) {
        setVisibleItems(6);
      } else {
        setVisibleItems(10);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const handleViewMore = () => {
    navigate("/products-page");
  };
 

  return (
    <Container fluid className="new-arrival-container">
      <h3 className="fw-normal text-center fs-3 d-none d-lg-block mt-5">New-Arrival</h3>
      <Row className="px-lg-5 px-xl-5 px-xxl-5">
        {data?.newarrival?.slice(0, visibleItems).map((product) => (
          <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2} key={product.id} className="mb-4 rounded wishlist-column">
            <NewArrivalCard product={product} />
          </Col>
        ))}
      </Row>
      <div className="text-center d-flex justify-content-center">
        <Button
          variant="dark rounded-5 px-4 mb-4"
          onClick={handleViewMore}
          style={{ fontSize: "0.9rem" }}
          className="d-none d-lg-block"
        >
          View All
        </Button>
      </div>
    </Container>
  );
};

export default NewArrivalSection;
