import React from "react";
import BoardMenuButton from "../../components/company/BoardMenuButton";
import { useState } from "react";

import BrandCard from "../../components/company/BrandCard";
import SystemSettingsCard from "../../components/company/SystemSettings";
import CompanySettings from "../../components/company/CompanySettings";
import EmailCard from "../../components/company/EmailCard";
import CurrencyCard from "../../components/company/CurrencyCard";
import { Accordion } from "../../components/company/accordion";
import PaymentCard from "../../components/company/PaymentCard";
import ZoomMeetingCard from "../../components/company/ZoomMeetingCard";
import NotificationCard from "../../components/company/NotificationCard";
import JoiningLetterCard from "../../components/company/JoiningLetterCard";
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
      title: "System Settings",
      id: 2,
    },
    {
      title: "Company Settings",
      id: 3,
    },
    {
      title: "Currency Settings",
      id: 4,
    },
    {
      title: "Email Settings",
      id: 5,
    },
    {
      title: "Payments Settings",
      id: 6,
    },
    {
      title: "Zoom Settings",
      id: 7,
    },
    {
      title: "Email Notification Settings",
      id: 8,
    },
    {
      title: "Offer Letter Settings",
      id: 9,
    },
    {
      title: "Joining Letter Settings",
      id: 10,
    },
    {
      title: "Experience Certificate Settings",
      id: 11,
    },
    {
      title: "NOC Notification Settings",
      id: 12,
    },
    {
      title: "IP Letter Settings",
      id: 13,
    },
    {
      title: "Biometric Attendance Settings",
      id: 14,
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
        <div className="w-[25%] bg-white dark:bg-dark-card rounded-md h-full">
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
        <div className="w-[73%] overflow-auto  ">
          {/* settings Card  */}
          {activeSetting == 1 && <BrandCard />}

          {activeSetting == 2 && <SystemSettingsCard />}
          {activeSetting == 3 && <CompanySettings />}
          {activeSetting == 4 && <CurrencyCard />}
          {activeSetting == 5 && <EmailCard />}
          {activeSetting == 6 && <PaymentCard />}
          {activeSetting == 7 && <ZoomMeetingCard />}
          {activeSetting == 8 && <NotificationCard />}
          {activeSetting == 10 && <JoiningLetterCard />}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
