import React from "react";
import { VscError } from "react-icons/vsc";

const ErrorMessage = ({ message }) => {
  return (
    <div className="w-[950px] px-4 py-2 bg-[#fae9e3] flex flex-wrap items-center border-2 border-red-200  rounded-md">
      <VscError className="mr-2 text-red-700" />
      {message}
    </div>
  );
};

export default ErrorMessage;
