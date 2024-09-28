import React from "react";

const LogoUploadCard = ({ handleFileChange, selectedFile, LogoImg, name }) => {
  return (
    <div className="w-[30%] h-auto dark:bg-dark-box rounded-md py-2">
      <div className="border-b border-dark-card dark:border-opacity-35 dark:text-dark-text-color px-4 py-4">
        Logo Dark
      </div>

      <div className="w-full  px-5 py-3">
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : LogoImg}
          alt="Quick Pay Logo"
          className="w-[80px] "
        />
      </div>

      <div className=" px-5 py-3">
        <label
          htmlFor={name}
          className="bg-button-bg text-[10px] px-3 py-2 rounded-lg text-white"
        >
          Choose file here
        </label>
        <input
          type="file"
          name="jk"
          id={name}
          accept="image/*"
          onChange={handleFileChange}
          className="bg-button-bg"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default LogoUploadCard;
