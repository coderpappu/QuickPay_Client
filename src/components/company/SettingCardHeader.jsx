import React from "react";

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

export default SettingCardHeader;
