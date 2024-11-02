import { Field } from "formik";
import React from "react";

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

const InputBox = ({ name, type = "text", placeholder, ...props }) => {
  return (
    <div>
      <Field
        name={name}
        type={type}
        placeholder={placeholder || ""}
        className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
        {...props} // Pass any additional props to the Field component
      />
      {/* <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      /> */}
    </div>
  );
};

const SelectOptionBox = ({ values, name }) => {
  return (
    <Field
      as="select"
      name={name || "ok"}
      className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color "
    >
      {/* <option value="">Select Option</option> */}
      {values.map((option, index) => (
        <option key={index} value={option} name={option}>
          {option}
        </option>
      ))}
    </Field>
  );
};
export default BrandInput;

export { InputBox, SelectOptionBox };
