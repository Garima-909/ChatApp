import React from "react";

const DPModal = ({ imageUrl, onClose }) => {
  return (
    <div className="w-full flex bg-black bg-opacity-50 h-full fixed top-0 left-0 z-10">
      <div className="w-full h-full flex items-center justify-center relative">
        <span
          className="absolute right-9 top-9 text-5xl text-blue-600 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <img className="max-w-[550px] h-auto" src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default DPModal;
