import React from "react";
import {
  useGetbrandQuery,
  useGetCompanyIdQuery,
  useGetEmployeeSalarySheetQuery,
} from "../../../features/api";

const SalarySheet = ({ slipPreview }) => {
  console.log(slipPreview);
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const { data: getEmployeeSalary } = useGetEmployeeSalarySheetQuery({
    ...slipPreview,
  });

  console.log(getEmployeeSalary?.data);

  const leftside = [
    { basic: getEmployeeSalary?.data?.generatedSalary?.basic_salary } || [],
    ...(getEmployeeSalary?.data?.generatedSalary?.allowance_salary_sheet || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.overtime_salary_sheet || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.commission_salary_sheet ||
      []),
    ...(getEmployeeSalary?.data?.generatedSalary?.other || []),
  ];

  const rightside = [
    ...(getEmployeeSalary?.data?.generatedSalary?.deduction_salary_sheet || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.loan || []),
  ];

  return (
    <div className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md dark:bg-dark-box">
      {/* Header */}
      <div className="mx-auto mb-4 h-auto w-[150px] text-center text-xl font-bold">
        <img src={brandDetails?.data?.lightImageUrl} alt="" />
      </div>
      <div className="mb-2 flex justify-between text-sm">
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
      <div className="mb-4 border border-dark-card text-sm">
        {/* Header Row */}
        <div className="grid grid-cols-4 border-b border-dark-card font-bold">
          <div className="border-r border-dark-card p-2">Earnings</div>
          <div className="border-r border-dark-card p-2">Amount</div>
          <div className="border-r border-dark-card p-2">Deductions</div>
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
              <div className="border-r border-dark-card p-2">
                {(leftside?.[index]?.basic && "Basic Salary") ||
                  leftside[index]?.EmployeeAllowance?.AllowanceType?.name ||
                  (leftside[index]?.hour && "Overtime") ||
                  leftside[index]?.name ||
                  ""}
              </div>

              <div className="border-r border-dark-card p-2">
                {leftside?.[index]?.basic ||
                  leftside[index]?.amount ||
                  leftside[index]?.overtime_salary ||
                  leftside[index]?.name ||
                  ""}
              </div>

              {/* Right Side (Deductions) */}
              <div className="border-r border-dark-card p-2">
                {rightside[index]?.EmployeeDeduction?.DeductionType?.name ||
                  rightside[index]?.name ||
                  ""}
              </div>
              <div className="p-2">{rightside[index]?.amount || ""}</div>
            </div>
          ))}

        {/* Total Row */}
        <div className="grid grid-cols-4 font-bold">
          <div className="border-r border-dark-card p-2">Total Allowance</div>
          <div className="border-r border-dark-card p-2">
            {Math.round(getEmployeeSalary?.data?.totalAllowance)}
          </div>
          <div className="border-r border-dark-card p-2">Total Deduction</div>
          <div className="p-2">
            {Math.round(getEmployeeSalary?.data?.totalDeduction)}
          </div>
        </div>
      </div>

      {/* Net Amount */}
      <div className="flex justify-end text-lg font-bold">
        <p>Net Salary : {Math.round(getEmployeeSalary?.data?.netSalary)}</p>
      </div>
    </div>
  );
};

export default SalarySheet;
