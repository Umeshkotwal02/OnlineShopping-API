import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistItem, removeFromWishlist } from "../../redux/wishlist/wishlistThunk";
import { addToCart, fetchCartItems } from "../../redux/cart/cartThunk";
import NewCard from "./NewCard";
import toast from "react-hot-toast";
import { STORAGE } from "../../config/config";
import addToWishlist from "../redux/wishlist/wishlistThunk";

const NewArrivalSection = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItem());
    dispatch(fetchCartItems());
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

  const truncateProductName = (name = "") => {
    if (name.length > 35) {
      return name.substring(0, 35) + "...";
    }
    return name;
  };

  const handleAddToCart = (id, stitchingOptions) => {
    dispatch(addToCart(id, stitchingOptions));
  };

  const handleWishlistToggle = (product) => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    if (!userProfile?.id) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    const wishlistItem = wishlist.find((item) => item.id === product.id);
    if (wishlistItem) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  return (
    <Container fluid className="new-arrival-container">
      <h3 className="fw-normal text-center fs-3 d-none d-lg-block mt-5">
        New-Arrival
      </h3>
      <Row className="px-lg-5 px-xl-5 px-xxl-5">
        {data?.newarrival?.slice(0, visibleItems).map((product) => (
          <Col xs={6} sm={6} md={4} lg={2} xl={2} xxl={2} key={product.id}>
            <NewCard
              product={product}
              wishlist={wishlist}
              truncateProductName={truncateProductName}
              handleAddToCart={handleAddToCart}
              handleWishlistToggle={handleWishlistToggle}
            />
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
