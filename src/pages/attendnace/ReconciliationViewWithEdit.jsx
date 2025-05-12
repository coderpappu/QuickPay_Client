import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetReconciliationByIdQuery,
  useUpdateReconciliationApplicationMutation,
} from "../../features/api";

import toast from "react-hot-toast";

const ReconciliationView = ({ selectId, setIsPopupOpen }) => {
  const companyId = useSelector((state) => state.company.companyId);

  const { data: reconciliationData } = useGetReconciliationByIdQuery(selectId, {
    skip: !selectId,
  });

  // update end point
  const [updateReconciliation] = useUpdateReconciliationApplicationMutation();

  //   console.log(TimeConverterFromUTC(reconciliationData?.data?.approvedCheckIn));

  const [initialData, setInitialData] = useState({
    date: "",
    in_time: "",
    out_time: "",
    reason: "",
    note: "",
    status: "",
  });

  useEffect(() => {
    if (reconciliationData?.data) {
      const data = reconciliationData.data;
      setInitialData({
        date: data.date?.split("T")[0] || "",
        in_time: data.approvedCheckIn ? data.approvedCheckIn : "N/A",
        out_time: data.approvedCheckOut ? data.approvedCheckOut : "N/A",
        reason: data.reason || "",
        note: data.note || "",
        status: data.status || "",
      });
    }
  }, [reconciliationData]);

  // Update handler for Approve/Reject
  const handleUpdate = async (status) => {
    try {
      const payload = {
        id: selectId,
        status,
      };

      await updateReconciliation(payload).unwrap();
      toast.success("Reconciliation application updated.");
      setIsPopupOpen(false);
    } catch (error) {
      toast.error("Failed to update reconciliation.");
    }
  };

  const employee = reconciliationData?.data?.employee;

  return (
    <div className="bg-light-card mx-auto w-full space-y-6 rounded-lg p-6 shadow-md dark:bg-dark-card">
      <h2 className="text-light-text text-xl font-semibold dark:text-dark-text-color">
        Reconciliation Application
      </h2>

      {/* Employee Info */}

      <div className="flex items-start justify-between rounded-md border bg-light-input p-4 dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-box">
        <div className="flex items-center gap-4">
          <div className="dark:bg-dark-muted h-16 w-16 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="text-light-text font-semibold dark:text-dark-text-color">
              {employee?.name}
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              {employee?.employeeId}
            </p>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              {employee?.EmployeeDesignation?.[0]?.designation?.name}
            </p>
          </div>
        </div>
        <div className="text-light-text grid grid-cols-2 gap-y-1 text-sm dark:text-dark-text-color">
          <p>
            <strong>Join Date:</strong> {employee?.joining_date}
          </p>
          <p>
            <strong>Job Status:</strong>
            <span className="ml-1 rounded-full bg-green-600 bg-opacity-55 px-2 py-1 text-xs text-white">
              {employee?.job_status}
            </span>
          </p>
          <p>
            <strong>Branch:</strong>{" "}
            {employee?.EmployeeBranch?.[0]?.branch?.name}
          </p>
          <p>
            <strong>Department:</strong>{" "}
            {employee?.EmployeeDepartment?.[0]?.department?.name}
          </p>
        </div>
      </div>

      {/* Form View */}

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium dark:text-dark-text-color">
            Check In
          </label>
          <input
            type="text"
            value={reconciliationData?.data?.checkIn}
            disabled
            className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>

        <div>
          <label className="text-sm font-medium dark:text-dark-text-color">
            Check Out
          </label>
          <input
            type="text"
            value={reconciliationData?.data?.checkOut}
            disabled
            className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium dark:text-dark-text-color">
            Date
          </label>
          <input
            type="date"
            value={initialData.date}
            disabled
            className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>

        <div>
          <label className="text-sm font-medium dark:text-dark-text-color">
            Request In Time
          </label>
          <input
            type="text"
            value={initialData.in_time}
            disabled
            className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>

        <div>
          <label className="text-sm font-medium dark:text-dark-text-color">
            Request Out Time
          </label>
          <input
            type="text"
            value={initialData.out_time}
            disabled
            className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium dark:text-dark-text-color">
          Reason
        </label>
        <textarea
          value={initialData.reason}
          disabled
          rows={3}
          className="w-full rounded bg-gray-100 px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleUpdate("REJECTED")}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Reject
        </button>

        <button
          onClick={() => handleUpdate("APPROVED")}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default ReconciliationView;
