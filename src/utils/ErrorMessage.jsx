import React from "react";
import { VscError } from "react-icons/vsc";

const ErrorMessage = ({ message, theme = "light" }) => {

  return (
    <div
      className={`w-[700px] text-red-600 m-auto my-5 px-4 py-2 flex flex-wrap items-center border dark:border-none rounded-md dark:bg-dark-box `}
    >
      <VscError className="mr-2 "  />
      <span >{message}</span>
    </div>
  );
};

export default ErrorMessage;
