import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const BoardMenuButton = ({ title, id, activeId, handleActiveIdOnClick }) => {
  return (
    <div
      className={` ${activeId == id ? "bg-button-bg text-white dark:text-white" : ""} px-4 py-1 h-14 flex justify-between items-center dark:text-dark-text-color cursor-pointer border-b border-dark-box  dark:border-dark-border-color dark:border-opacity-5 border-opacity-5 text-sm`}
      onClick={() => handleActiveIdOnClick(id)}
    >
      {title} <IoIosArrowForward />
    </div>
  );
};

export default BoardMenuButton;
