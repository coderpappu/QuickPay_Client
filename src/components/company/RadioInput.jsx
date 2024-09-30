import React from "react";

const RadioInput = ({ title }) => {
  return (
    <div className="dark:text-dark-text-color">
      <input
        type="radio"
        name="position"
        id="pre"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor="pre" className="ml-2 text-sm">
        {title}
      </label>
    </div>
  );
};

export default RadioInput;
