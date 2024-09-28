import React from "react";
import BoardMenuButton from "../../components/company/BoardMenuButton";
import { useState } from "react";
import SettingCardHeader from "../../components/company/SettingCardHeader";
import SettingCardFooter from "../../components/company/SettingCardFooter";

import LogoImg from "../../assets/quickPayLogo.png";
import LogoUploadCard from "../../components/company/LogoUploadCard";
const SystemSettings = () => {
  const [activeSetting, setActiveSetting] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });
  const handleActiveSettingId = (id) => {
    setActiveSetting(id);
  };

  // Handler for file changes, updating the object state
  const handleFileChange = (event, fileKey) => {
    console.log(fileKey);
    setSelectedFiles((prevState) => ({
      ...prevState,
      [fileKey]: event.target.files[0],
    }));
  };
  const systemMenuList = [
    {
      title: "Brand Settings",
      id: 1,
    },
    {
      title: "Company Settings",
      id: 2,
    },
    {
      title: "Currency Settings",
      id: 3,
    },
    {
      title: "Email Settings",
      id: 4,
    },
    {
      title: "Payments Settings",
      id: 5,
    },
    {
      title: "Zoom Settings",
      id: 6,
    },
    {
      title: "Email Notification Settings",
      id: 7,
    },
    {
      title: "Offer Letter Settings",
      id: 8,
    },
    {
      title: "Joining Letter Settings",
      id: 9,
    },
    {
      title: "Experience Certificate Settings",
      id: 10,
    },
    {
      title: "NOC Notification Settings",
      id: 11,
    },
    {
      title: "IP Letter Settings",
      id: 12,
    },
    {
      title: "Biometric Attendance Settings",
      id: 13,
    },
  ];

  console.log(selectedFiles);
  return (
    <div>
      {/* heading  */}
      <div className="text-md dark:text-dark-text-color">
        <h2>Company/Settings</h2>
      </div>

      <div className="flex justify-between my-4">
        {/* board of system menu */}
        <div className="w-[25%] bg-white dark:bg-dark-card rounded-md h-auto ">
          {/* menu button  */}
          {systemMenuList?.map((menu) => (
            <BoardMenuButton
              key={menu?.id}
              title={menu?.title}
              id={menu?.id}
              activeId={activeSetting}
              handleActiveIdOnClick={handleActiveSettingId}
            />
          ))}
        </div>

        {/* show box  */}
        <div className="w-[70%]">
          {/* settings Card  */}
          <div className="w-full h-auto bg-white dark:bg-dark-card  rounded-md ">
            {/* setting card heading  */}
            <SettingCardHeader
              title="Brand Settings"
              subTitle="Edit your brand details"
            />

            {/* card content  */}
            <div className="px-6 py-3 flex justify-between ">
              <LogoUploadCard
                handleFileChange={(event) => handleFileChange(event, "file1")}
                selectedFile={selectedFiles.file1}
                LogoImg={LogoImg}
                name="file1"
              />
              <LogoUploadCard
                handleFileChange={(event) => handleFileChange(event, "file2")}
                selectedFile={selectedFiles.file2}
                LogoImg={LogoImg}
                name="file2"
              />
              <LogoUploadCard
                handleFileChange={(event) => handleFileChange(event, "file3")}
                selectedFile={selectedFiles.file3}
                LogoImg={LogoImg}
                name="file3"
              />
            </div>

            {/* card footer  */}
            <SettingCardFooter title={"Save"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
