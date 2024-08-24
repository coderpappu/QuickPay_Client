import React from "react";

const Button = ({ button_id, isActive, title, handleSelect }) => {
  return (
    <button
      className={`py-3 px-4 mr-2  hover:bg-[#ededed38] rounded-sm border-solid  ${
        isActive && " border-b-2 border-[#d3d3d3] bg-[#F7F7F7]"
      }`}
      onClick={() => handleSelect(button_id)}
    >
      {title}
    </button>
  );
};

export default Button;
