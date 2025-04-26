import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  useBulkEmployeePaymentMutation,
  useDeleteSalarySheetMutation,
  useGeneratedEmployeeSalaryBulkMutation,
  useGetEmployeesQuery,
  useGetGeneratedSalarySheetQuery,
  useUpdateSalarySheetMutation,
} from "../../../features/api";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import EditPanel from "../EditPanel";
import PreviewPayslipCard from "./PreviewPayslipCard";

const PaySlipCard = () => {
  const [updateSalarySheet] = useUpdateSalarySheetMutation();
  const [deleteSalarySheet] = useDeleteSalarySheetMutation();
  const [bulkEmployeePayment] = useBulkEmployeePaymentMutation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [slipPreview, setSlipPreview] = useState("");
  const [editSheet, setEditSheet] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);

  const handleDeleteSalarySheet = async (employeeId, generate_date) => {
    try {
      await deleteSalarySheet({ employeeId, generate_date });
      toast.success("Salary Sheet deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBulkPayment = async () => {
    const generate_date = `${String(month).padStart(2, "0")}-${year}`;
    try {
      await bulkEmployeePayment({ generate_date, status: "Paid" }).unwrap();
      toast.success("Bulk payment processed successfully.");
    } catch (error) {
      toast.error("There was an error processing");
    }
  };

  const handleUpdateSalarySheet = async (employeeId, generate_date) => {
    await updateSalarySheet({ employeeId, generate_date, status: "Paid" });
  };

  const companyId = useSelector((state) => state.company.companyId);

  const {
    data: employeeList,
    isLoading,
    error,
  } = useGetEmployeesQuery(companyId);

  const [generateBulkSalary, { data }] =
    useGeneratedEmployeeSalaryBulkMutation();

  useEffect(() => {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    const currentYear = String(new Date().getFullYear());
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const onEditClose = () => {
    setIsEditPopup(false);
  };

  const handleOpen = (employeeId, deviceId, companyId, month, year) => {
    setIsPopupOpen(true);
    setSlipPreview({ employeeId, deviceId, companyId, month, year });
  };

  const handleEditOpen = (employeeId, id, gen_date, basic_salary) => {
    setIsEditPopup(true);
    setEditSheet({ employeeId, id, gen_date, basic_salary });
  };

  const {
    data: employeeSalarySheet,
    isLoading: isSheetLoding,
    isError: isSheetError,
    error: sheetError,
  } = useGetGeneratedSalarySheetQuery({
    companyId,
    month,
    year,
  });

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleGenerateSalary = async () => {
    if (!month || !year) {
      alert("Please select both month and year.");
      return;
    }

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
      toast.success("Employees salary generated successfully");
    } catch (error) {
      toast.error("Error generating employees salary");
    }
  };

  const handleExportToExcel = () => {
    if (!employeeSalarySheet?.data?.length) {
      toast.error("No data to export");
      return;
    }

    const excelData = employeeSalarySheet.data.map((sheet) => ({
      "Employee ID": sheet?.Employee?.employeeId,
      Name: sheet?.Employee?.name,
      "Bank Name": sheet?.Employee?.EmployeeBankAcc[0]?.bank_name || "",
      "Bank Branch": sheet?.Employee?.EmployeeBankAcc[0]?.branch_name || "",
      "Account No": sheet?.Employee?.EmployeeBankAcc[0]?.bank_acc_no || "",
      "Routing No": sheet?.Employee?.EmployeeBankAcc[0]?.routing_no || "",
      // "Basic Salary": sheet?.basic_salary || 0,
      // Overtime:
      //   Math.round(sheet?.overtime_salary_sheet?.[0]?.overtime_salary) || 0,
      // Allowance: sheet?.allowance_salary_sheet?.[0]?.amount || 0,
      // Deduction: sheet?.deduction_salary_sheet?.[0]?.amount || 0,
      "Net Salary": sheet?.netSalary || 0,
      Status: sheet?.status,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Sheet");

    // Generate file name with month and year
    const fileName = `salary_sheet_${month}_${year}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, fileName);
  };

  let content;

  if (isLoading) return <ListSkeleton />;

  if (!employeeSalarySheet?.data?.length) {
    content = <ErrorMessage message="No salary sheet found!" />;
  }

  if (isSheetLoding && !isSheetError) return <ListSkeleton />;

  if (isSheetError) return <ErrorMessage message={sheetError?.data?.message} />;

  if (employeeSalarySheet?.data?.length) {
    content = employeeSalarySheet.data.map((sheet) => (
      <div
        key={sheet.Employee.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[10%] dark:text-white">
          <h3>{sheet?.Employee?.employeeId}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{sheet?.Employee?.name}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>
            {Math.round(sheet?.overtime_salary_sheet?.[0]?.overtime_salary) ||
              "00"}
          </h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{sheet?.allowance_salary_sheet?.[0]?.amount || "00"}</h3>
        </div>
        <div className="w-[10%] dark:text-white">
          <h3>{sheet?.deduction_salary_sheet?.[0]?.amount || "00"}</h3>
        </div>
        <div className="w-[7%] text-center dark:text-white">
          <button
            className={`w-24 border px-4 py-2 ${sheet?.status !== "Unpaid" ? "border-green-400 text-green-400" : "border-yellow-400 text-yellow-400"} mx-2 rounded-md`}
          >
            {sheet?.status}
          </button>
        </div>
        <div className="w-[35%] dark:text-white">
          <button
            className="mx-2 rounded-md bg-yellow-500 px-4 py-2"
            onClick={() =>
              handleOpen(
                sheet?.Employee?.id,
                sheet?.Employee?.deviceUserId,
                companyId,
                month,
                year,
              )
            }
          >
            Payslip
          </button>
          <button
            className="mx-2 rounded-md bg-purple-700 px-4 py-2"
            onClick={() =>
              handleUpdateSalarySheet(sheet?.Employee?.id, sheet?.generate_date)
            }
          >
            Pay
          </button>
          <button
            className="mx-2 rounded-md bg-blue-500 px-4 py-2"
            onClick={() =>
              handleEditOpen(
                sheet?.Employee?.employeeId,
                sheet?.Employee?.id,
                sheet?.generate_date,
                sheet?.basic_salary,
              )
            }
          >
            Commission
          </button>
          <button
            className="mx-2 rounded-md bg-green-500 px-4 py-2"
            onClick={() =>
              handleDeleteSalarySheet(sheet?.Employee?.id, sheet?.generate_date)
            }
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <div className="flex w-full justify-end rounded-md bg-dark-card p-5 px-6 py-8">
        <div className="flex w-[50%] flex-wrap items-center justify-end gap-2">
          <select
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 px-2 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            value={month}
            onChange={handleMonthChange}
          >
            <option value="">Select Month</option>
            <option value="01">JAN</option>
            <option value="02">FEB</option>
            <option value="03">MAR</option>
            <option value="04">APR</option>
            <option value="05">MAY</option>
            <option value="06">JUN</option>
            <option value="07">JUL</option>
            <option value="08">AUG</option>
            <option value="09">SEP</option>
            <option value="10">OCT</option>
            <option value="11">NOV</option>
            <option value="12">DEC</option>
          </select>

          <select
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 px-3 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            value={year}
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <button
            onClick={handleGenerateSalary}
            className="rounded-md bg-green-600 px-3 py-3 text-white"
          >
            Generate Payslip
          </button>
        </div>
      </div>

      <div className="my-3">
        <BrandCardWrapper>
          <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
            <div>
              <h3 className="text-base leading-6 dark:text-dark-heading-color">
                Employee Payslip
              </h3>
            </div>
            <div className="flex w-[51%] flex-wrap items-center justify-end gap-2">
              <select
                className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 px-2 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                value={month}
                onChange={handleMonthChange}
              >
                <option value="">Select Month</option>
                <option value="01">JAN</option>
                <option value="02">FEB</option>
                <option value="03">MAR</option>
                <option value="04">APR</option>
                <option value="05">MAY</option>
                <option value="06">JUN</option>
                <option value="07">JUL</option>
                <option value="08">AUG</option>
                <option value="09">SEP</option>
                <option value="10">OCT</option>
                <option value="11">NOV</option>
                <option value="12">DEC</option>
              </select>

              <select
                className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 px-3 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
                value={year}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>

              <button
                onClick={handleExportToExcel}
                className="rounded-md bg-blue-500 px-3 py-3 text-white"
              >
                Export
              </button>

              <button
                className="rounded-md bg-blue-500 px-3 py-3 text-white"
                onClick={handleBulkPayment}
              >
                Bulk Payment
              </button>
            </div>
          </div>
          <div className="px-6 py-3">
            <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
              <div className="w-[10%] dark:text-white">
                <h3>Employee Id</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>Name</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>OverTime</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>Allowance</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>Deduction</h3>
              </div>
              <div className="w-[7%] text-center dark:text-white">
                <h3>Status</h3>
              </div>
              <div className="w-[35%] dark:text-white">
                <h3>Action</h3>
              </div>
            </div>

            {content}
          </div>
        </BrandCardWrapper>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-5xl rounded-lg bg-white p-6 dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Payslip
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PreviewPayslipCard slipPreview={slipPreview} onClose={onClose} />
            </div>
          </div>
        </div>
      )}

      {isEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Add Commission
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsEditPopup(false)}
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <EditPanel editSheet={editSheet} onEditClose={onEditClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaySlipCard;
