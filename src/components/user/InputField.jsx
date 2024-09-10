// src/components/InputField.js
import { ErrorMessage, Field } from "formik";
import React from "react";

const InputField = ({ label, name, type, placeholder }) => (
  <div>
    <label htmlFor={name} className="text-md text-[#797979]">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-[100%] h-12 border-1 border-[#3686FF] rounded-[5px] mt-1 mb-3 px-1"
    />
    <ErrorMessage name={name} component="div" className="text-[red]" />
  </div>
);

export default InputField;
