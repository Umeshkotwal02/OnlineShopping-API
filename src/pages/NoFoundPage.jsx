import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ height: "100vh", maxWidth: "1804px", margin: "0 auto" }}
        >
            <div>
                <img
                    src= {require("../assets/images/error-page.avif")}
                    alt="Error"
                    className="img-fluid mb-4 rounded-4"
                    style={{ maxWidth: "400px" }}
                    loading="lazy"
                />
                <div className="text-center">
                    <h2 className="fw-bold fs-2">So Sorry!</h2>
                    <h3 className="fs-4 text-capitalize">
                        The Page you are looking for cannot be found
                    </h3>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button
                        onClick={handleNavigate}
                        type="button"
                        className="btn-continue w-100"
                    >
                        Go To Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
