import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import '../../styles/Order.css'
import axios from "axios";
import { STORAGE } from "../../config/config";
import { API_URL } from "../../Constant/constApi";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const ordersPerPage = 10;

  // API Data fetch
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
      try {
        const response = await axios.post(`${API_URL}orders`, {
          device_id: localStorage.getItem(STORAGE?.DEVICEID),
          user_id: userProfile?.id,
          limit: ordersPerPage.toString(),
          page: currentPage.toString(),
          is_admin: "0",
        });
        // console.log("API Response", response.data); // Log the entire API response
        if (response.data.STATUS === 200) {
          setOrders(response.data.DATA.data);
          setTotalPages(response.data.DATA.last_page);
        } else {
          console.error("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-muted text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark">
      My Orders
    </span>,
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "btn btn-outline-warning";
      case "complete":
        return "btn btn-outline-success";
      case "shipped":
        return "btn btn-outline-info";
      case "cancel":
        return "btn btn-outline-danger";
      default:
        return "btn btn-outline-secondary ";
    }
  };

  const handleOrderClick = (orderId) => {
    navigate(`/orders-details/${orderId}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      )}
      <Breadcrumb list={breadcrumbArray} />
      <div className="container mt-5 mb-5">
        {orders.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center bg-light p-5 text-center">
            <HiShoppingCart size="30px" className="text-secondary" />
            <p className="text-muted mt-3">You have not ordered anything yet.</p>
          </div>
        ) : (
          <>
        
              {orders.slice(0, showAll ? orders.length : 3).map((order) => (
                <div className="mb-3 web-bg-color" style={{ borderRadius: "15px" }} key={order.order_id} onClick={() => handleOrderClick(order.order_id)}>
                  <div className="border border-2 border-light rounded">
                    <div className="d-flex justify-content-between p-2">
                      <div className="d-flex gap-4 align-items-center">
                        <div>
                          <div className="fw-bold">ORDER DATE</div>
                          <div className="fw-medium" style={{ color: "#545454" }}>{order.order_date}</div>
                        </div>
                        <div className="ps-5">
                          <div className="fw-bold">ORDER TOTAL</div>
                          <div className="fw-medium" style={{ color: "#545454" }}>
                            <div className="text-[7px] sm:text-[16px]">
                              ₹{order.order_net_amount.toFixed(2)} (
                              {order.total_quantity} item
                              {order.total_quantity > 1 ? "s" : ""})
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <div className="text-start">{order.order_number}</div>
                        <button className={`px-4 bg-white ordered-btn ${getStatusStyle(order.order_status)}`} style={{ borderRadius: "5px" }}>
                          {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          
            {!showAll && orders.length > 3 && (
              <div className="d-flex justify-content-end mt-4">
                <button onClick={() => setShowAll(true)} className="fw-bold btn ">
                  See More...
                </button>
              </div>
            )}
            {showAll && (
              <Pagination
                className="my-4"
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;
