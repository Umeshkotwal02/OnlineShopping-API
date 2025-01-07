import React from "react";
import "../styles/Loader.css";

const Loader = () => {

  return (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        {/* Animated Bag Icon */}
        <div className="loader-bag">
          <img
            src={require("../assets/images/Bag.png")}
            alt="Bag Icon"
            className="loader-icon"
          />

          {/* Rolling Text */}
          <h1 className="fw-bold animation-span">
            <span className="let1">O</span>
            <span className="let2">N</span>
            <span className="let3">L</span>
            <span className="let4">I</span>
            <span className="let5">N</span>
            <span className="let6">E</span>
            <span className="let7"> - </span>
            <span className="let8"> </span>
            <span className="let9">S</span>
            <span className="let10">H</span>
            <span className="let11">O</span>
            <span className="let12">P</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
