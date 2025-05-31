import { useSelector } from "react-redux";
import {
  useGetbrandQuery,
  useGetEmployeeSalarySheetQuery,
} from "../../../features/api";

const SalarySheet = ({ slipPreview }) => {
  const companyId = useSelector((state) => state.company.companyId);
  const { data: brandDetails } = useGetbrandQuery(companyId);

  const { data: getEmployeeSalary } = useGetEmployeeSalarySheetQuery({
    ...slipPreview,
  });

  const employeeData = getEmployeeSalary?.data?.generatedSalary?.Employee;

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
    { LateSalary: getEmployeeSalary?.data?.lateDaySalary } || [],
  ];

  console.log(getEmployeeSalary?.data?.lateDaySalary);

  return (
    <div className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md dark:bg-dark-box">
      {/* Header */}
      <div className="mx-auto mb-4 h-auto w-[150px] text-center text-xl font-bold">
        <img src={brandDetails?.data?.lightImageUrl} alt="" />
      </div>
      <div className="mb-2 flex justify-between text-sm">
        <div>
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
        <div className="text-right">
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
      <div className="mb-4 border border-dark-card text-sm">
        {/* Header Row */}
        <div className="grid grid-cols-4 border-b border-dark-card font-bold">
          <div className="border-r border-dark-card p-2">Earnings</div>
          <div className="border-r border-dark-card p-2">Amount</div>
          <div className="border-r border-dark-card p-2">Deductions</div>
          <div className="p-2">Amount</div>
        </div>

        {/* Dynamic Rows */}
        {/* Dynamic Rows */}
        {Array(Math.max(leftside.length, rightside.length))
          .fill(null)
          .map((_, index) => {
            const leftData = leftside[index];
            const rightData = rightside[index];

            if (!leftData && !rightData) {
              return null; // Skip rendering if both left and right data are not found
            }

            return (
              <div
                className="grid grid-cols-4 border-b border-dark-card"
                key={index}
              >
                {/* Left Side (Earnings) */}
                {leftData && (
                  <>
                    <div className="border-r border-dark-card p-2">
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

                    <div className="border-r border-dark-card p-2">
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
                {rightData && (
                  <>
                    <div className="border-r border-dark-card p-2">
                      {rightData.EmployeeDeduction?.DeductionType?.name
                        ? rightData.EmployeeDeduction?.DeductionType?.name
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
          <div className="border-r border-dark-card p-2">Total Earning</div>
          <div className="border-r border-dark-card p-2">
            {Math.round(getEmployeeSalary?.data?.totalEarning)}
          </div>
          <div className="border-r border-dark-card p-2">Total Deduction</div>
          <div className="p-2">
            {Math.round(
              getEmployeeSalary?.data?.totalDeduction +
                getEmployeeSalary?.data?.lateDaySalary,
            )}
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
