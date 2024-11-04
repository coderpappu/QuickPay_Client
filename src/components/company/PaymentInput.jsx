import { Field } from "formik";
import React from "react";

const PaymentInput = ({ title, placeholder = "", name }) => {
  return (
    <>
      <h3 className="my-2">{title}</h3>
      <Field
        name={name}
        type="text"
        placeholder={placeholder}
        className="bg-light-bg dark:bg-dark-card w-full px-3 py-3 rounded-md outline-none"
      />
    </>
  );
};

export default PaymentInput;
