import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Container } from "react-bootstrap";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoClock } from "react-icons/go";

const ContactUsPage = () => {
  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <span key="2" className="text-dark fw-light text-decoration-none">
      Contact Us
    </span>,
  ];

  const contactInfoList = [
    {
      id: 0,
      address: "1025-1030 Basement , Millennium Textile Market, Ring Rd, Kamela Darwaja, Surat, Gujarat 395002",
      email: "info123@gmail.com",
      phone: "+91 9876543210",
      openHours: "Mon - Sat (11 AM to 09 PM) Sunday: (12 AM to 07 PM)",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      {/* Web */}
      <Container className=" my-5 rounded-3 d-lg-none" >
        <div className="row border mt-3 rounded-3 mb-4 ">
          <div className="col-md-6 bg-white px-5 py-3 rounded-3">
            <h3>Get in Touch</h3>
            {contactInfoList.map((info) => (
              <div key={info.id}>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h5>Address:</h5>
                    <p className="mb-0">{info.address}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <MdOutlineEmail size={24} />
                  </div>
                  <div>
                    <h5>Email:</h5>
                    <p className="mb-0">{info.email}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <FiPhoneCall size={24} />
                  </div>
                  <div>
                    <h5>WhatsApp/Call Us:</h5>
                    <p className="mb-0">{info.phone}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <GoClock size={24} />
                  </div>
                  <div>
                    <h5>Open:</h5>
                    <p className="mb-0">{info.openHours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 web-bg-color p-4 contact-us" style={{ borderEndEndRadius: "10px" }}>
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">

                <input type="text" className="form-control" id="fullName" required placeholder="Full Name" />
              </div>
              <div className="mb-3">

                <input type="text" className="form-control" id="contactNumber" placeholder="Contact Number" required />
              </div>
              <div className="mb-3">

                <input type="email" className="form-control" id="email" placeholder="Email Id" required />
              </div>
              <div className="mb-3">

                <textarea className="form-control no-style border-0 rounded-4" rows="5"
                  cols="40" id="message" placeholder="Message..." required></textarea>
              </div>
              <button type="button mt-3" className="btn-payment w-100" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Mobile */}
      <Container className=" my-5 rounded-3 d-none d-lg-block" style={{ paddingLeft: "8rem", paddingRight: "8rem", }}>
        <div className="row border mt-3 rounded-3 mb-4 ">
          <div className="col-md-6 bg-white px-5 py-3 rounded-3">
            <h3>Get in Touch</h3>
            {contactInfoList.map((info) => (
              <div key={info.id}>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h5>Address:</h5>
                    <p className="mb-0">{info.address}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <MdOutlineEmail size={24} />
                  </div>
                  <div>
                    <h5>Email:</h5>
                    <p className="mb-0">{info.email}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <FiPhoneCall size={24} />
                  </div>
                  <div>
                    <h5>WhatsApp/Call Us:</h5>
                    <p className="mb-0">{info.phone}</p>
                  </div>
                </div>
                <div
                  className="mb-3 web-bg-color p-3 rounded-2 d-flex align-items-start"
                  style={{ border: "1px solid #D1D1D1" }}
                >
                  <div className="me-3">
                    <GoClock size={24} />
                  </div>
                  <div>
                    <h5>Open:</h5>
                    <p className="mb-0">{info.openHours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 web-bg-color p-4 contact-us" style={{ borderEndEndRadius: "10px" }}>
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">

                <input type="text" className="form-control" id="fullName" required placeholder="Full Name" />
              </div>
              <div className="mb-3">

                <input type="text" className="form-control" id="contactNumber" placeholder="Contact Number" required />
              </div>
              <div className="mb-3">

                <input type="email" className="form-control" id="email" placeholder="Email Id" required />
              </div>
              <div className="mb-3">

                <textarea className="form-control no-style border-0 rounded-4" rows="5"
                  cols="40" id="message" placeholder="Message..." required></textarea>
              </div>
              <button type="button mt-3" className="btn-payment w-100" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
      <div className="mb-4 w-100" style={{ height: "634px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.042297350522!2d72.83918257526103!3d21.190478630499612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7822b01163%3A0x7dfc72c205f12613!2sKapoor%20Designers.Com%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1723465431758!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUsPage;
