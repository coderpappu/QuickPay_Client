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
      await refetchSalarySheet();
      setTimeout(() => {
        refetchSalarySheet();
      }, 200);
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

  // Handle individual pay/unpay toggle
  const handleUpdateSalarySheet = async (employeeId, generate_date, status) => {
    try {
      await updateSalarySheet({
        employeeId,
        generate_date,
        status,
      }).unwrap();
      toast.success(`Status updated to ${status}`);
      refetchSalarySheet();
    } catch (error) {
      toast.error("Failed to update status");
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

  // Handle export to Excel (Bank Sheet)
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

      // Auto-size columns
      const bankHeaders = [
        "Employee ID",
        "Name",
        "Bank Name",
        "Bank Branch",
        "Account No",
        "Routing No",
        "Basic Salary",
        "Overtime",
        "Allowance",
        "Deduction",
        "Net Salary",
        "Status",
      ];

      ws["!cols"] = bankHeaders.map((header) => ({
        wch:
          Math.max(
            header.length,
            ...excelData.map((row) =>
              row[header] !== undefined && row[header] !== null
                ? String(row[header]).length
                : 0,
            ),
          ) + 2,
      }));

      // (Optional) Right-align money columns (requires sheetjs-style)
      const moneyHeaders = [
        "Basic Salary",
        "Overtime",
        "Allowance",
        "Deduction",
        "Net Salary",
      ];
      moneyHeaders.forEach((header) => {
        const colIdx = bankHeaders.indexOf(header);
        if (colIdx === -1) return;
        for (let rowIdx = 1; rowIdx < excelData.length + 1; rowIdx++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIdx, c: colIdx });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = ws[cellAddress].s || {};
          ws[cellAddress].s.alignment = { horizontal: "right" };
          ws[cellAddress].z = "#,##0.00";
        }
        // Header row (row 0)
        const headerCell = XLSX.utils.encode_cell({ r: 0, c: colIdx });
        if (ws[headerCell]) {
          ws[headerCell].s = ws[headerCell].s || {};
          ws[headerCell].s.alignment = {
            horizontal: "right",
            vertical: "center",
          };
        }
      });

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

  // Export salary details (all info, dynamic columns)
  const handleExportSalaryDetails = () => {
    if (!employeeSalarySheet?.data?.length) {
      toast.error("No data to export");
      return;
    }

    setIsExporting(true);

    try {
      // 1. Collect all unique allowance and deduction types (including late/early/unpaid leave)
      const allowanceTypeSet = new Set();
      const deductionTypeSet = new Set();
      const lateTypes = [
        { key: "late_day_salary", label: "Late Time Salary" },
        { key: "unpaid_leave_salary", label: "Unpaid Leave" },
        { key: "early_out_salary", label: "Early Out Salary" },
      ];

      employeeSalarySheet.data.forEach((sheet) => {
        if (Array.isArray(sheet?.allowance_salary_sheet)) {
          sheet.allowance_salary_sheet.forEach((a) => {
            const name = a.EmployeeAllowance?.AllowanceType?.name || a.name;
            if (name) allowanceTypeSet.add(name);
          });
        }
        if (Array.isArray(sheet?.deduction_salary_sheet)) {
          sheet.deduction_salary_sheet.forEach((d) => {
            const name = d.EmployeeDeduction?.DeductionType?.name || d.name;
            if (name) deductionTypeSet.add(name);
          });
        }
        if (Array.isArray(sheet.LateEarlyOutLeaveSalaryDeduction)) {
          lateTypes.forEach(({ key, label }) => {
            const total = sheet.LateEarlyOutLeaveSalaryDeduction.filter(
              (item) => item.title === key && item.amount && item.amount !== 0,
            ).reduce((sum, item) => sum + item.amount, 0);
            if (total > 0) deductionTypeSet.add(label);
          });
        }
      });

      const allowanceTypes = Array.from(allowanceTypeSet);
      const deductionTypes = Array.from(deductionTypeSet);

      // 2. Build header rows (with merged headers for Excel)
      // Group header row: separate Basic Salary, and group all Allowances (including Total Allowance) under Allowances
      const groupHeaderRow = [
        "Employee Info", // Employee ID
        "Employee Info", // Employee Name
        "Employee Info", // Designation
        "Employee Info", // Department
        "Employee Info", // Section
        "Basic Salary", // Basic Salary (separate)
        ...Array(allowanceTypes.length).fill("Allowances"), // Each allowance type
        "Total Allowance", // Total Allowance
        ...Array(deductionTypes.length).fill("Deductions"), // Each deduction type
        "Total Deduction", // Total Deduction
        ...Array(3).fill("Summary"),
      ];
      const mainHeaders = [
        "Employee ID",
        "Employee Name",
        "Designation",
        "Department",
        "Section",
        "Basic Salary",
        ...allowanceTypes,
        "Total Allowance",
        ...deductionTypes,
        "Total Deduction",
        "Gross Salary",
        "Net Salary",
        "Payment Status",
      ];

      // 3. Build data rows
      const detailsData = employeeSalarySheet.data.map((sheet) => {
        const allowanceMap = {};
        if (Array.isArray(sheet?.allowance_salary_sheet)) {
          sheet.allowance_salary_sheet.forEach((a) => {
            const name = a.EmployeeAllowance?.AllowanceType?.name || a.name;
            allowanceMap[name] = (allowanceMap[name] || 0) + (a.amount || 0);
          });
        }
        const deductionMap = {};
        if (Array.isArray(sheet?.deduction_salary_sheet)) {
          sheet.deduction_salary_sheet.forEach((d) => {
            const name = d.EmployeeDeduction?.DeductionType?.name || d.name;
            deductionMap[name] = (deductionMap[name] || 0) + (d.amount || 0);
          });
        }
        if (Array.isArray(sheet.LateEarlyOutLeaveSalaryDeduction)) {
          lateTypes.forEach(({ key, label }) => {
            const total = sheet.LateEarlyOutLeaveSalaryDeduction.filter(
              (item) => item.title === key && item.amount && item.amount !== 0,
            ).reduce((sum, item) => sum + item.amount, 0);
            if (total > 0) deductionMap[label] = total;
          });
        }
        const totalAllowance = allowanceTypes.reduce(
          (sum, type) => sum + (allowanceMap[type] || 0),
          0,
        );
        const totalDeduction = deductionTypes.reduce(
          (sum, type) => sum + (deductionMap[type] || 0),
          0,
        );
        const row = {
          "Employee ID": sheet?.Employee?.employeeId,
          "Employee Name": sheet?.Employee?.name,
          Designation:
            sheet?.Employee?.EmployeeDesignation?.[0]?.designation?.name || "",
          Department:
            sheet?.Employee?.EmployeeDepartment?.[0]?.department?.name || "",
          Section: sheet?.Employee?.EmployeeSection?.[0]?.section?.name || "",
          "Basic Salary": sheet?.basic_salary || 0,
        };
        allowanceTypes.forEach((type) => {
          row[type] = allowanceMap[type] || 0;
        });
        row["Total Allowance"] = totalAllowance;
        deductionTypes.forEach((type) => {
          row[type] = deductionMap[type] || 0;
        });
        row["Total Deduction"] = totalDeduction;
        row["Gross Salary"] = (sheet?.basic_salary || 0) + totalAllowance;
        row["Net Salary"] = sheet?.netSalary || 0;
        row["Payment Status"] = sheet?.status;
        return row;
      });

      // 4. Write to Excel with merged headers for Allowances/Deductions
      const ws = XLSX.utils.json_to_sheet([], { header: [] });
      XLSX.utils.sheet_add_aoa(ws, [groupHeaderRow, mainHeaders], {
        origin: "A1",
      });
      XLSX.utils.sheet_add_json(ws, detailsData, {
        origin: "A3",
        header: mainHeaders,
        skipHeader: true,
      });

      // Set merges for Allowances and Deductions
      const merges = [];
      // Employee Info (first 5 columns: 0-4)
      merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } });
      // Basic Salary (col 5)
      merges.push({ s: { r: 0, c: 5 }, e: { r: 1, c: 5 } });
      // Allowances (all allowance columns + total)
      if (allowanceTypes.length > 0) {
        const start = 6;
        const end = start + allowanceTypes.length - 1;
        // Merge "Allowances" over all allowance type columns
        if (allowanceTypes.length > 0) {
          merges.push({ s: { r: 0, c: start }, e: { r: 0, c: end } });
        }
        // Merge "Allowances" for Total Allowance column
        merges.push({ s: { r: 0, c: end + 1 }, e: { r: 1, c: end + 1 } });
      }
      // Deductions (all deduction columns + total)
      if (deductionTypes.length > 0) {
        const start = 7 + allowanceTypes.length;
        const end = start + deductionTypes.length - 1;
        // Merge "Deductions" over all deduction type columns
        if (deductionTypes.length > 0) {
          merges.push({ s: { r: 0, c: start }, e: { r: 0, c: end } });
        }
        // Merge "Deductions" for Total Deduction column
        merges.push({ s: { r: 0, c: end + 1 }, e: { r: 1, c: end + 1 } });
      }
      // Summary (last 3 columns)
      const summaryStart = mainHeaders.length - 3;
      merges.push({
        s: { r: 0, c: summaryStart },
        e: { r: 0, c: mainHeaders.length - 1 },
      });

      ws["!merges"] = merges;

      // Auto-size columns based on content (auto width, no fixed size)
      ws["!cols"] = mainHeaders.map((header, colIdx) => {
        // Find the max length in the column (header, data, and group header)
        const groupHeader = groupHeaderRow[colIdx] || "";
        const maxLen = Math.max(
          header.length,
          groupHeader.length,
          ...detailsData.map((row) =>
            row[header] !== undefined && row[header] !== null
              ? String(row[header]).length
              : 0,
          ),
        );
        return { wch: maxLen + 2 };
      });

      // --- Add summary row after employee list ---
      // Calculate summary row
      const summaryRow = {};
      mainHeaders.forEach((header, idx) => {
        if (typeof detailsData[0]?.[header] === "number") {
          summaryRow[header] = detailsData.reduce(
            (sum, row) => sum + (Number(row[header]) || 0),
            0,
          );
        } else {
          summaryRow[header] = "";
        }
      });
      summaryRow[mainHeaders[0]] = "Total";

      // Add summary row after employee data

      // Place summary row after the 2nd employee row (i.e., after row index 4: 2 header rows + 2 data rows)
      // Add 2 blank rows after employee data, then summary row
      const summaryInsertIdx = detailsData.length + 5; // 2 header rows + data + 2 blank rows (1-based)
      // Add 2 blank rows
      XLSX.utils.sheet_add_aoa(ws, [[...Array(mainHeaders.length)]], {
        origin: `A${detailsData.length + 3}`,
      });
      XLSX.utils.sheet_add_aoa(ws, [[...Array(mainHeaders.length)]], {
        origin: `A${detailsData.length + 4}`,
      });
      // Add summary row
      XLSX.utils.sheet_add_json(ws, [summaryRow], {
        origin: `A${summaryInsertIdx}`,
        header: mainHeaders,
        skipHeader: true,
      });

      // Style the summary row (bold, right-aligned for numbers)
      const summaryRowIdx = summaryInsertIdx - 1; // 0-based index
      mainHeaders.forEach((header, colIdx) => {
        const cellAddress = XLSX.utils.encode_cell({
          r: summaryRowIdx,
          c: colIdx,
        });
        if (ws[cellAddress]) {
          ws[cellAddress].s = ws[cellAddress].s || {};
          ws[cellAddress].s.font = { bold: true };
          if (typeof summaryRow[header] === "number") {
            ws[cellAddress].s.alignment = { horizontal: "right" };
            ws[cellAddress].z = "#,##0.00";
          }
        }
      });

      // Right-align all money-related columns (headers, merged headers, and values)
      const moneyHeaders = [
        "Basic Salary",
        ...allowanceTypes,
        "Total Allowance",
        ...deductionTypes,
        "Total Deduction",
        "Gross Salary",
        "Net Salary",
      ];
      moneyHeaders.forEach((header) => {
        const colIdx = mainHeaders.indexOf(header);
        if (colIdx === -1) return;
        // Data cells (start at row 2)
        for (let rowIdx = 2; rowIdx < detailsData.length + 2; rowIdx++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIdx, c: colIdx });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = ws[cellAddress].s || {};
          ws[cellAddress].s.alignment = { horizontal: "right" };
          ws[cellAddress].z = "#,##0.00";
        }
        // Header cell (row 1)
        const headerCell = XLSX.utils.encode_cell({ r: 1, c: colIdx });
        // Ensure the header cell exists and is styled
        if (!ws[headerCell]) {
          ws[headerCell] = { t: "s", v: mainHeaders[colIdx], s: {} };
        }
        ws[headerCell].s = ws[headerCell].s || {};
        ws[headerCell].s.alignment = {
          horizontal: "right",
          vertical: "center",
        };
        // Group header cell (row 0)
        const groupHeaderCell = XLSX.utils.encode_cell({ r: 0, c: colIdx });
        if (ws[groupHeaderCell]) {
          ws[groupHeaderCell].s = ws[groupHeaderCell].s || {};
          ws[groupHeaderCell].s.alignment = {
            horizontal: "right",
            vertical: "center",
          };
        }
      });

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Salary Details");

      // Format file name as salary-details-sheet-may-2025.xlsx
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      const monthIdx = parseInt(month, 10) - 1;
      const monthName = monthNames[monthIdx] || month;
      const fileName = `salary-details-sheet-${monthName}-${year}.xlsx`;
      XLSX.writeFile(wb, fileName);
      toast.success("Salary details exported successfully");
    } catch (error) {
      toast.error("Failed to export salary details");
    } finally {
      setIsExporting(false);
    }
  };

  // Search state for employee name or ID
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered data by employee name or ID
  const filteredSalaryData =
    employeeSalarySheet?.data?.filter((sheet) => {
      if (!searchTerm) return true;
      const nameMatch = sheet?.Employee?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const idMatch = sheet?.Employee?.employeeId
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return nameMatch || idMatch;
    }) || [];

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
  } else if (!filteredSalaryData.length) {
    content = (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400">
        <div className="mb-4 text-6xl opacity-20">
          <FileText size={64} />
        </div>
        <h3 className="mb-2 text-xl font-medium">No salary sheets found</h3>
        <p className="mb-6 text-sm">
          Generate payslips for the selected month and year or adjust your
          search.
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
        data={filteredSalaryData}
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
            {/* Search by employee name or ID */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by employee name or ID..."
              className="rounded-md border border-gray-300 border-opacity-10 bg-light-input px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:bg-dark-box dark:text-white"
              style={{ minWidth: 200 }}
            />
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
              className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:bg-red-400 disabled:opacity-60 dark:bg-opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Bulk Delete
            </button>

            {/* Bank Sheet Export Button */}
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
                  Bank Sheet
                </>
              )}
            </button>

            {/* Salary Details Export Button */}
            <button
              onClick={handleExportSalaryDetails}
              disabled={isExporting || !employeeSalarySheet?.data?.length}
              className="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-all hover:bg-purple-700 disabled:bg-purple-400 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Salary Details
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
