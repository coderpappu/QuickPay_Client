import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetAllLeaveApplicationQuery,
  useUpdateLeaveApplicationMutation,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import DatePicker from "../../utils/DatePicker";
import ErrorMessage from "../../utils/ErrorMessage";

// Modal Component
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onSave, leaveData, setLeaveData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-md bg-white p-5 dark:bg-dark-card">
        <h3 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
          Edit Leave Application
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-light-bg">
              Status
            </label>
            <select
              name="status"
              value={leaveData.status}
              onChange={handleChange}
              className="mt-2 h-10 w-full rounded-md border border-dark-box border-opacity-5 p-2 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-light-bg">
              Paid Status
            </label>
            <select
              name="paid_status"
              value={leaveData.paid_status}
              onChange={handleChange}
              className="mt-2 h-10 w-full rounded-md border border-dark-box border-opacity-5 p-2 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            >
              <option value="PAID">PAID</option>
              <option value="UNPAID">UNPAID</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-light-bg">
              Note
            </label>
            <textarea
              name="note"
              value={leaveData.note}
              onChange={handleChange}
              className="mt-2 h-10 w-full rounded-md border border-dark-box border-opacity-5 p-2 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded-md bg-gray-200 px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-[#3686FF] px-4 py-2 text-white"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LeaveApplicationList = () => {
  const [editRow, setEditRow] = useState(null); // Row being edited
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility

  const [leaveData, setLeaveData] = useState({
    status: "",
    paid_status: "",
    note: "",
  });

  const companyId = useSelector((state) => state.company.companyId);

  const [applicationUpdate] = useUpdateLeaveApplicationMutation();

  const {
    data: leaveApplicationList,
    isLoading,
    isError,
    error,
  } = useGetAllLeaveApplicationQuery(companyId);

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  const openModal = (leave) => {
    setLeaveData({
      status: leave.status,
      paid_status: leave.paid_status,
      note: leave.note || "",
    });
    setEditRow(leave.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditRow(null);
  };

  const saveLeaveData = async () => {
    await applicationUpdate({ id: editRow, ...leaveData });
    setModalOpen(false);
    setEditRow(null);
  };

  const statusColorHandler = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-300 text-black";
      case "APPROVED":
        return "bg-green-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      default:
        return "text-gray-500";
    }
  };

  if (!isLoading && !isError) {
    content = (
      <>
        {leaveApplicationList?.data?.map((leave, index) => (
          <tr
            key={leave?.id}
            className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
          >
            <td className="py-2 text-sm">{++index}</td>
            <td className="py-2 text-sm">{leave?.LeaveType?.name}</td>
            <td className="py-2 text-sm">{DatePicker(leave?.created_at)}</td>
            <td className="py-2 text-sm">{DatePicker(leave?.start_date)}</td>
            <td className="py-2 text-sm">{DatePicker(leave?.end_date)}</td>
            <td className="py-2 text-sm">{leave?.leaveDuration}</td>
            <td className="py-2 text-sm">{leave?.reason}</td>
            <td className="py-2 text-sm">{leave?.paid_status}</td>
            <td className="py-2 text-sm">{leave?.note || "..."}</td>
            <td className="py-2 text-sm">Manager</td>
            <td className="flex-wrap items-center justify-center py-2 text-sm">
              <div
                className={` ${statusColorHandler(leave.status)} m-auto w-32 rounded-full px-1 py-2 text-center text-xs font-bold text-gray-700`}
              >
                {leave?.status}
              </div>
            </td>
            <td className="flex items-center justify-center gap-2 py-2 text-center text-sm">
              <div>
                <Link to={`/leave/application/${leave?.id}`}>
                  <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-600 p-2 text-white">
                    <PiEyeLight size={20} onClick={() => openModal(leave)} />
                  </div>
                </Link>
              </div>
              <div>
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2 text-white">
                  <CiEdit size={20} onClick={() => openModal(leave)} />
                </div>
              </div>

              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center text-white">
                <AiOutlineDelete size={20} />
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <h2 className="pb-2 text-lg font-semibold dark:text-dark-heading-color">
          Employee Leave Applications
        </h2>
      </div>
      <div className="mt-3 h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5 dark:border-none dark:bg-dark-card">
        <div className="mb-4 flex flex-wrap items-center justify-between">
          {/* <div className="dark:text-light-bg"></div> */}
        </div>
        <table className="h-auto w-full">
          <thead className="mt-8 border-b border-slate-200 text-left dark:border-dark-border-color dark:border-opacity-10 dark:text-white">
            <tr>
              <th className="w-[3%] pb-2 text-[14px]">SL</th>
              <th className="w-[10%] pb-2 text-[14px]">Leave Type</th>
              <th className="w-[10%] pb-2 text-[14px]">Applied on</th>
              <th className="w-[10%] pb-2 text-[14px]">Start Date</th>
              <th className="w-[10%] pb-2 text-[14px]">End Date</th>
              <th className="w-[5%] pb-2 text-[14px]">Days</th>
              <th className="w-[10%] pb-2 text-[14px]">Reason</th>
              <th className="w-[10%] pb-2 text-[14px]">Paid Status</th>
              <th className="w-[10%] pb-2 text-[14px]">Note</th>
              <th className="w-[8%] pb-2 text-[14px]">Approved By</th>
              <th className="w-[10%] pb-2 text-center text-[14px]">Status</th>
              <th className="w-[10%] pb-2 text-center text-[14px]">Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>

        {/* Modal Popup for editing */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={saveLeaveData}
          leaveData={leaveData}
          setLeaveData={setLeaveData}
        />
      </div>
    </>
  );
};

export default LeaveApplicationList;
