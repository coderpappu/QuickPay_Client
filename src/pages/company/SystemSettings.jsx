import React from "react";
import BoardMenuButton from "../../components/company/BoardMenuButton";
import { useState } from "react";

import BrandCard from "../../components/company/BrandCard";
import SystemSettingsCard from "../../components/company/SystemSettings";
const SystemSettings = () => {
  const [activeSetting, setActiveSetting] = useState(1);

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
        <div className="w-[73%]">
          {/* settings Card  */}
          {activeSetting == 1 && <BrandCard />}

          {activeSetting == 2 && <SystemSettingsCard />}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
