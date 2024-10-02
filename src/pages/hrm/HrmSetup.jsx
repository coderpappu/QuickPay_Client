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
import OfferLetterCard from "../../components/company/OfferLetterCard";
import ExperienceLetterCard from "../../components/company/ExpericeLetterCard";
import NocCard from "../../components/company/NocCard";
import BiometricCard from "../../components/company/BiometricCard";
import BranchCard from "../../components/hrm/BranchCard";
import DepartmentCard from "../../components/hrm/DepartmentCard";

const HrmSetup = () => {
  const [activeSetting, setActiveSetting] = useState(1);

  const handleActiveSettingId = (id) => {
    setActiveSetting(id);
  };

  const systemMenuList = [
    {
      title: "Branch",
      id: 1,
    },
    {
      title: "Department",
      id: 2,
    },
    {
      title: "Designation",
      id: 3,
    },
    {
      title: "Leave Type",
      id: 4,
    },
    {
      title: "Payslip Type",
      id: 5,
    },
    {
      title: "Allowance Option",
      id: 6,
    },
    {
      title: "Loan Option",
      id: 7,
    },
    {
      title: "Deduction Option",
      id: 8,
    },
    {
      title: "Termination Type",
      id: 9,
    },
  ];

  return (
    <div>
      {/* heading  */}
      <div className="text-md dark:text-dark-text-color">
        <h2>HRM Settings</h2>
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
          {activeSetting == 1 && <BranchCard />}

          {activeSetting == 2 && <DepartmentCard />}
          {activeSetting == 3 && <CompanySettings />}
          {activeSetting == 4 && <CurrencyCard />}
          {activeSetting == 5 && <EmailCard />}
          {activeSetting == 6 && <PaymentCard />}
          {activeSetting == 7 && <ZoomMeetingCard />}
          {activeSetting == 8 && <NotificationCard />}
          {activeSetting == 9 && <OfferLetterCard />}
        </div>
      </div>
    </div>
  );
};

export default HrmSetup;
