import React, { useState } from "react";
import BoardMenuButton from "../../components/company/BoardMenuButton";

import AllowanceCard from "../../components/hrm/allowance/AllowanceCard";
import BranchCard from "../../components/hrm/branch/BranchCard";
import DeductionCard from "../../components/hrm/deduction/DeductionCard";
import DepartmentCard from "../../components/hrm/department/DepartmentCard";
import DesignationCard from "../../components/hrm/designation/DesignationCard";
import EarnLeave from "../../components/hrm/Leave/EarnLeave";
import LeaveCard from "../../components/hrm/Leave/LeaveCard";
import LoanCard from "../../components/hrm/loan/LoanCard";
import PaySlipCard from "../../components/hrm/PayslipCard";
import SectionCard from "../../components/hrm/section/SectionCard";
import TerminationCard from "../../components/hrm/TerminationCard";

import BonusTypeCard from "../../components/hrm/bonus/BonusType";
import DocsTypeCard from "../../components/hrm/docsType/DocsType";
import GradeCard from "../../components/hrm/grade/GradeCard";
import ShiftCard from "../../components/hrm/shift/ShiftCard";

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
    {
      title: "Section",
      id: 11,
    },
    {
      title: "Shift",
      id: 12,
    },
    {
      title: "Grade",
      id: 13,
    },
    {
      title: "Document Type",
      id: 14,
    },
    {
      title: "Bonus Type",
      id: 15,
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
          {activeSetting == 11 && <SectionCard />}
          {activeSetting == 12 && <ShiftCard />}
          {activeSetting == 13 && <GradeCard />}
          {activeSetting == 14 && <DocsTypeCard />}
          {activeSetting == 15 && <BonusTypeCard />}
        </div>
      </div>
    </div>
  );
};

export default HrmSetup;
