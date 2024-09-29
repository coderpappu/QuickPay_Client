import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

// const BrandInput = ({ title, placeText, type = "text" }) => {
//   return (
//     <>
//       <input
//         type={type}
//         placeholder={placeText}
//         className=" w-full px-2 py-1 border-dark-box border  border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm  focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
//       />
//     </>
//   );
// };

// eslint-disable-next-line react/prop-types
const InputBox = ({ name = "Ok", type, placeholder }) => {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder || ""}
      className="w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
    />
  );
};
export default InputBox;
