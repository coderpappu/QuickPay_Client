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
import DepartmentCard from "../../components/hrm/department/DepartmentCard";
import DesignationCard from "../../components/hrm/DesignationCard";
import LeaveCard from "../../components/hrm/LeaveCard";
import AllowanceCard from "../../components/hrm/AllowanceCard";
import DeductionCard from "../../components/hrm/DeductionCard";
import LoanCard from "../../components/hrm/LoanCard";
import PaySlipCard from "../../components/hrm/PayslipCard";
import TerminationCard from "../../components/hrm/TerminationCard";
import EarnLeave from "../leave/earnLeave/EarnLeave";

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
      title: "Earn Leave",
      id: 5,
    },
    {
      title: "Payslip Type",
      id: 6,
    },
    {
      title: "Allowance Option",
      id: 7,
    },
    {
      title: "Loan Option",
      id: 8,
    },
    {
      title: "Deduction Option",
      id: 9,
    },
    {
      title: "Termination Type",
      id: 10,
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
          {activeSetting == 3 && <DesignationCard />}
          {activeSetting == 4 && <LeaveCard />}
          {activeSetting == 5 && <EarnLeave />}
          {activeSetting == 6 && <PaySlipCard />}
          {activeSetting == 7 && <AllowanceCard />}
          {activeSetting == 8 && <LoanCard />}
          {activeSetting == 9 && <DeductionCard />}
          {activeSetting == 10 && <TerminationCard />}
        </div>
      </div>
    </div>
  );
};

export default HrmSetup;
