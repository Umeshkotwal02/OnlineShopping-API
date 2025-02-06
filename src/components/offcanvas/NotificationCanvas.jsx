import React from "react";
import { Modal } from "react-bootstrap";
import "../../styles/ProfileModal.css";

const NotificationCanvas = ({ show, handleClose }) => {
  const notifications = [
    {
      profileImg: require("../../assets/images/NotificationsImgs/img1.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a visionzxzxxz...",
      date: "15/05/2023 01:55 PM",
    },
    {
      profileImg: require("../../assets/images/NotificationsImgs/img2.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "20/06/2023 10:30 AM",
    },
    {
      profileImg: require("../../assets/images/NotificationsImgs/img3.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    }, {
      profileImg: require("../../assets/images/NotificationsImgs/img4.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    }, {
      profileImg: require("../../assets/images/NotificationsImgs/img5.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    }, {
      profileImg: require("../../assets/images/NotificationsImgs/img1.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    },
    {
      profileImg: require("../../assets/images/NotificationsImgs/img2.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    },
    {
      profileImg: require("../../assets/images/NotificationsImgs/img3.png"),
      title: "Pink Embroidered Art Silk Umbrella Lehenga a vision...",
      date: "05/07/2023 02:15 PM",
    },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="md"
      aria-labelledby="example-modal-title"
    >
      <Modal.Header closeButton className="web-bg-color">
        <Modal.Title id="notification-modal-title" className="text-start notification-modal-title">
          Notifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="notification-scrollable">
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <img
                src={notification.profileImg}
                alt="Profile"
                className="notification-img"
              />
              <div className="notification-content">
                <h5 className="notification-title ">{notification.title}</h5>
                <span className="notification-date fw-medium">{notification.date}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
     
    </Modal>
  );
};

export default NotificationCanvas;
