import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ReturnModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                <div className="bg-white p-4 shadow-lg rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-3 fw-medium">Return Order</h2>
                    <p className="text-center text-muted mb-3">
                        Do you want to send the item cancellation request?
                    </p>
                    <textarea
                        className="form-control mb-3 web-bg-color no-style border-0 rounded-4"
                        placeholder="Enter Reason..."
                        rows="5"
                        cols="40"
                        onChange={(e) => setCancelReason(e.target.value)}

                    ></textarea>

                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-secondary me-2 rounded-5"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-dark rounded-5"
                            onClick={submitCancelReason}

                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ReturnModal;
