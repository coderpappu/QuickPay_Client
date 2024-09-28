import React from "react";
import BoardMenuButton from "../../components/company/BoardMenuButton";
import { useState } from "react";
import SettingCardHeader from "../../components/company/SettingCardHeader";
import SettingCardFooter from "../../components/company/SettingCardFooter";

import LogoImg from "../../assets/quickPayLogo.png";
import LogoUploadCard from "../../components/company/LogoUploadCard";
const SystemSettings = () => {
  const [activeSetting, setActiveSetting] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleActiveSettingId = (id) => {
    setActiveSetting(id);
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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
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
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                LogoImg={LogoImg}
              />
              <LogoUploadCard
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                LogoImg={LogoImg}
              />
              <LogoUploadCard
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                LogoImg={LogoImg}
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
