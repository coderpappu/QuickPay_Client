import {
  AlertTriangle,
  DollarSign,
  Edit,
  FileText,
  Trash2,
} from "lucide-react";

const SalaryTable = ({
  data,
  onViewPayslip,
  onPaySalary,
  onEditCommission,
  onDeleteSalarySheet,
  month,
  year,
  companyId,
}) => {
  if (!data.length) {
    return (
      <div className="py-8 text-center text-gray-500">
        No salary sheets found for the selected period.
      </div>
    );
  }

  // Calculate deduction amount
  const calculateDeduction = (sheet) => {
    const deductionAmount =
      (Array.isArray(sheet?.deduction_salary_sheet)
        ? sheet.deduction_salary_sheet.reduce(
            (sum, d) => sum + (d.amount || 0),
            0,
          )
        : 0) +
      (Array.isArray(sheet.LateEarlyOutLeaveSalaryDeduction)
        ? sheet.LateEarlyOutLeaveSalaryDeduction.reduce(
            (sum, item) => sum + (item.amount || 0),
            0,
          )
        : 0);

    return deductionAmount;
  };

  // Calculate allowance amount
  const calculateAllowance = (sheet) => {
    return Array.isArray(sheet?.allowance_salary_sheet)
      ? sheet.allowance_salary_sheet.reduce(
          (sum, a) => sum + (a.amount || 0),
          0,
        )
      : 0;
  };

  return (
    <div className="overflow-x-auto">
      {/* Table header */}
      <div className="min-w-full rounded-t-md bg-gray-50 dark:bg-dark-box">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          <div className="col-span-1">ID</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-1 text-right">Basic</div>
          <div className="col-span-1 text-right">Overtime</div>
          <div className="col-span-1 text-right">Allowance</div>
          <div className="col-span-1 text-right">Deduction</div>
          <div className="col-span-1 text-right">Net Salary</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-3 text-center">Actions</div>
        </div>
      </div>

      {/* Table body */}
      <div className="min-w-full divide-y divide-gray-200 dark:divide-dark-border-color dark:divide-opacity-10">
        {data.map((sheet) => (
          <div
            key={`${sheet.Employee.id}-${sheet.generate_date}`}
            className="grid grid-cols-12 gap-4 px-4 py-4 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-dark-box dark:hover:bg-opacity-50"
          >
            <div className="col-span-1 font-medium text-gray-900 dark:text-white">
              {sheet?.Employee?.employeeId}
            </div>

            <div className="col-span-2 font-medium text-gray-900 dark:text-white">
              {sheet?.Employee?.name}
            </div>
            <div className="col-span-1 text-right text-gray-700 dark:text-gray-300">
              {sheet?.basic_salary}
            </div>
            <div className="col-span-1 text-right text-gray-700 dark:text-gray-300">
              {Math.round(sheet?.overtime_salary_sheet?.[0]?.overtime_salary) ||
                0}
            </div>

            <div className="col-span-1 text-right text-gray-700 dark:text-gray-300">
              {calculateAllowance(sheet)}
            </div>

            <div className="col-span-1 text-right text-gray-700 dark:text-gray-300">
              {calculateDeduction(sheet)}
            </div>

            <div className="col-span-1 text-right font-medium text-gray-900 dark:text-white">
              {sheet?.netSalary || 0}
            </div>

            <div className="col-span-1">
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    sheet?.status === "Paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-400"
                  }`}
                >
                  {sheet?.status === "Paid" ? (
                    <DollarSign className="mr-1 h-3 w-3" />
                  ) : (
                    <AlertTriangle className="mr-1 h-3 w-3" />
                  )}
                  {sheet?.status}
                </span>
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex justify-center space-x-2">
                <button
                  className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-400 dark:hover:bg-opacity-30"
                  onClick={() =>
                    onViewPayslip(
                      sheet?.Employee?.id,
                      sheet?.Employee?.deviceUserId,
                      companyId,
                      month,
                      year,
                    )
                  }
                >
                  <FileText className="h-3.5 w-3.5" />
                  Payslip
                </button>

                {sheet?.status !== "Paid" && (
                  <button
                    className="flex items-center gap-1 rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400 dark:hover:bg-opacity-30"
                    onClick={() =>
                      onPaySalary(sheet?.Employee?.id, sheet?.generate_date)
                    }
                  >
                    Pay
                  </button>
                )}

                <button
                  className="flex items-center gap-1 rounded bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-400 dark:hover:bg-opacity-30"
                  onClick={() =>
                    onEditCommission(
                      sheet?.Employee?.employeeId,
                      sheet?.Employee?.id,
                      sheet?.generate_date,
                      sheet?.basic_salary,
                    )
                  }
                >
                  <Edit className="h-3.5 w-3.5" />
                  Commission
                </button>

                <button
                  className="flex items-center gap-1 rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400 dark:hover:bg-opacity-30"
                  onClick={() =>
                    onDeleteSalarySheet(
                      sheet?.Employee?.id,
                      sheet?.generate_date,
                    )
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryTable;
