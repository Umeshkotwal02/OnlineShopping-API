import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../redux/auth/authThunk.js';
import toast from 'react-hot-toast';
import { Offcanvas, Form } from 'react-bootstrap';

const VerifyOtpOffcanvas = ({ show, handleClose, mobileNumber }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP.');
      return;
    }

    dispatch(verifyOtp(mobileNumber, otp))
    toast.success('OTP verified successfully!');
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ maxWidth: '450px' }}>
      <Offcanvas.Header closeButton className="custom-header web-bg-color">
        <Offcanvas.Title className="text-start">Verify OTP</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="text-center">
          <h3 className="signin-heading">Enter OTP</h3>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </Form.Group>

          <button type="button" className="btn-continue w-100" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default VerifyOtpOffcanvas;
