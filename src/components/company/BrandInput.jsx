import React from "react";

const BrandInput = ({ title, placeText }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeText}
        className=" w-full px-2 py-1 border-dark-box border  border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm  focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
      />
    </>
  );
};

export default BrandInput;
