import React from "react";

const SettingCardFooter = ({ title, handleUpdate }) => {
  return (
    <div className="flex items-center justify-end border-t border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
      <button
        className="rounded-md bg-button-bg px-8 py-2 text-white"
        onClick={() => handleUpdate()}
        type="submit"
      >
        {title}
      </button>
    </div>
  );
};

export default SettingCardFooter;
