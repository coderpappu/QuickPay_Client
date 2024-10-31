import { Field } from "formik";
import React from "react";

const SelectorInput = ({ options, name }) => {
  return (
    <Field
      as="select"
      name={name}
      className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
    >
      <option value="" label="Select Time Zone" /> {/* Default option */}
      {options.map((optionValue, index) => (
        <option key={index} value={optionValue}>
          {optionValue}
        </option>
      ))}
    </Field>
  );
};

export default SelectorInput;
