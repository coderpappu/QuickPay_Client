import {
  DollarSign,
  Download,
  FileText,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  useBulkDeleteSalarySheetMutation,
  useBulkEmployeePaymentMutation,
  useDeleteSalarySheetMutation,
  useGeneratedEmployeeSalaryBulkMutation,
  useGetEmployeesQuery,
  useGetGeneratedSalarySheetQuery,
  useUpdateSalarySheetMutation,
} from "../../../features/api";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import CommissionModal from "./CommissionModal";
import MonthYearSelector from "./MonthYearSelector";
import PayslipModal from "./PayslipModal";
import SalaryTable from "./SalaryTable";

const PaySlipCard = () => {
  const [updateSalarySheet] = useUpdateSalarySheetMutation();
  const [deleteSalarySheet] = useDeleteSalarySheetMutation();
  const [bulkEmployeePayment] = useBulkEmployeePaymentMutation();
  const [generateBulkSalary] = useGeneratedEmployeeSalaryBulkMutation();
  const [bulkDeleteSalary] = useBulkDeleteSalarySheetMutation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBulkPaying, setIsBulkPaying] = useState(false);

  const [slipPreview, setSlipPreview] = useState(null);
  const [editSheet, setEditSheet] = useState(null);
  const [isPayslipModalOpen, setIsPayslipModalOpen] = useState(false);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);

  const companyId = useSelector((state) => state.company.companyId);

  // Initialize with current month and year
  useEffect(() => {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    const currentYear = String(new Date().getFullYear());
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  // Get employee list
  const {
    data: employeeList,
    isLoading: isEmployeeLoading,
    error: employeeError,
  } = useGetEmployeesQuery(companyId);

  // Get salary sheet data
  const {
    data: employeeSalarySheet,
    isLoading: isSheetLoading,
    isError: isSheetError,
    error: sheetError,
    refetch: refetchSalarySheet,
  } = useGetGeneratedSalarySheetQuery({
    companyId,
    month,
    year,
  });

  // Handle delete salary sheet
  const handleDeleteSalarySheet = async (employeeId, generate_date) => {
    try {
      await deleteSalarySheet({ employeeId, generate_date }).unwrap();
      toast.success("Salary sheet deleted successfully");
      refetchSalarySheet();
    } catch (error) {
      toast.error("Failed to delete salary sheet");
    }
  };

  const handleBulkDeleteSalarysheet = async () => {
    try {
      await bulkDeleteSalary({ month, year, companyId });
      toast.success("Salary sheets deleted successfully");
      refetchSalarySheet();
    } catch (error) {
      toast.error("Failed to delete salary sheets");
    }
  };

  // Handle bulk payment
  const handleBulkPayment = async () => {
    const generate_date = `${String(month).padStart(2, "0")}-${year}`;
    setIsBulkPaying(true);

    try {
      await bulkEmployeePayment({ generate_date, status: "Paid" }).unwrap();
      toast.success("Bulk payment processed successfully");
      refetchSalarySheet();
    } catch (error) {
      toast.error("Error processing bulk payment");
    } finally {
      setIsBulkPaying(false);
    }
  };

  // Handle individual payment
  const handleUpdateSalarySheet = async (employeeId, generate_date) => {
    try {
      await updateSalarySheet({
        employeeId,
        generate_date,
        status: "Paid",
      }).unwrap();
      toast.success("Payment successful");
      refetchSalarySheet();
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  // Handle generate salary
  const handleGenerateSalary = async () => {
    if (!month || !year) {
      toast.error("Please select both month and year");
      return;
    }

    if (!employeeList?.data?.length) {
      toast.error("No employees found");
      return;
    }

    setIsGenerating(true);

    const employeeIds = employeeList.data.map((employee) => ({
      employeeId: employee.id,
      deviceId: employee.deviceUserId,
    }));

    try {
      await generateBulkSalary({
        employeeIds,
        month,
        year,
        companyId,
      }).unwrap();
      toast.success("Payslips generated successfully");
      refetchSalarySheet();
    } catch (error) {
      toast.error("Error generating payslips");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle export to Excel
  const handleExportToExcel = () => {
    if (!employeeSalarySheet?.data?.length) {
      toast.error("No data to export");
      return;
    }

    setIsExporting(true);

    try {
      const excelData = employeeSalarySheet.data.map((sheet) => ({
        "Employee ID": sheet?.Employee?.employeeId,
        Name: sheet?.Employee?.name,
        "Bank Name": sheet?.Employee?.EmployeeBankAcc[0]?.bank_name || "",
        "Bank Branch": sheet?.Employee?.EmployeeBankAcc[0]?.branch_name || "",
        "Account No": sheet?.Employee?.EmployeeBankAcc[0]?.bank_acc_no || "",
        "Routing No": sheet?.Employee?.EmployeeBankAcc[0]?.routing_no || "",
        "Basic Salary": sheet?.basic_salary || 0,
        Overtime:
          Math.round(sheet?.overtime_salary_sheet?.[0]?.overtime_salary) || 0,
        Allowance: Array.isArray(sheet?.allowance_salary_sheet)
          ? sheet.allowance_salary_sheet.reduce(
              (sum, a) => sum + (a.amount || 0),
              0,
            )
          : 0,
        Deduction:
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
            : 0),
        "Net Salary": sheet?.netSalary || 0,
        Status: sheet?.status,
      }));

      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Salary Sheet");

      const fileName = `salary_sheet_${month}_${year}.xlsx`;
      XLSX.writeFile(wb, fileName);
      toast.success("Excel file exported successfully");
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  // Determine what content to display
  let content;

  if (isEmployeeLoading || isSheetLoading) {
    content = <ListSkeleton />;
  } else if (isSheetError) {
    content = (
      <ErrorMessage
        message={sheetError?.data?.message || "Error loading salary data"}
      />
    );
  } else if (!employeeSalarySheet?.data?.length) {
    content = (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
        <div className="mb-4 text-6xl opacity-20">
          <FileText size={64} />
        </div>
        <h3 className="mb-2 text-xl font-medium">No salary sheets found</h3>
        <p className="mb-6 text-sm">
          Generate payslips for the selected month and year.
        </p>
        <button
          onClick={handleGenerateSalary}
          disabled={isGenerating}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Generate Payslips
            </>
          )}
        </button>
      </div>
    );
  } else {
    content = (
      <SalaryTable
        data={employeeSalarySheet.data}
        onViewPayslip={(employeeId, deviceId) => {
          setSlipPreview({ employeeId, deviceId, companyId, month, year });
          setIsPayslipModalOpen(true);
        }}
        onPaySalary={handleUpdateSalarySheet}
        onEditCommission={(employeeId, id, gen_date, basic_salary) => {
          setEditSheet({ employeeId, id, gen_date, basic_salary });
          setIsCommissionModalOpen(true);
        }}
        onDeleteSalarySheet={handleDeleteSalarySheet}
        month={month}
        year={year}
        companyId={companyId}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Generate Payslips Card */}
      <div className="rounded-lg bg-white p-6 shadow-sm transition-all dark:bg-dark-card">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Generate Payslips
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create salary sheets for all employees for a specific month and year
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <MonthYearSelector
            month={month}
            year={year}
            onMonthChange={setMonth}
            onYearChange={setYear}
            className="flex-1"
          />

          <button
            onClick={handleGenerateSalary}
            disabled={isGenerating}
            className="flex min-w-[180px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generate Payslips
              </>
            )}
          </button>
        </div>
      </div>

      {/* Salary Sheets Card */}
      <div className="rounded-lg bg-white shadow-sm transition-all dark:bg-dark-card">
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 p-6 dark:border-dark-border-color dark:border-opacity-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Employee Payslips
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {month && year
                ? `Showing salary data for ${new Date(year, parseInt(month) - 1).toLocaleString("default", { month: "long" })} ${year}`
                : "Select month and year to view salary data"}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0">
            <MonthYearSelector
              month={month}
              year={year}
              onMonthChange={setMonth}
              onYearChange={setYear}
              compact={true}
            />
            <button
              onClick={handleBulkDeleteSalarysheet}
              disabled={isExporting || !employeeSalarySheet?.data?.length}
              className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:bg-red-400 disabled:opacity-60 dark:bg-opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Bulk Delete
            </button>

            <button
              onClick={handleExportToExcel}
              disabled={isExporting || !employeeSalarySheet?.data?.length}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-all hover:bg-green-700 disabled:bg-green-400 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export
                </>
              )}
            </button>

            <button
              onClick={handleBulkPayment}
              disabled={isBulkPaying || !employeeSalarySheet?.data?.length}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 disabled:bg-blue-400 disabled:opacity-60"
            >
              {isBulkPaying ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  Bulk Payment
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">{content}</div>
      </div>

      {/* Modals */}
      {isPayslipModalOpen && (
        <PayslipModal
          slipPreview={slipPreview}
          onClose={() => setIsPayslipModalOpen(false)}
        />
      )}

      {isCommissionModalOpen && (
        <CommissionModal
          editSheet={editSheet}
          onClose={() => {
            setIsCommissionModalOpen(false);
            refetchSalarySheet();
          }}
        />
      )}
    </div>
  );
};

export default PaySlipCard;
