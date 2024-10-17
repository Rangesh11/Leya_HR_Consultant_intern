import React from "react";

const Button = ({ styles }) => {
  const handleButtonClick = () => {
    // Open the default email client with a pre-filled email address
    window.location.href = "mailto:contact@vertexpixel.in";
  };

  return (
    <button
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      onClick={handleButtonClick}
    >
      Contact now
    </button>
  );
};

export default Button;
