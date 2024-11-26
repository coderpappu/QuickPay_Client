import React from "react";
import BasicSalaryCard from "./BasicSalaryCard";
import EmployeeAllowanceCard from "./EmployeeAllowanceCard";
import EmployeeCommissionCard from "./EmployeeCommissionCard";
import EmployeeDeductionCard from "./EmployeeDeductionCard";
import EmployeeOverTimeCard from "./EmployeeOverTimeCard";

const SalaryUpdate = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between ">
        <div className="w-[49%]">
          <BasicSalaryCard />
        </div>
        <div className="w-[49%]">
          <EmployeeCommissionCard />
        </div>
      </div>

      <div className="flex flex-wrap justify-between my-4">
        <div className="w-[49%]">
          <EmployeeDeductionCard />
        </div>
        <div className="w-[49%]">
          <EmployeeAllowanceCard />
        </div>
      </div>

      <div className="flex flex-wrap justify-between my-4">
        <div className="w-[49%]">
          <EmployeeOverTimeCard />
        </div>
        <div className="w-[49%]">{/* <EmployeeAllowanceCard /> */}</div>
      </div>
    </div>
  );
};

export default SalaryUpdate;
