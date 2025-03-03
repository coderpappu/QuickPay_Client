import { Field } from "formik";
import React from "react";

const SelectorInput = ({ options, name }) => {
  return (
    <Field
      as="select"
      name={name}
      className="bg-light-input h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
