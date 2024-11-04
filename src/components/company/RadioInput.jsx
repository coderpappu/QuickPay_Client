import { useField } from "formik";
import React from "react";

const RadioInput = ({ title, name, value }) => {
  const [field] = useField({ name, type: "radio", value });

  return (
    <div className="dark:text-dark-text-color">
      <input
        {...field}
        type="radio"
        id={`${name}-${value}`}
        value={value}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={`${name}-${value}`} className="ml-2 text-sm">
        {title}
      </label>
    </div>
  );
};

export default RadioInput;
