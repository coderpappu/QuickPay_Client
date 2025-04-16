import React from "react";

import BasicSalaryCard from "./BasicSalaryCard";
import EmployeeAllowanceCard from "./EmployeeAllowanceCard";
import EmployeeBonusCard from "./EmployeeBonusCard";
import EmployeeCommissionCard from "./EmployeeCommissionCard";
import EmployeeDeductionCard from "./EmployeeDeductionCard";
import EmployeeOverTimeCard from "./EmployeeOverTimeCard";
import EmployeeOverTimeSettingCard from "./EmployeeOvertimeSwitch";

const SalaryUpdate = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 space-y-3">
        <div className="w-[49%]">
          <BasicSalaryCard />
        </div>
        <div className="w-[49%]">
          <EmployeeCommissionCard />
        </div>

        <div className="w-[49%]">
          <EmployeeDeductionCard />
        </div>
        <div className="w-[49%]">
          <EmployeeAllowanceCard />
        </div>
        <div className="w-[49%]">
          <EmployeeBonusCard />
        </div>

        <div className="w-[49%]">
          <EmployeeOverTimeCard />
        </div>
        <div className="w-[49%]">
          <EmployeeOverTimeSettingCard />
        </div>
      </div>
    </div>
  );
};

export default SalaryUpdate;
