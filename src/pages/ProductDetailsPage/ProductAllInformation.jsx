import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import "../../styles/ProductDetails.css";

const data = [
  {
    id: 1,
    header: "Product Details",
    subHeader: "Care instructions, Pack contains",
    details: [
      { title: "Material", subtitle: "Crepe" },
      { title: "Type of Work", subtitle: "Embellished & Sequined" },
      { title: "Pattern", subtitle: "Printed" },
      { title: "Type", subtitle: "Lehenga Choli" },
      { title: "Fit", subtitle: "Comfortable" },
      { title: "Neckline Type", subtitle: "Scoop Neck" },
      { title: "Sleeve Type", subtitle: "Sleeveless" },
      { title: "Closure Type", subtitle: "Back Closure" },
      { title: "Care Instructions", subtitle: "Dry Clean Only" },
    ],
  },
];

const datatwo = [
  {
    id: 1,
    header: "Know your product",
    subHeader: "Description",
    image: require("../../assets/images/ProductDetails/exclaimed.png"),
    details: [
      { subtitle: "To look beautiful this wedding season, grab this lovely lehenga, blouse and dupatta set. This lehenga set is fabricated on georgette and is beautified with embroidery. The lehenga has a bridal look. Pair it with matching jewellery, heels and a big smile for the gorgeous look." },
    ],
  },
  {
    id: 2,
    header: "Return and exchange policy",
    subHeader: "Know more about return and exchange",
    image: require("../../assets/images/ProductDetails/return-box.png"),
    details: [
      { subtitle: "This product is eligible for returns or replacement. Please initiate returns/replacements from the 'My Orders' section in the App within 7 days of delivery. Kindly ensure the product is in its original condition with all tags attached." },
    ],
  },
]

const ProductAllInformation = () => {
  const [activeKey, setActiveKey] = useState("0");
  const [activeKeyOne, setActiveKeyOne] = useState("0");

  return (
    <>
      <h4>Product Information</h4>
      <Accordion
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
        className="shadow-none bg-none"
      >
        {data.map((item, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={item.id}
            className=""
          >
            <Accordion.Header className="d-flex align-items-center gap-3">
              <img
                src={require("../../assets/images/ProductDetails/boxicon2.png")}
                alt=""
                className="object-contain me-2"
                style={{ width: "2.8rem" }}
              />
              <div>
                <div className="fs-5 fw-medium text-black mb-1">{item.header}</div>
                <div className="text-secondary" style={{ fontSize: "1.2rem" }}>{item.subHeader}</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="ps-4">
                <div className="row">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="col-lg-6 col-md-6 col-6 mb-2">
                      <div className="text-black font-normal" style={{ fontSize: "1rem" }}>
                        {detail.title}
                      </div>
                      <div className="font-normal" style={{ fontSize: "1.2rem", color: "#555555" }}>{detail.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Know Information */}
      <Accordion
        activeKey={activeKeyOne}
        onSelect={(key) => setActiveKeyOne(key)}
        className="shadow-none bg-none"
      >
        {datatwo.map((items, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={items.id}
            className=""
          >
            <Accordion.Header className="d-flex align-items-center gap-3">
              <img
                src={items.image}
                alt="exclaimed symbol"
                className="object-contain me-2"
                style={{ width: "2.8rem" }}
              />
              <div>
                <div className="fs-5 fw-medium text-black mb-1">{items.header}</div>
                <div className="text-secondary" style={{ fontSize: "1.2rem" }}>{items.subHeader}</div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="ps-4">
                <div className="row">
                  {items.details.map((detail, idx) => (
                    <div key={idx} className="col-lg-12 col-md-12 col-12 mb-2">
                      <div className="font-normal" style={{ fontSize: "1.2rem", color: "#555555" }}>{detail.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default ProductAllInformation;
