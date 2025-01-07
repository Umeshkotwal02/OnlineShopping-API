import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ScrollUp.css";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll = window.scrollY;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="top-btn d-flex justify-content-center align-items-center"
          onClick={goToBtn}
        >
          <FaArrowUp className="top-btn--icon" />
        </div>
      )}
    </>
  );
};

export default ScrollUp;
