import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

const ParentComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      >
        Open Modal
      </button>

      {/* Modal Component */}
      <SuccessModal
        open={isModalOpen}
        message="This is a success message!"
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ParentComponent;
