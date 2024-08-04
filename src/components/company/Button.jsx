import React from "react";

const Button = ({ button_id, isActive, title, handleSelect }) => {
  return (
    <button
      className={`py-3 px-3 mr-2 shadow-sm hover:bg-[#ededed38] rounded-sm border-solid border-b-2 ${
        isActive && "border-[#6D28D9]"
      }`}
      onClick={() => handleSelect(button_id)}
    >
      {title}
    </button>
  );
};

export default Button;
