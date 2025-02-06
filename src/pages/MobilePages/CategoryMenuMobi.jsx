import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { API_URL } from "../../constants/constApi";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryMenuMobi = () => {
  const [headerButtons, setHeaderButtons] = useState([]);

  const fetchHeaderButtons = async () => {
    try {
      const response = await axios.get(`${API_URL}header_api`);
      const { data } = response;

      if (data && data.STATUS === 200 && Array.isArray(data.DATA)) {
        setHeaderButtons(data.DATA);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching header buttons:", err);
      toast.error(
        err?.response?.data?.MESSAGE ||
        err?.message ||
        "Failed to fetch header buttons."
      );
    }
  };

  useEffect(() => {
    fetchHeaderButtons();
  }, []);

  return (
    <div
      style={{
        overflowX: "auto",
        display: "flex",
        flexWrap: "nowrap",
        scrollbarWidth: "none",
      }}
      className="hide-scrollbar d-lg-none py-2 px-3"
    >
      {headerButtons.map((item, index) => (
        <div
          key={index}
          className="m-1"
          style={{
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <Card className="border-0" style={{ width: "80px" }}>
            <Card.Body className="p-0">
              {item.category_image && (
                <Image
                  src={item.category_image}
                  roundedCircle
                  width={70}
                  height={70}
                  className="border-none"
                  alt={item.category_name}
                />
              )}
              <Card.Text
                className="fw-bold"
                style={{
                  fontFamily: "Roboto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "120px", // Adjust this width as needed
                  margin: "0 auto",
                }}
              >
                {item.category_name}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenuMobi;
