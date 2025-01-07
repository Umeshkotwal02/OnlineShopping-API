import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "../../components/Breadcrumb";
import Loader from "../../components/Loader";
import '../../styles/Order.css'

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Mock data for orders
  const mockOrders = [
    {
      order_id: 1,
      order_date: "26 September 2023",
      order_net_amount: "10000",
      total_quantity: 3,
      order_number: "954-65221854-152321",
      order_status: "pending",
    },
    {
      order_id: 2,
      order_date: "26 September 2023",
      order_net_amount: "10000",
      total_quantity: 3,
      order_number: "954-65221854-152321",
      order_status: "complete",
    },
    {
      order_id: 3,
      order_date: "26 September 2023",
      order_net_amount: "10000",
      total_quantity: 3,
      order_number: "954-65221854-152321",
      order_status: "complete",
    },
    {
      order_id: 4,
      order_date: "26 September 2023",
      order_net_amount: "10000",
      total_quantity: 3,
      order_number: "954-65221854-152321",
      order_status: "cancel",
    },
  ];

  useEffect(() => {
    // Simulating fetching data
    setLoading(true);
    setOrders(mockOrders);
    setTotalPages(3); // Example of total pages (can be dynamic)
    setLoading(false);
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
      case "pending":
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
            <Link to="/my-order/order-details" className="text-decoration-none text-dark">
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
                            ₹{parseFloat(order.order_net_amount.replace(/,/g, '')).toLocaleString()} ({order.total_quantity} item{order.total_quantity > 1 ? "s" : ""})
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
            </Link>
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
