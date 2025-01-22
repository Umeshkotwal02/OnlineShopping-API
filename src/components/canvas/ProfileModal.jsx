import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import "../../styles/ProfileModal.css";
import { API_URL } from "../../Constant/constApi";
import { useForm } from "react-hook-form";
import { STORAGE } from "../../config/config";
import axios from "axios";
import { CameraIcon } from "../../assets/SvgIcons";
import { useUser } from "../../context/UserContext ";

const ProfileModal = ({ show, handleClose }) => {
  const { userDetails, setUserDetails } = useUser();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}userdetail`, {
        user_id: userProfile?.id,
        device_id: deviceId,
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
      });

      if (data?.STATUS === 200) {
        const { user_name, user_last_name, user_email, user_mobile, user_profile } = data.DATA;
        setUserDetails({ user_first_name: user_name, user_last_name, user_email, user_mobile, user_profile });
        setValue("user_first_name", user_name);
        setValue("user_last_name", user_last_name);
        setValue("user_email", user_email);
        setValue("user_mobile", user_mobile);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const deviceId = localStorage.getItem(STORAGE?.DEVICEID);
    const userProfile = JSON.parse(localStorage?.getItem(STORAGE?.USERDETAIL));

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}updateprofile`, {
        device_id: deviceId,
        id: userProfile?.id,
        is_admin: "0",
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_email: data.user_email,
        user_mobile: data.user_mobile,
        user_profile: userDetails.user_profile,
      });
      if (response.data && response.data.STATUS === 200) {
        toast.success(data?.MESSAGE || "User updated successfully.");
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          user_first_name: data.user_first_name,
          user_last_name: data.user_last_name,
          user_email: data.user_email,
          user_mobile: data.user_mobile,
        }));
      } else {
        toast.success(data?.MESSAGE || "Failed to update user.");
      }
    } catch (err) {
      toast.success(data?.MESSAGE || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []); // Run once on mount

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserDetails((prevState) => ({ ...prevState, user_profile: reader.result }));
      };
      reader.onerror = () => {
        toast.error("Failed to load the file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="web-bg-color">
        <Modal.Title id="example-modal-title" className="text-start">My Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-0">
        <div className="text-center">
          <div className="profile-upload-container">
            <label htmlFor="file-input" className="d-inline-block position-relative rounded-circle overflow-hidden" style={{ height: "160px", width: "160px", cursor: "pointer" }}>
              <img src={userDetails?.user_profile || "/images/account-avatar.png"} alt="Profile" className="img-fluid h-100 w-100 object-fill profile-image" />
              <span className="position-absolute bottom-0 start-0 end-0 py-4 d-flex justify-content-center align-items-center">
                
                <CameraIcon />
                <input type="file" accept="image/*" id="file-input" onChange={handleFileChange} className="position-absolute invisible" />
              </span>
            </label>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Full Name"
              {...register("user_first_name", { required: "First name is required." })}
              className="Profile-form-input"
            />
            {errors.user_first_name && <p className="text-danger mt-2">{errors.user_first_name.message}</p>}
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              {...register("user_last_name", { required: "Last name is required." })}
              className="Profile-form-input"
            />
            {errors.user_last_name && <p className="text-danger mt-2">{errors.user_last_name.message}</p>}
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("user_email", { required: "Email is required.", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email format." } })}
              className="Profile-form-input"
            />
            {errors.user_email && <p className="text-danger mt-2">{errors.user_email.message}</p>}
          </Form.Group>
          <Form.Group controlId="formMobile" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              {...register("user_mobile", { required: "Mobile number is required.", pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number." } })}
              className="Profile-form-input"
            />
            {errors.user_mobile && <p className="text-danger mt-2">{errors.user_mobile.message}</p>}
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <button type="button" className="btn-continue w-100 m-0" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
