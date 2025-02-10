import React, { useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import "../../styles/ProfileModal.css";
import { useForm } from "react-hook-form";
import { CameraIcon } from "../../assets/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../redux/user/userSlice";
import { fetchUserDetails, updateUserDetails } from "../../redux/user/userThunk.js";

const ProfileModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      setValue("user_first_name", userDetails.user_name || "");  // Map correct API field
      setValue("user_last_name", userDetails.user_last_name || "");
      setValue("user_email", userDetails.user_email || "");
      setValue("user_mobile", userDetails.user_mobile || "");
    }
  }, [userDetails, setValue]);

  const onSubmit = async (data) => {
    const updatedDetails = {
      user_name: data.user_first_name,
      user_last_name: data.user_last_name,
      user_email: data.user_email,
      user_mobile: data.user_mobile,
      user_profile: userDetails.user_profile,
    };
    dispatch(updateUserDetails(updatedDetails));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setUserDetails({ ...userDetails, user_profile: reader.result }));
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
              <img
                src={userDetails?.user_profile || "/images/account-avatar.png"}
                alt="Profile"
                className="img-fluid h-100 w-100 object-fill profile-image" />
              <span className="position-absolute bottom-0 start-0 end-0 py-4 d-flex justify-content-center align-items-center">
                <CameraIcon />
                <input type="file" accept="image/*" id="file-input" onChange={handleFileChange} className="position-absolute invisible" />
              </span>
            </label>
          </div>
        </div>
        <h3 className="text-center text-lg fw-medium">
          <span className="text-secondary">
            ({userDetails?.user_name}{" "}
            {userDetails?.user_last_name})
          </span>
        </h3>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              {...register("user_first_name", {
                required: "First name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Only characters allowed",
                },
              })}
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
              {...register("user_mobile",
                {
                  required: "Mobile number is required.",
                  pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number." }
                })}
              className="Profile-form-input"
            />
            {errors.user_mobile && <p className="text-danger mt-2">{errors.user_mobile.message}</p>}
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn-continue w-100 m-0" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
