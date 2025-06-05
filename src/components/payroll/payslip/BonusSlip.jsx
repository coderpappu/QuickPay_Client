import { AlertTriangle, DollarSign, FileText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useCreateBonusSlipMutation,
  useDeleteBonusSlipMutation,
  useGetBonusSlipQuery,
  useGetBonusTypeListQuery,
  useGetDepartmentsQuery,
  useGetEmployeesQuery,
  useUpdateBonusBulkMutation,
  useUpdateBonusSlipMutation,
} from "../../../features/api";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import MonthYearSelector from "./MonthYearSelector";
import PreviewBonusSlip from "./PreviewBonusSlip";

const BonusSlipCard = () => {
  const [month, setMonth] = useState("");
  const [bonusType, setBonusType] = useState("");
  const [dept, setDeptChange] = useState("All");
  const [year, setYear] = useState("");

  const [slipPreview, setSlipPreview] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [updateBonusSlip] = useUpdateBonusSlipMutation();

  const [deleteBonusSlip] = useDeleteBonusSlipMutation();
  const [bulkEmployeePayment] = useUpdateBonusBulkMutation();

  const companyId = useSelector((state) => state.company.companyId);

  const {
    data: employeeList,
    isLoading,
    error,
  } = useGetEmployeesQuery(companyId);

  const {
    data: bonusSlip,
    isLoading: isLoadingBonusSlip,
    isError: isErrorBonusSlip,
    error: slipError,
  } = useGetBonusSlipQuery({ companyId, month, year });

  const [generateBonusSlip, { data }] = useCreateBonusSlipMutation();
  const { data: bonusTypes } = useGetBonusTypeListQuery(companyId);
  const { data: deptList } = useGetDepartmentsQuery(companyId);

  const handleDeleteBonusSlip = async (slip_id) => {
    try {
      await deleteBonusSlip(slip_id);
      toast.success("Bonus slip deleted successfully.");
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

  const handleUpdateBonusSlip = async (employeeId, generate_date, status) => {
    await updateBonusSlip({ employeeId, generate_date, status });
  };

  useEffect(() => {
    // Get the current month and year
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    const currentYear = String(new Date().getFullYear());

    // Set them as default values
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (data) => {
    setIsPopupOpen(true);

    setSlipPreview(data);
  };

  // Handle month change
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleBonusTypeChange = (event) => {
    setBonusType(event.target.value);
  };

  const handleDeptChange = (event) => {
    setDeptChange(event.target.value);
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

    if (!dept) {
      alert("Please select a department.");
      return;
    }

    let filteredEmployees;

    if (dept == "All") {
      filteredEmployees = employeeList?.data;
    } else {
      // Filter employees based on selected department
      filteredEmployees = employeeList.data.filter(
        (employee) =>
          employee?.EmployeeDepartment?.[0]?.department?.id === dept,
      );
    }

    const employeeIds = filteredEmployees.map((employee) => ({
      employeeId: employee.id,
      deviceId: employee.deviceUserId,
    }));

    try {
      const generatedSlip = await generateBonusSlip({
        employeeIds,
        month,
        year,
        companyId,
        bonusType,
      }).unwrap();

      toast.success("Employees bonus generated successfully");
    } catch (error) {
      toast.error("Error generating employees bonus");
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    const csvData = bonusSlip?.data?.map((slip) => ({
      Name: slip?.Employee?.name,
      EmployeeID: slip?.Employee?.employeeId,
      BonusType: slip?.BonusType?.title,
      Amount: slip?.amount,
      Status: slip?.status,
      Payment_Date: slip?.payment_date,
    }));
    setCsvData(csvData);
  };

  // Single filter input for both name and ID
  const [filterText, setFilterText] = useState("");
  let filteredBonusData = bonusSlip?.data || [];
  if (filterText.trim()) {
    const search = filterText.trim().toLowerCase();
    filteredBonusData = filteredBonusData.filter(
      (sheet) =>
        sheet?.Employee?.name?.toLowerCase().includes(search) ||
        String(sheet?.Employee?.employeeId).toLowerCase().includes(search),
    );
  }

  let content;

  if (isLoading) return <ListSkeleton />;

  if (!bonusSlip || !bonusSlip.data || bonusSlip.data.length === 0)
    content = <ErrorMessage message="No bound slip found!" />;

  if (isLoadingBonusSlip && !isErrorBonusSlip) return <ListSkeleton />;

  if (isErrorBonusSlip)
    content = <ErrorMessage message={slipError?.data?.message} />;

  if (filteredBonusData.length !== 0)
    content = filteredBonusData.map((sheet) => (
      <>
        {" "}
        <div className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10">
          <div className="w-[10%] dark:text-white">
            <h3>{sheet?.Employee?.employeeId}</h3>
          </div>
          <div className="w-[10%] dark:text-white">
            <h3>{sheet?.Employee?.name}</h3>
          </div>
          <div className="w-[10%] dark:text-white">
            <h3>{sheet?.BonusType?.title}</h3>
          </div>
          <div className="w-[10%] dark:text-white">
            <h3>{sheet?.amount || "00"}</h3>
          </div>

          <div className="flex w-[7%] justify-center">
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

          <div className="flex w-[20%] flex-wrap justify-between dark:text-white">
            <button
              className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-400 dark:hover:bg-opacity-30"
              onClick={() =>
                handleOpen({
                  employee_id: sheet?.Employee?.id,
                  employeeId: sheet?.Employee?.employeeId,
                  name: sheet?.Employee?.name,
                  payment_date: sheet?.payment_date,
                  bonus_name: sheet?.BonusType?.title,
                  amount: sheet?.amount,
                  date: sheet?.generate_date,
                  status: sheet?.status,
                  companyId,
                  month,
                  year,
                })
              }
            >
              <FileText className="h-3.5 w-3.5" />
              Payslip
            </button>

            <button
              className={`flex items-center gap-1 rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                sheet?.status === "Paid"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-400 dark:hover:bg-opacity-30"
                  : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400 dark:hover:bg-opacity-30"
              } `}
              onClick={() =>
                handleUpdateBonusSlip(
                  sheet?.Employee?.id,
                  sheet?.generate_date,
                  sheet?.status === "Paid" ? "Unpaid" : "Paid",
                )
              }
            >
              {sheet?.status === "Paid" ? "Unpay" : "Pay"}
            </button>

            <button
              className="flex items-center gap-1 rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400 dark:hover:bg-opacity-30"
              onClick={() => handleDeleteBonusSlip(sheet?.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      </>
    ));

  return (
    <div>
      <div className="flex w-full justify-end rounded-md bg-white p-5 px-6 py-8 dark:bg-dark-card">
        <div className="flex w-[100%] flex-wrap items-center justify-end gap-2">
          <select
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 bg-light-input px-2 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            value={bonusType}
            onChange={handleBonusTypeChange}
          >
            <option value="">Select Type</option>

            {bonusTypes?.data?.map((option, index) => (
              <option key={index} value={option?.id} name="nameId">
                {option?.title}
              </option>
            ))}
          </select>

          <select
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 bg-light-input px-2 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            value={dept}
            onChange={handleDeptChange}
          >
            <option value="All" name="all">
              All
            </option>

            {deptList?.data?.map((option, index) => (
              <option key={index} value={option?.id} name="nameId">
                {option?.name}
              </option>
            ))}
          </select>

          <select
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 bg-light-input px-2 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
            className="h-13 w-64 rounded-md border border-dark-box border-opacity-5 bg-light-input px-3 py-3 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
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
          {/* Single Filter Input */}

          <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
            <div>
              <h3 className="text-base leading-6 dark:text-dark-heading-color">
                Bonus slip
              </h3>
            </div>

            <div className="flex w-[60%] flex-wrap items-center justify-end gap-2">
              <input
                id="filterText"
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Name or ID"
                className="rounded-md border border-gray-300 border-opacity-10 bg-light-input px-3 py-3 text-sm focus:border-blue-500 focus:outline-none dark:bg-dark-box dark:text-white"
                style={{ minWidth: 200 }}
              />
              <MonthYearSelector
                month={month}
                year={year}
                onMonthChange={setMonth}
                onYearChange={setYear}
                className="flex-1"
              />

              <CSVLink
                data={csvData}
                filename={`salary_sheet_${month}_${year}.csv`}
                className="rounded-md bg-blue-500 px-3 py-3 text-white"
                onClick={handleExport}
              >
                Export
              </CSVLink>

              <button
                className="rounded-md bg-blue-500 px-3 py-3 text-white"
                onClick={handleBulkPayment}
              >
                Bulk Payment
              </button>
            </div>
          </div>
          <div className="px-6 py-3">
            {/* header  */}
            <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
              <div className="w-[10%] dark:text-white">
                <h3>Employee Id</h3>
              </div>

              <div className="w-[10%] dark:text-white">
                <h3>Name</h3>
              </div>

              <div className="w-[10%] dark:text-white">
                <h3>Bonus Type</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>Amount</h3>
              </div>

              <div className="w-[7%] text-center dark:text-white">
                <h3>Status </h3>
              </div>
              <div className="w-[20%] dark:text-white">
                <h3>Action </h3>
              </div>
            </div>

            {/* body  */}
            {content}
          </div>
        </BrandCardWrapper>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-5xl rounded-lg bg-white p-6 dark:bg-dark-card">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Bonus Slip
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PreviewBonusSlip slipPreview={slipPreview} onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusSlipCard;
