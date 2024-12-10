import React from "react";
import { useGetbrandQuery, useGetCompanyIdQuery } from "../../../features/api";

const SalarySheet = ({
  employee,
  earnings,
  deductions,
  netAmount,
  labels,
  slipPreview,
}) => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const leftside = [
    { basic: slipPreview?.basic_salary } || [],
    ...(slipPreview?.allowance_salary_sheet || []),
    ...(slipPreview?.overtime_salary_sheet || []),
    ...(slipPreview?.commission_salary_sheet || []),
    ...(slipPreview?.other || []),
  ];

  const rightside = [
    ...(slipPreview?.deduction_salary_sheet || []),
    ...(slipPreview?.loan || []),
  ];

  console.log(slipPreview?.status);
  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-dark-box shadow-md rounded-md p-6">
      {/* Header */}
      <div className="text-center text-xl font-bold mb-4 w-[150px] h-auto mx-auto">
        <img src={brandDetails?.data?.lightImageUrl} alt="" />
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <p>
            <strong>ID No : </strong> {slipPreview?.Employee?.employeeId}
          </p>
          <p>
            <strong>Name :</strong> {slipPreview?.Employee?.name}
          </p>
          <p>
            <strong>Department : </strong>{" "}
            {slipPreview?.Employee?.EmployeeDepartment?.[0]?.department?.name}
          </p>
          <p>
            <strong>Designation : </strong>{" "}
            {slipPreview?.Employee?.EmployeeDesignation?.[0]?.designation?.name}
          </p>
          <p>
            <strong>Section : </strong>{" "}
            {slipPreview?.Employee?.EmployeeSection?.[0]?.section?.name}
          </p>
        </div>
        <div className="text-right">
          <p>
            <strong>Shift : </strong>{" "}
            {slipPreview?.Employee?.EmployeeShift?.[0]?.shift?.name}
          </p>
          <p>
            <strong>O.T Hours : </strong>{" "}
            {Math.round(slipPreview?.overtime_salary_sheet?.[0]?.hour)}
          </p>

          <p>
            <strong>Month :</strong> {slipPreview?.generate_date}
          </p>

          <p>
            <strong>Status :</strong> {slipPreview?.status}
          </p>
        </div>
      </div>

      {/* Earnings and Deductions Table */}
      <div className="border border-dark-card text-sm mb-4">
        {/* Header Row */}
        <div className="grid grid-cols-4 border-b border-dark-card font-bold">
          <div className="p-2 border-r border-dark-card">Earnings</div>
          <div className="p-2 border-r border-dark-card">Amount</div>
          <div className="p-2 border-r border-dark-card">Deductions</div>
          <div className="p-2">Amount</div>
        </div>

        {/* Dynamic Rows */}
        {Array(Math.max(leftside.length, rightside.length))
          .fill(null)
          .map((_, index) => (
            <div
              className="grid grid-cols-4 border-b border-dark-card"
              key={index}
            >
              {/* Left Side (Earnings) */}
              <div className="p-2 border-r border-dark-card">
                {(leftside?.[index]?.basic && "Basic Salary") ||
                  leftside[index]?.EmployeeAllowance?.AllowanceType?.name ||
                  (leftside[index]?.hour && "Overtime") ||
                  leftside[index]?.name ||
                  ""}
              </div>

              <div className="p-2 border-r border-dark-card">
                {leftside?.[index]?.basic ||
                  leftside[index]?.amount ||
                  leftside[index]?.overtime_salary ||
                  leftside[index]?.name ||
                  ""}
              </div>

              {/* Right Side (Deductions) */}
              <div className="p-2 border-r border-dark-card">
                {rightside[index]?.EmployeeDeduction?.DeductionType?.name ||
                  rightside[index]?.name ||
                  ""}
              </div>
              <div className="p-2">{rightside[index]?.amount || ""}</div>
            </div>
          ))}

        {/* Total Row */}
        <div className="grid grid-cols-4 font-bold">
          <div className="p-2 border-r border-dark-card">
            {labels.totalSalaryEarned}
          </div>
          <div className="p-2 border-r border-dark-card">
            {Object.values(earnings).reduce((sum, value) => sum + value, 0)}
          </div>
          <div className="p-2 border-r border-dark-card">
            {labels.totalDeduction}
          </div>
          <div className="p-2">
            {Object.values(deductions).reduce((sum, value) => sum + value, 0)}
          </div>
        </div>
      </div>

      {/* Net Amount */}
      <div className="flex justify-end text-lg font-bold">
        <p>
          {labels.netAmount}: {netAmount}
        </p>
      </div>
    </div>
  );
};

export default SalarySheet;
