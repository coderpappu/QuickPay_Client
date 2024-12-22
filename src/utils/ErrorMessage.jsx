import React from "react";
import { VscError } from "react-icons/vsc";

const ErrorMessage = ({ message, theme = "light" }) => {
  return (
    <div
      className={`m-auto my-5 flex max-w-[700px] flex-wrap items-center rounded-md border px-4 py-2 text-red-600 dark:border-none dark:bg-dark-box`}
    >
      <VscError className="mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
