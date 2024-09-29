import React from "react";
import { useState } from "react";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import LogoUploadCard from "./LogoUploadCard";
import BrandInput from "./BrandInput";
import LogoImg from "../../assets/quickPayLogo.png";
import BrandCardWrapper from "./BrandCardWrapper";
import SelectorInput from "./SelectorInput";
import InputTitle from "./InputTitle";
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
    <BrandCardWrapper>
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
            <InputTitle title="Title Text" />
            <BrandInput placeText="Xceed Bangladesh LTD" />
          </div>
          <div className="w-[24%]">
            <InputTitle title="Footer Text" />
            <BrandInput placeText="@ Quick Pay 2024" />
          </div>
          <div className="w-[24%]">
            <InputTitle title="Default Language" />
            <SelectorInput options={["Select Language", "Bangla", "English"]} />
          </div>
          <div className="w-[24%]"></div>
        </div>
      </div>

      {/* card footer  */}
      <SettingCardFooter title={"Save"} />
    </BrandCardWrapper>
  );
};

export default BrandCard;
