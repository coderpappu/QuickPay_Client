import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useGeneratedEmployeeSalaryBulkMutation,
  useGetCompanyIdQuery,
  useGetEmployeesQuery,
  useGetGeneratedSalarySheetQuery,
} from "../../../features/api";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import PreviewPayslipCard from "./PreviewPayslipCard";

const PaySlipCard = () => {
  const labels = {
    companyName: "R.S.B Industrial Ltd.",
    cardNo: "Card No:",
    name: "Name:",
    department: "Department:",
    section: "Section:",
    otHours: "O.T. Hours:",
    salaryBand: "Salary Band:",
    slNo: "SL. No:",
    month: "Month:",
    payMode: "Pay Mode:",
    bankAccount: "Bank AC:",
    earnings: "Earnings",
    deductions: "Deductions",
    amount: "Amount",
    totalSalaryEarned: "Total Salary Earned",
    totalDeduction: "Total Deduction",
    netAmount: "NET Amount",
  };

  // Employee data
  const employeeData = {
    cardNo: "M10059 (Prev.: M0315)",
    name: "AVIRUP CHOWDHURY",
    department: "PPIC",
    section: "PPIC",
    otHours: 0,
    salaryBand: "N/A",
    slNo: 1,
    month: "September-2024",
    payMode: "BANK-EBL",
    bankAccount: "0141260036544",
  };

  // Earnings and deductions
  const earningsData = {
    "Gross Salary": 20000,
    "Basic Salary": 15000,
    "H. Rent": 3000,
    "Medical Allowance": 2000,
    "Attendance Bonus": 500,
    "O.T. Amount": 0,
    Allowance: 0,
    "Transport Allowance": 0,
    "Prod. Incentive": 0,
    "Shift Allowance": 0,
    "Other's": 0,
  };

  const deductionsData = {
    "Absent Amount": 0,
    Stamp: 0,
    "Advance/Loan": 0,
    "E.P.F": 0,
    "Other's": 130,
  };

  // Calculate net amount
  const netAmount =
    Object.values(earningsData).reduce((sum, value) => sum + value, 0) -
    Object.values(deductionsData).reduce((sum, value) => sum + value, 0);

  const { data: companyId } = useGetCompanyIdQuery();
  const { data: employeeList, isLoading } = useGetEmployeesQuery(companyId);
  const [generateBulkSalary] = useGeneratedEmployeeSalaryBulkMutation();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [slipPreview, setSlipPreview] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (slipData = null) => {
    setIsPopupOpen(true);
    setSlipPreview(slipData);
  };

  const {
    data: employeeSalarySheet,
    isLoading: isSheetLoding,
    isError: isSheetError,
  } = useGetGeneratedSalarySheetQuery({
    companyId,
    month,
    year,
  });

  // Handle month change
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Handle year change
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Handle generate salary button click
  const handleGenerateSalary = async () => {
    if (!month || !year) {
      alert("Please select both month and year.");
      return;
    }

    const employeeIds = employeeList.data.map((employee) => employee.id);

    try {
      // Call the mutation to generate bulk salary
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

  if (isLoading) return <div>Loading...</div>;
  if (!employeeList || !employeeList.data || employeeList.data.length === 0)
    return <div>No employees found.</div>;

  if (isSheetLoding && !isSheetError) return "Loading...";
  if (isSheetError) return "Error fetching salary sheet.";

  let content;

  content = employeeSalarySheet?.data?.map((sheet) => (
    <>
      {" "}
      <div className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10">
        <div className="dark:text-white w-[10%]">
          <h3>{sheet?.Employee?.employeeId}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{sheet?.Employee?.name}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{sheet?.overtime_salary_sheet?.[0].overtime_salary}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{sheet?.allowance_salary_sheet?.[0].amount}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{sheet?.deduction_salary_sheet?.[0].amount}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>Success </h3>
        </div>
        <div className="dark:text-white w-[30%]">
          <button
            className="px-4 py-2 bg-yellow-500 mx-2 rounded-md"
            onClick={() => handleOpen(sheet)}
          >
            Payslip
          </button>
          <button className="px-4 py-2 bg-purple-700 mx-2 rounded-md">
            Click To Paid
          </button>
          <button className="px-4 py-2 bg-blue-500 mx-2 rounded-md">
            Edit
          </button>
          <button className="px-4 py-2 bg-green-500 mx-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </>
  ));

  return (
    <div>
      <div className="w-full p-5 flex justify-end py-8 bg-dark-card rounded-md px-6">
        <div className="flex gap-2 flex-wrap items-center w-[50%] justify-end">
          <select
            className="w-64 px-2 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
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
            className="w-64 px-3 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
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
            className="px-3 py-3 rounded-md bg-green-600 text-white"
          >
            Generate Payslip
          </button>
        </div>
      </div>

      <div className="my-3">
        <BrandCardWrapper>
          <div className="flex justify-between items-center border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
            <div>
              <h3 className="text-base leading-6 dark:text-dark-heading-color">
                Employee Payslip
              </h3>
            </div>
            <div className="flex gap-2 flex-wrap items-center w-[51%] justify-end ">
              <select
                className="w-64 px-2 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
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
                className="w-64 px-3 py-3 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-13 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
                value={year}
                onChange={handleYearChange}
              >
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>

              <button className="px-3 py-3 rounded-md bg-blue-500 text-white">
                Export
              </button>

              <button className="px-3 py-3 rounded-md bg-blue-500 text-white">
                Bulk Payment
              </button>
            </div>
          </div>
          <div className="px-6 py-3">
            {/* header  */}
            <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
              <div className="dark:text-white w-[10%]">
                <h3>Employee Id</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>Name</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>OverTime</h3>
              </div>

              <div className="dark:text-white w-[10%]">
                <h3>Allowance</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Deduction</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <h3>Status </h3>
              </div>
              <div className="dark:text-white w-[30%]">
                <h3>Action </h3>
              </div>
            </div>

            {/* body  */}
            {content}
          </div>
        </BrandCardWrapper>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-dark-card  rounded-lg p-6 w-full max-w-5xl">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Payslip
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PreviewPayslipCard
                employee={employeeData}
                earnings={earningsData}
                deductions={deductionsData}
                netAmount={netAmount}
                labels={labels}
                slipPreview={slipPreview}
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaySlipCard;
