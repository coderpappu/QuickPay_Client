import React from "react";
import { IoAdd } from "react-icons/io5";

const SettingCardHeader = ({ title, subTitle }) => {
  return (
    <div className="border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
      <h3 className="text-base leading-6 dark:text-dark-heading-color">
        {title}
      </h3>
      <p className="text-xs text-light-text-color">{subTitle}</p>
    </div>
  );
};

const HrmSetupCardHeader = ({
  title,
  handleOpen,
  isPopupOpen,
  inputBox = true,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
      <div>
        <h3 className="text-base leading-6 dark:text-dark-heading-color">
          {title}
        </h3>
      </div>

      <div
        className={`h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-500 p-2 text-center ${inputBox ? "flex" : "hidden"}`}
        onClick={() => handleOpen()}
      >
        <IoAdd color="#fff" />
      </div>
    </div>
  );
};

export default SettingCardHeader;
export { HrmSetupCardHeader };
