import React from "react";
import { Link } from "react-router-dom";

const FestivalSpecial = ({ data = { banners: [] } }) => {
    return (
        <section className="my-4">
            <div className="container fluid">
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <Link
                            to={`/product-page?category=${data?.banners[3]?.category_id}`}
                            className="d-block h-100 overflow-hidden"
                        >
                            <img
                                src={data?.banners[3]?.file}
                                className=" w-100 h-100 transition-transform"
                                alt=""
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row g-3">
                            <div className="col-12">
                                <Link
                                    to={`/product-page?category=${data?.banners[0]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.banners[0]?.file}
                                        className=" w-100 h-100 transition-transform"
                                        alt=""
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link
                                    to={`/product-page?category=${data?.banners[1]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.banners[1]?.file}
                                        className=" w-100 h-100 transition-transform"
                                        alt=""
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                            <div className="col-6">
                                <Link
                                    to={`/product-page?category=${data?.banners[2]?.category_id}`}
                                    className="d-block h-100 overflow-hidden"
                                >
                                    <img
                                        src={data?.banners[2]?.file}
                                        className=" w-100 h-100 transition-transform"
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

export default FestivalSpecial;
