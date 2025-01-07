import React from "react";
import { Link } from "react-router-dom";

const FestivalSpecialSection = () => {
  const staticData = {
    AllBanners: {
      banners: [
        { file: "", category_id: "1" },
        { file: "/path/to/banner2.jpg", category_id: "2" },
        { file: "/path/to/banner3.jpg", category_id: "3" },
        { file: "/path/to/banner4.jpg", category_id: "4" },
      ],
    },
  };

  return (
    <section className="my-4">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-normal mb-3">Festival Special</h2>
          <p className="fst-italic">
            &quot;Embrace the festival magic, let joy fill every moment.&quot;
          </p>
        </div>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <Link
              to={`/product-page?category=${staticData.AllBanners.banners[3]?.category_id}`}
              className="d-block h-100 overflow-hidden"
            >
              <img
                src={staticData.AllBanners.banners[3]?.file}
                className="img-fluid w-100 h-100 transition-transform"
                alt=""
                loading="lazy"
              />
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <div className="row g-3">
              <div className="col-12">
                <Link
                  to={`/product-page?category=${staticData.AllBanners.banners[0]?.category_id}`}
                  className="d-block h-100 overflow-hidden"
                >
                  <img
                    src={staticData.AllBanners.banners[0]?.file}
                    className="img-fluid w-100 h-100 transition-transform"
                    alt=""
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to={`/product-page?category=${staticData.AllBanners.banners[1]?.category_id}`}
                  className="d-block h-100 overflow-hidden"
                >
                  <img
                    src={staticData.AllBanners.banners[1]?.file}
                    className="img-fluid w-100 h-100 transition-transform"
                    alt=""
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="col-6">
                <Link
                  to={`/product-page?category=${staticData.AllBanners.banners[2]?.category_id}`}
                  className="d-block h-100 overflow-hidden"
                >
                  <img
                    src={staticData.AllBanners.banners[2]?.file}
                    className="img-fluid w-100 h-100 transition-transform"
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
