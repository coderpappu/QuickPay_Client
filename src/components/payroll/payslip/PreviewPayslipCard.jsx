import React from "react";

const SalarySheet = ({
  employee,
  earnings,
  deductions,
  netAmount,
  labels,
  slipPreview,
}) => {
  console.log(slipPreview);

  let totalRow = new Array(
    slipPreview?.allowance_salary_sheet?.length +
      slipPreview?.overtime_salary_sheet?.length +
      2
  ).fill(null);
  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-dark-box shadow-md rounded-md p-6">
      {/* Header */}
      <div className="text-center text-xl font-bold mb-4">
        {labels.companyName}
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <p>
            <strong>{labels.cardNo}</strong> {employee.cardNo}
          </p>
          <p>
            <strong>{labels.name}</strong> {employee.name}
          </p>
          <p>
            <strong>{labels.department}</strong> {employee.department}
          </p>
          <p>
            <strong>{labels.section}</strong> {employee.section}
          </p>
          <p>
            <strong>{labels.otHours}</strong> {employee.otHours}
          </p>
        </div>
        <div className="text-right">
          <p>
            <strong>{labels.salaryBand}</strong> {employee.salaryBand || "N/A"}
          </p>
          <p>
            <strong>{labels.slNo}</strong> {employee.slNo}
          </p>
          <p>
            <strong>{labels.month}</strong> {employee.month}
          </p>
          <p>
            <strong>{labels.payMode}</strong> {employee.payMode}
          </p>
          <p>
            <strong>{labels.bankAccount}</strong> {employee.bankAccount}
          </p>
        </div>
      </div>

      {/* Earnings and Deductions Table */}
      <table className="w-full border-collapse border border-dark-card  text-sm mb-4">
        <thead>
          <tr>
            <th className="border border-dark-card  p-2"> Earnings</th>
            <th className="border border-dark-card  p-2">Amount</th>
            <th className="border border-dark-card  p-2">Deductions</th>
            <th className="border border-dark-card  p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {totalRow?.map((allowance, index) => (
            <tr key={index}>
              {index < slipPreview?.allowance_salary_sheet?.length ? (
                <>
                  <td className="border border-dark-card  p-2">
                    {
                      slipPreview?.allowance_salary_sheet[index]
                        ?.EmployeeAllowance?.AllowanceType?.name
                    }
                  </td>
                  <td className="border border-dark-card  p-2">
                    {slipPreview?.allowance_salary_sheet[index]?.amount}
                  </td>
                </>
              ) : (
                <>
                  <td>

                    {
                        for (i = 0; i < slipPreview?.allowance_salary_sheet){

                        }
                    }
                    <td className="border border-dark-card  p-2">Overtime</td>
                    <td className="border border-dark-card  p-2">
                      {slipPreview?.overtime_salary_sheet[0]?.overtime_salary}
                    </td>
                    <td className="border border-dark-card  p-2">Overtime</td>
                    <td className="border border-dark-card  p-2">
                      {slipPreview?.overtime_salary_sheet[0]?.overtime_salary}
                    </td>
                  </td>
                </>
              )}
              <td className="border border-dark-card  p-2">
                {slipPreview?.deduction_salary_sheet[index]?.EmployeeDeduction
                  ?.DeductionType?.name || ""}
              </td>
              <td className="border border-dark-card  p-2">
                {slipPreview?.deduction_salary_sheet[index]?.amount || ""}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-dark-card  p-2 font-bold">
              {labels.totalSalaryEarned}
            </td>
            <td className="border border-dark-card  p-2 font-bold">
              {Object.values(earnings).reduce((sum, value) => sum + value, 0)}
            </td>
            <td className="border border-dark-card  p-2 font-bold">
              {labels.totalDeduction}
            </td>
            <td className="border border-dark-card p-2 font-bold">
              {Object.values(deductions).reduce((sum, value) => sum + value, 0)}
            </td>
          </tr>
        </tbody>
      </table>

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
