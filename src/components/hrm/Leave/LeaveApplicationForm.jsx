import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useGetLeaveApplicationDetailsQuery,
  useUpdateLeaveApplicationMutation,
} from "../../../features/api";

const applicationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  paid_status: Yup.string().required("Paid Status is required"),
  note: Yup.string().required("Note is required"),
});

const LeaveApplicationForm = ({ selectId, setIsPopupOpen }) => {
  const companyId = useSelector((state) => state.company.companyId);
  const { data: leaveApplicationDetails } = useGetLeaveApplicationDetailsQuery(
    selectId,
    { skip: !selectId },
  );
  const [applicationUpdate] = useUpdateLeaveApplicationMutation();

  const [initialValues, setInitialValues] = useState({
    status: "",
    paid_status: "",
    note: "",
  });

  useEffect(() => {
    if (leaveApplicationDetails?.data) {
      setInitialValues({
        status: leaveApplicationDetails?.data?.status,
        paid_status: leaveApplicationDetails?.data?.paid_status,
        note: leaveApplicationDetails?.data?.note,
      });
    }
  }, [leaveApplicationDetails]);

  return (
    <div className="bg-light-card mx-auto w-full space-y-6 rounded-lg p-6 shadow-md dark:bg-dark-card">
      <h2 className="text-light-text text-xl font-semibold dark:text-dark-text-color">
        Update Leave Application
      </h2>

      <div className="flex items-start justify-between rounded-md border bg-light-input p-4 dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-box">
        <div className="flex items-center gap-4">
          <div className="dark:bg-dark-muted h-16 w-16 rounded-full bg-gray-300"></div>
          <div>
            <h3 className="text-light-text font-semibold dark:text-dark-text-color">
              Syed Labib Anjum
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              10000
            </p>
            <p className="text-light-subtext dark:text-dark-subtext text-sm">
              Sr. Executive, Business Development
            </p>
          </div>
        </div>

        <div className="text-light-text grid grid-cols-2 gap-x-12 gap-y-1 text-sm dark:text-dark-text-color">
          <p>
            <strong>Join Date:</strong> 01-04-2024
          </p>
          <p>
            <strong>Job Status:</strong>{" "}
            <label
              htmlFor=""
              className="ml-1 rounded-full bg-green-600 bg-opacity-55 px-2 py-1 text-xs text-white"
            >
              Confirmed
            </label>
          </p>
          <p>
            <strong>Branch:</strong> Tiger KOI
          </p>
          <p>
            <strong>Department:</strong> Sales
          </p>
        </div>
      </div>

      <div className="text-light-text flex items-center justify-between text-sm dark:text-dark-text-color">
        <div className="space-x-4">
          <span>
            Marriage Leave: <strong>10</strong>
          </span>
          <span>
            Annual Leave: <strong>10</strong>
          </span>
        </div>
        <div className="flex gap-4">
          {["Continuous", "Prefix", "Suffix", "Half Day"].map((type) => (
            <label
              key={type}
              className="text-light-text flex items-center dark:text-dark-text-color"
            >
              <input type="radio" name="leave_type_option" className="mr-1" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            Leave Type *
          </label>
          <select className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color">
            <option>Marriage Leave</option>
          </select>
        </div>
        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            Day Count
          </label>
          <input
            type="number"
            defaultValue={1}
            className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
        <div className="flex items-center gap-4 pt-6">
          <label className="text-light-text flex items-center dark:text-dark-text-color">
            <input type="checkbox" className="mr-2" />
            Foreign Leave Y/N
          </label>

          <label className="text-light-text flex items-center dark:text-dark-text-color">
            <input type="checkbox" className="mr-2" />
            Include Extra Work Dates
          </label>
        </div>

        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            Start Date *
          </label>
          <input
            type="date"
            defaultValue="2025-05-22"
            className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            End Date *
          </label>
          <input
            type="date"
            defaultValue="2025-05-22"
            className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            Purpose *
          </label>
          <textarea
            rows="3"
            defaultValue="I will go to my village"
            className="w-full rounded border border-dark-box border-opacity-5 bg-light-input px-3 py-2 dark:bg-dark-box dark:text-dark-text-color"
          />
        </div>
        <div>
          <label className="text-light-text mb-1 block text-sm font-medium dark:text-dark-text-color">
            Current Approver
          </label>
          <div className="mt-1 flex items-center gap-3 rounded border bg-light-input p-3 dark:border-dark-border-color dark:border-opacity-5 dark:bg-dark-box">
            <div className="dark:bg-dark-muted h-10 w-10 rounded-full bg-gray-300"></div>
            <div className="text-light-text text-sm dark:text-dark-text-color">
              <p className="font-medium">Rajib Saha</p>
              <p className="text-light-subtext dark:text-dark-subtext text-xs">
                0376
              </p>
              <p className="text-light-subtext dark:text-dark-subtext text-xs">
                Vivasoft Ltd Banani
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-light-text mb-2 text-sm font-semibold dark:text-dark-text-color">
          APPROVAL HISTORY
        </h3>
        <div className="overflow-x-auto rounded border border-dark-bg border-opacity-0 dark:border-dark-border-color dark:border-opacity-5">
          <table className="text-light-text min-w-full text-left text-sm dark:text-dark-text-color">
            <thead className="bg-light-input dark:bg-dark-box">
              <tr>
                <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Approver Code
                </th>
                <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Approver Name
                </th>
                <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Status
                </th>
                <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Operation Date
                </th>
                <th className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  0376
                </td>
                <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Rajib Saha
                </td>
                <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  Under Processing
                </td>
                <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  27-04-2025
                </td>
                <td className="border px-3 py-2 dark:border-dark-border-color dark:border-opacity-5">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-light-subtext dark:text-dark-subtext text-sm">
          Apply Date: <strong>27-04-2025</strong>
        </p>
        <div className="space-x-3">
          <button className="rounded bg-red-600 px-4 py-2 text-white">
            Reject
          </button>
          <button className="rounded bg-green-600 px-4 py-2 text-white">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
