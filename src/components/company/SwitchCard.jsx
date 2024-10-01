import React from "react";

const SwitchCard = ({ title }) => {
  return (
    <div
      className=" px-3 py-5 border border-dark-border-color dark:border-none
          
         dark:bg-dark-box rounded-md flex justify-between items-center"
    >
      <h2 className="text-sm  dark:text-light-text-color">{title}</h2>
      <label className="inline-flex items-center  cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

export default SwitchCard;
