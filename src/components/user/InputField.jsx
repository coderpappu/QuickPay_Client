// src/components/InputField.js
import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, placeholder }) => (
  <div>
    <label htmlFor={name} className="text-md text-[#797979]">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-[100%] h-12 border-1 border-[#ddd] rounded-[5px] mt-1 mb-3 px-1"
    />
    <ErrorMessage name={name} component="div" className="text-[red]" />
  </div>
);

export default InputField;
