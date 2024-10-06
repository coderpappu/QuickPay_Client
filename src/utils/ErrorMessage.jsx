import React from "react";
import { VscError } from "react-icons/vsc";

const ErrorMessage = ({ message, theme = "light" }) => {
  const isDarkTheme = theme === "dark";
  const bgColor = isDarkTheme ? "#333" : "#fae9e3"; // Replace "#333" with your dark theme background color
  const borderColor = isDarkTheme ? "#555" : "#f5c6cb"; // Replace "#555" with your dark theme border color
  const textColor = isDarkTheme ? "#fff" : "#721c24"; // Replace "#fff" with your dark theme text color

  return (
    <div
      className={`w-[950px] px-4 py-2 flex flex-wrap items-center border-2 rounded-md`}
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <VscError className="mr-2" style={{ color: textColor }} />
      <span style={{ color: textColor }}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
