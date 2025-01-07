import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import OtherOrder from "./OtherOrder";

const orderDetails = {
  order_detail: [
    {
      order_date: "26 September 2023",
      order_number: "954-65218741-215513",
    },
  ],
  sheeping_address: {
    order_shipping_address: "146, Laxmi Narayan Nagar-1 G R P Road, Udhna Road no 3 Surat Gujarat - 394250 India"
  },
  order_summary: {
    payment_method: "Razor Pay",
    total_before_gst: 10800,
    total_gst_amount: 1800.00,
    total_after_gst: 11800.00,
  },
};

const userProfile = {
  user_type: "btob",
};

const downloadInvoice = {
  invoice_url: "#",
};

const OrderDetails = () => {
  return (
    <>
      <Container>
        <div className="container m-4 border" style={{ borderRadius: "15px", backgroundColor: "#F3F3F3" }}>
          <h3 className="h4 mt-4 mb-2">Order Details</h3>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
              <div>
                <h5 className="mb-0" style={{ color: "#474545" }}>Ordered on {orderDetails.order_detail[0].order_date}</h5>
              </div>
              <span className="d-none d-lg-inline-block" style={{ color: "#474545" }}>|</span>
              <div>
                <h5 className="mb-0" style={{ color: "#474545" }}>Order# {orderDetails.order_detail[0].order_number}</h5>
              </div>
            </div>
            <div>
              <Link
                to={downloadInvoice.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-bold text-decoration-none"
                style={{ color: "#03A685" }}
              >
                Download Invoice
              </Link>

            </div>
          </div>

          <div className="">
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-3">
                <h5>Shipping Address</h5>
                <p>{orderDetails.sheeping_address.order_shipping_address}</p>
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <h5>Payment Methods</h5>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={require("../../assets/images/RazorPay.png")}
                    className="w-25"
                    alt="razor-pay"
                    style={{ padding: "9px" }}
                  />
                  <p>{orderDetails.order_summary.payment_method}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <h5>Order Summary</h5>
                <table className="table" style={{ backgroundColor: "#F3F3F3" }}>
                  <tbody>
                    <tr>
                      <td>Bag Total:</td>
                      <td className="text-end">₹ {orderDetails.order_summary.total_before_gst}</td>
                    </tr>
                    <tr>
                      <td>Coupon</td>
                      <td className="text-end">-₹800</td>
                    </tr>
                    {userProfile.user_type === "btob" && (
                      <tr>
                        <td>GST 18%:</td>
                        <td className="text-end">₹ {orderDetails.order_summary.total_gst_amount}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="fw-bold" style={{ color: "#03A685" }}>Total Pay:</td>
                      <td className="fw-bold text-end">₹ {orderDetails.order_summary.total_after_gst}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <OtherOrder />
      </Container>
    </>
  );
};

export default OrderDetails;
