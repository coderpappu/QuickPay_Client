import React from "react";
import { useState } from "react";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import LogoUploadCard from "./LogoUploadCard";
import BrandText from "./BrandText";
import LogoImg from "../../assets/quickPayLogo.png";
const BrandCard = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });

  // Handler for file changes, updating the object state
  const handleFileChange = (event, fileKey) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));
  };
  return (
    <div className="w-full h-auto bg-white dark:bg-dark-card  rounded-md ">
      {/* setting card heading  */}
      <SettingCardHeader
        title="Brand Settings"
        subTitle="Edit your brand details"
      />

      <div className="py-3">
        {/* card content  */}
        <div className="px-6 py-3 flex justify-between ">
          <LogoUploadCard
            title="Logo Dark"
            handleFileChange={(event) => handleFileChange(event, "file1")}
            selectedFile={selectedFiles.file1}
            LogoImg={LogoImg}
            name="file1"
          />
          <LogoUploadCard
            title="Logo Light"
            handleFileChange={(event) => handleFileChange(event, "file2")}
            selectedFile={selectedFiles.file2}
            LogoImg={LogoImg}
            name="file2"
          />
          <LogoUploadCard
            title="Favicon"
            handleFileChange={(event) => handleFileChange(event, "file3")}
            selectedFile={selectedFiles.file3}
            LogoImg={LogoImg}
            name="file3"
          />
        </div>

        {/* title and text section  */}
        <div className="px-6 py-3 flex justify-between">
          <div className="w-[24%]">
            <BrandText title="Title Text" placeText="Xceed Bangladesh LTD" />
          </div>
          <div className="w-[24%]">
            <BrandText title="Footer Text" placeText="@ Quick Pay 2024" />
          </div>
          <div className="w-[24%]">
            <h2 className="text-sm dark:text-dark-text-color leading-7">
              Default Language
            </h2>
            <select
              type="select"
              className=" w-full px-2 py-1 border-dark-box border  border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm  focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            >
              <option>Select Language</option>
              <option>English</option>
              <option>Bangla</option>
            </select>
          </div>
          <div className="w-[24%]"></div>
        </div>
      </div>

      {/* card footer  */}
      <SettingCardFooter title={"Save"} />
    </div>
  );
};

export default BrandCard;
