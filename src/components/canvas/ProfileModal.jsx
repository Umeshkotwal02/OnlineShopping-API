import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import "../../styles/ProfileModal.css";

const ProfileModal = ({ show, handleClose }) => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { fullName, mobileNumber, email, address } = profileData;

    if (!fullName || !mobileNumber || !email || !address) {
      setError('All fields are required');
      return;
    }

    // Add API call logic to update the profile here
    setError('');  
    toast.success('Profile updated successfully!');
    handleClose();
  };

  return (
    <>
      {/* Profile Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="md"
        aria-labelledby="example-modal-title"
      >
        <Modal.Header closeButton className="web-bg-color">
          <Modal.Title id="example-modal-title" className="text-start">My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="profile-upload-container">
              <div>
                <label htmlFor="file-input" className="profile-upload-label">
                  <span className="block">
                    <img
                      src={require("../../assets/images/profile.png")}
                      alt="Default Profile"
                      loading="lazy"
                      className="d-flex justify-content-center profile-image"
                    />
                  </span>
                  {/* <span className="profile-upload-overlay">
                    <CameraIcon />
                  </span> */}
                  {/* <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    className="profile-upload-input"
                  /> */}
                </label>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                className="Profile-form-input"
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleChange}
                className="Profile-form-input"
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Id"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="Profile-form-input"
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="Profile-form-input"
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form.Group>
            <button type="button" className="btn-continue w-100" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileModal;
