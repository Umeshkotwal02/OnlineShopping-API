import React from "react";
import { Link } from "react-router-dom";

const FestivalSpecialSection = ({ data }) => {
    return (
        <section className="my-4">
            <div className="container-fluid px-lg-5 px-xl-5 px-xxl-5">
                {/* Festival Special */}
                <div>
                    <h3 className="text-center fw-normal d-none d-lg-block mt-5" >Festival Special </h3>
                    <h3 className="text-start fw-bold d-lg-none my-3 ms-2 mt-4">Festival Special</h3>
                    <p className="text-center font-italic d-none d-lg-block"><i> "Embrace the festival magic, let joy fill every moment."</i></p>
                </div>
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <Link
                            to={`/product-page?category=${data?.AllBanners?.banner5?.[3]?.category_id}`}
                            className="d-block h-100 overflow-hidden"            >
                            <img
                                src={data?.AllBanners?.banner5?.[3]?.file}
                                className="img-fluid w-100 h-100 hover-scale rounded-4"
                                alt=""
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row g-4">
                            <div className="col-12">
                                <Link
                                    to={`/product-page?category=${data?.AllBanners?.banner5?.[0]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.AllBanners?.banner5?.[0]?.file}
                                        className="img-fluid w-100 h-100 hover-scale rounded-4"
                                        alt=""
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link
                                    to={`/product-page?category=${data?.AllBanners?.banner5?.[1]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.AllBanners?.banner5?.[1]?.file}
                                        className="img-fluid w-100 h-100 hover-scale rounded-4"
                                        alt=""
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link
                                    to={`/product-page?category=${data?.AllBanners?.banner5?.[2]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.AllBanners?.banner5?.[2]?.file}
                                        className="img-fluid w-100 h-100 hover-scale rounded-4"
                                        alt=""
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FestivalSpecialSection;
