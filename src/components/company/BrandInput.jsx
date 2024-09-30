import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const BrandInput = ({ title, placeText, type = "text" }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeText}
        className=" w-full px-2 py-1 border-dark-box border  border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm  focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
      />
    </>
  );
};

// eslint-disable-next-line react/prop-types
// const InputBox = ({ name, type, placeholder }) => {
//   return (
//     <Field
//       name={name || ""}
//       type={type || ""}
//       placeholder={placeholder || ""}
//       className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
//     />
//   );
// };

const InputBox = ({ name, type, placeholder, ...props }) => {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder || ""}
      className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
      {...props} // Pass any additional props to the Field component
    />
  );
};

const SelectOptionBox = ({ values }) => {
  return (
    <Field
      as="select"
      name={name}
      className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color "
    >
      <option value="">Select Timezone</option>
      {values.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Field>
  );
};
export default BrandInput;

export { InputBox, SelectOptionBox };
