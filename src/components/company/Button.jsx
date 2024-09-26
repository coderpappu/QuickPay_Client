import React from "react";

const Button = ({ button_id, isActive, title, handleSelect }) => {
  return (
    <button
      className={`py-3 px-4 mr-2  hover:bg-[#ededed38] hover:dark:bg-dark-box rounded-sm border-solid dark:text-[#c4c7ce] ${
        isActive &&
        " border-b-2 border-[#d3d3d3] dark:border-slate-500 bg-[#F7F7F7] dark:bg-dark-box dark:text-[#c4c7ce]"
      }`}
      onClick={() => handleSelect(button_id)}
    >
      {title}
    </button>
  );
};

export default Button;
