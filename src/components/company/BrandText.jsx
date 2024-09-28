import React from "react";

const BrandText = ({ title, placeText }) => {
  return (
    <>
      <h2 className="text-sm dark:text-dark-text-color leading-7">{title}</h2>
      <input
        type="text"
        placeholder={placeText}
        className=" w-full px-2 py-1 border-dark-box border  border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm  focus:outline-none focus:border-button-bg focus:border"
      />
    </>
  );
};

export default BrandText;
