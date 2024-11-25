import React from "react";
import BasicSalaryCard from "./BasicSalaryCard";
import EmployeeAllowanceCard from "./EmployeeAllowanceCard";
import EmployeeDeductionCard from "./EmployeeDeductionCard";

const SalaryUpdate = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between ">
        <div className="w-[49%]">
          <EmployeeAllowanceCard />
        </div>
        <div className="w-[49%]">
          <EmployeeDeductionCard />
        </div>
      </div>

      <div className="flex flex-wrap justify-between my-4">
        <div className="w-[49%]">
          <BasicSalaryCard />
        </div>
        <div className="w-[49%]">
          <EmployeeDeductionCard />
        </div>
      </div>
    </div>
  );
};

export default SalaryUpdate;
