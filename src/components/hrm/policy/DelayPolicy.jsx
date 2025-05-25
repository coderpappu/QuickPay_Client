import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateDelayPolicyMutation,
  useGetDelayPolicyDetailsQuery,
  useGetLeaveTypeListQuery,
} from "../../../features/api";

import toast from "react-hot-toast";

const DelayPolicy = () => {
  const [createDelayPolicy] = useCreateDelayPolicyMutation();

  const [isActive, setIsActive] = useState(true);
  const [deductFromLeave, setDeductFromLeave] = useState(true);
  const [latePerDeduction, setLatePerDeduction] = useState(3);
  const [leaveType, setLeaveType] = useState("Casual");
  const [salaryType, setSalaryType] = useState("gross");

  const companyId = useSelector((state) => state.company.companyId);

  const { data: delayDetails } = useGetDelayPolicyDetailsQuery(companyId);
  const { data: leaveTypeList } = useGetLeaveTypeListQuery(companyId);

  // Set form values when delayDetails are loaded
  useEffect(() => {
    if (delayDetails?.data?.length > 0) {
      const policy = delayDetails.data[0];

      setIsActive(policy.isActive);
      setLatePerDeduction(policy.latePerDeduction);
      setDeductFromLeave(policy.deductFrom === "leave");
      setLeaveType(policy.leaveType || "Casual");
      setSalaryType(policy.salaryType || "gross");
    }
  }, [delayDetails]);

  const handleSubmit = async () => {
    const payload = {
      isActive,
      latePerDeduction,
      deductFrom: deductFromLeave ? "leave" : "salary",
      leaveType: deductFromLeave ? leaveType : null,
      salaryType: !deductFromLeave ? salaryType : null,
      company_id: companyId,
    };

    try {
      const response = await createDelayPolicy(payload).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const lateDaysExample = 5;
  const calculatedDeduction = Number(
    (lateDaysExample / latePerDeduction).toFixed(2),
  );

  return (
    <div className="w-full rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark-card">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Delay Deduction Policy
      </h2>

      {/* Enable Policy */}
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Enable delay deduction
        </label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="h-5 w-5 accent-blue-600"
        />
      </div>

      {/* Late Count Rule */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          How many late days = 1 deduction
        </label>
        <input
          type="number"
          min={1}
          value={latePerDeduction}
          onChange={(e) => setLatePerDeduction(Number(e.target.value))}
          disabled={!isActive}
          className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
        />
      </div>

      {/* Deduct From */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deduct from:
        </label>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="radio"
              name="deduct-method"
              checked={deductFromLeave}
              onChange={() => setDeductFromLeave(true)}
              disabled={!isActive}
              className="accent-blue-600"
            />
            Leave
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="radio"
              name="deduct-method"
              checked={!deductFromLeave}
              onChange={() => setDeductFromLeave(false)}
              disabled={!isActive}
              className="accent-blue-600"
            />
            Salary
          </label>
        </div>
      </div>

      {/* Conditional: Leave Type */}
      {isActive && deductFromLeave && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select leave type:
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="h-10 w-full rounded-md border border-dark-box border-opacity-5 bg-light-input px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
          >
            {leaveTypeList?.data?.map((leave) => (
              <option key={leave.id} value={leave.name}>
                {leave.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Conditional: Salary Type */}
      {isActive && !deductFromLeave && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Salary type for deduction:
          </label>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="radio"
                name="salary-type"
                value="gross"
                checked={salaryType === "gross"}
                onChange={() => setSalaryType("gross")}
                className="accent-blue-600"
              />
              Gross Salary
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="radio"
                name="salary-type"
                value="basic"
                checked={salaryType === "basic"}
                onChange={() => setSalaryType("basic")}
                className="accent-blue-600"
              />
              Basic Salary
            </label>
          </div>
        </div>
      )}

      {/* Preview Box */}
      {isActive && (
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          <p>
            Example: If employee is late <strong>{lateDaysExample}</strong> days
            and rule is <strong>{latePerDeduction}</strong> days = 1 deduction
          </p>
          <p className="mt-1">
            Then <strong>{calculatedDeduction}</strong> day(s) will be deducted
            from{" "}
            <strong>
              {deductFromLeave
                ? `${leaveType} Leave`
                : salaryType === "gross"
                  ? "Gross Salary"
                  : "Basic Salary"}
            </strong>
            .
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Submit Policy
      </button>
    </div>
  );
};

export default DelayPolicy;
