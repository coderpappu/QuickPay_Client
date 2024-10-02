import React from "react";

const TextBoxLetter = ({ title, varName }) => {
  return (
    <div className="w-[30%] p-3">
      <h2 className="text-xs  dark:text-light-text-color">
        {title} :
        <label htmlFor="" className="text-blue-500">
          {` "{ ${varName} }"`}
        </label>
      </h2>
    </div>
  );
};

export default TextBoxLetter;
