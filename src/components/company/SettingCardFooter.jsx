import React from "react";

const SettingCardFooter = ({ title }) => {
  return (
    <div className="border-t border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4 flex justify-end items-center">
      <button className="px-8 py-2 rounded-md text-white bg-button-bg">
        {title}
      </button>
    </div>
  );
};

export default SettingCardFooter;
