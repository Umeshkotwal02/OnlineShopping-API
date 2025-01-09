import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Loader from "../Loader";
import "../../styles/WatchShopCard.css";

const WatchShopCard = ({ watchShopProductInfo }) => {
    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleMouseEnter = () => {
        setPlay(true);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (

                <div className="product-card web-bg-color rounded-3">
                    <div
                        className="position-relative"
                        onMouseEnter={handleMouseEnter}
                    >
                        <div className="video-ratio">
                            <ReactPlayer
                                url={watchShopProductInfo.product_video_url}
                                playing={play}
                                loop
                                muted
                                width="100%"
                                height="100%"
                                className="react-player video-container"
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 0, rel: 0 },
                                    },
                                }}
                            />
                        </div>
                        <div className="position-absolute start-50 translate-middle-x" style={{ bottom: "-35px" }}>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="product-image-container">
                                    <img
                                        src={watchShopProductInfo.small_image}
                                        alt="Product"
                                        className="img-fluid rounded-3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-3 px-2 web-bg-color wtc-shop-product-info">
                        {/* <h3 className="fw-medium text-truncate">{watchShopProductInfo.product_name}</h3> */}
                        <h3 className="fw-medium two-line-truncate">{watchShopProductInfo.product_name}</h3>
                        <div className="d-flex justify-content-center align-items-center text-success fw-medium ">
                            ₹{watchShopProductInfo.product_price}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WatchShopCard;
