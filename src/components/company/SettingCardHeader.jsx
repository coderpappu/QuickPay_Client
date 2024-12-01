import React from "react";
import { IoAdd } from "react-icons/io5";

const SettingCardHeader = ({ title, subTitle }) => {
  return (
    <div className="border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
      <h3 className="text-base leading-6 dark:text-dark-heading-color">
        {title}
      </h3>
      <p className="text-xs text-light-text-color">{subTitle}</p>
    </div>
  );
};

const HrmSetupCardHeader = ({ title, handleOpen, isPopupOpen }) => {
  return (
    <div className="flex justify-between items-center border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
      <div>
        <h3 className="text-base leading-6 dark:text-dark-heading-color">
          {title}
        </h3>
      </div>

      <div
        className="w-8 h-8 bg-green-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
        onClick={() => handleOpen()}
      >
        <IoAdd color="#fff" />
      </div>
    </div>
  );
};

export default SettingCardHeader;
export { HrmSetupCardHeader };
