import React from "react";

import BasicSalaryCard from "./BasicSalaryCard";
import EmployeeAllowanceCard from "./EmployeeAllowanceCard";
import BankAccountCard from "./EmployeeBankAcc";
import EmployeeBonusCard from "./EmployeeBonusCard";
import EmployeeDeductionCard from "./EmployeeDeductionCard";
import EmployeeOverTimeCard from "./EmployeeOverTimeCard";
import EmployeeOverTimeSettingCard from "./EmployeeOvertimeSwitch";

const SalaryUpdate = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <div className="w-[49%]">
          <BasicSalaryCard />
        </div>
        <div className="w-[49%]">
          <EmployeeBonusCard />
        </div>

        <div className="w-[49%]">
          <EmployeeDeductionCard />
        </div>
        <div className="w-[49%]">
          <EmployeeAllowanceCard />
        </div>

        <div className="w-[49%]">
          <EmployeeOverTimeCard />
        </div>
        <div className="w-[49%]">
          <EmployeeOverTimeSettingCard />
        </div>

        <div className="w-[100%]">
          <BankAccountCard />
        </div>
      </div>
    </div>
  );
};

export default SalaryUpdate;
