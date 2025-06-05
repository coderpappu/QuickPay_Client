import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  useGetbrandQuery,
  useGetEmployeeSalarySheetQuery,
} from "../../../features/api";
import PayslipDownloadButton from "./PayslipDownloadButton";

const PreviewPayslipCard = ({ slipPreview }) => {
  const payslipRef = useRef(null);

  const companyId = useSelector((state) => state.company.companyId);
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const { data: getEmployeeSalary } = useGetEmployeeSalarySheetQuery({
    ...slipPreview,
  });

  // Only render if the actual salary data is available
  if (!getEmployeeSalary?.data?.generatedSalary) return <div>Loading...</div>;
  
  const employeeData = getEmployeeSalary?.data?.generatedSalary?.Employee;
  const generateDate = getEmployeeSalary?.data?.generatedSalary?.generate_date;

  const leftside = [
    { basic: getEmployeeSalary?.data?.generatedSalary?.basic_salary } || [],
    ...(getEmployeeSalary?.data?.generatedSalary?.allowance_salary_sheet || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.overtime_salary_sheet || []),
    ...(getEmployeeSalary?.data?.totalCommission || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.other || []),
  ];

  const rightside = [
    ...(getEmployeeSalary?.data?.generatedSalary?.deduction_salary_sheet || []),
    ...(getEmployeeSalary?.data?.generatedSalary?.loan || []),
    ...(getEmployeeSalary?.data?.generatedSalary
      ?.LateEarlyOutLeaveSalaryDeduction || []),
  ];

  return (
    <div className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md dark:bg-dark-box">
      {/* Download Button */}
      <div className="mb-4 flex justify-end">
        <PayslipDownloadButton
          payslipRef={payslipRef}
          employeeData={employeeData}
          generateDate={generateDate}
        />
      </div>

      {/* Payslip Content - This div will be captured for PDF */}
      <div ref={payslipRef} className="bg-white p-4 dark:bg-dark-box">
        {/* Header */}

        <div className="mx-auto mb-4 h-auto w-[150px] text-center text-xl font-bold">
          <img src={brandDetails?.data?.lightImageUrl} alt="" />
        </div>

        <div className="mb-2 flex justify-between text-sm">
          <div className="mb-4 flex flex-col items-start gap-2">
            <p>
              <strong>ID No : </strong> {employeeData?.employeeId}
            </p>
            <p>
              <strong>Name :</strong> {employeeData?.name}
            </p>
            <p>
              <strong>Department : </strong>{" "}
              {employeeData?.EmployeeDepartment?.[0]?.department?.name}
            </p>
            <p>
              <strong>Designation : </strong>{" "}
              {employeeData?.EmployeeDesignation?.[0]?.designation?.name}
            </p>
            <p>
              <strong>Section : </strong>{" "}
              {employeeData?.EmployeeSection?.[0]?.section?.name}
            </p>
          </div>
          <div className="mb-4 flex flex-col items-start gap-2 text-right">
            <p>
              <strong>Shift : </strong>{" "}
              {employeeData?.EmployeeShift?.[0]?.shift?.name}
            </p>
            <p>
              <strong>O.T Hours : </strong> {leftside[4]?.hour || 0}
            </p>
            <p>
              <strong>Late Day : </strong>{" "}
              {getEmployeeSalary?.data?.totalLateDay || 0}
            </p>

            <p>
              <strong>Month :</strong>{" "}
              {getEmployeeSalary?.data?.generatedSalary?.generate_date}
            </p>

            <p>
              <strong>Status :</strong>{" "}
              {getEmployeeSalary?.data?.generatedSalary?.status}
            </p>
          </div>
        </div>

        {/* Earnings and Deductions Table */}
        <div className="mb-4 border border-gray-200 text-sm dark:border-dark-card">
          {/* Header Row */}
          <div className="grid grid-cols-4 border-b border-gray-200 font-bold dark:border-dark-card">
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              Earnings
            </div>
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              Amount
            </div>
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              Deductions
            </div>
            <div className="p-2">Amount</div>
          </div>

          {/* Dynamic Rows */}
          {Array(Math.max(leftside.length, rightside.length))
            .fill(null)
            .map((_, index) => {
              const leftData = leftside[index];
              const rightData = rightside[index];

              // Hide late_day_salary, unpaid_leave_salary, early_out_salary if amount is 0
              const isSpecialDeduction =
                rightData &&
                [
                  "late_day_salary",
                  "unpaid_leave_salary",
                  "early_out_salary",
                ].includes(rightData.title);
              const hideRight =
                isSpecialDeduction &&
                (!rightData.amount || rightData.amount === 0);

              if (!leftData && (!rightData || hideRight)) {
                return null; // Skip rendering if both left and right data are not found or right is hidden
              }

              return (
                <div
                  className="grid grid-cols-4 border-b border-gray-200 dark:border-dark-card"
                  key={index}
                >
                  {/* Left Side (Earnings) */}
                  {leftData && (
                    <>
                      <div className="border-r border-gray-200 p-2 dark:border-dark-card">
                        {leftData.basic
                          ? "Basic Salary"
                          : leftData.EmployeeAllowance?.AllowanceType?.name
                            ? leftData.EmployeeAllowance.AllowanceType.name
                            : leftData.hour_rate
                              ? "Overtime Salary"
                              : leftData.hour_rate
                                ? "Hourly Rate"
                                : leftData.total_com
                                  ? "Commission"
                                  : leftData.name || ""}
                      </div>

                      <div className="border-r border-gray-200 p-2 dark:border-dark-card">
                        {leftData.basic ||
                          leftData.amount ||
                          (leftData.overtime_salary
                            ? Number(leftData.overtime_salary)
                            : leftData.total_com) ||
                          leftData.name ||
                          ""}
                      </div>
                    </>
                  )}

                  {/* Right Side (Deductions) */}
                  {rightData && !hideRight && (
                    <>
                      <div className="border-r border-gray-200 p-2 dark:border-dark-card">
                        {rightData.EmployeeDeduction?.DeductionType?.name
                          ? rightData.EmployeeDeduction?.DeductionType?.name
                          : rightData.title
                            ? rightData.title === "late_day_salary"
                              ? "Late Day Salary"
                              : rightData.title === "unpaid_leave_salary"
                                ? "Unpaid Leave Salary"
                                : rightData.title === "early_out_salary"
                                  ? "Early Out Salary"
                                  : rightData.title
                            : rightData?.LateSalary
                              ? "Late Salary"
                              : rightData.name || ""}
                      </div>
                      <div className="p-2">
                        {rightData.amount
                          ? rightData.amount
                          : rightData?.LateSalary || ""}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          {/* Total Row */}
          <div className="grid grid-cols-4 font-bold">
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              Total Earning
            </div>
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              {Math.round(getEmployeeSalary?.data?.totalEarning)}
            </div>
            <div className="border-r border-gray-200 p-2 dark:border-dark-card">
              Total Deduction
            </div>
            <div className="p-2">
              {Math.round(
                getEmployeeSalary?.data?.totalDeduction +
                  getEmployeeSalary?.data?.lateDaySalary +
                  getEmployeeSalary?.data?.unpaidLeaveSalary +
                  getEmployeeSalary?.data?.earlyOutSalary,
              )}
            </div>
          </div>
        </div>

        {/* Net Amount */}
        <div className="flex justify-end text-lg font-bold">
          <p>Net Salary : {getEmployeeSalary?.data?.netSalary}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPayslipCard;
