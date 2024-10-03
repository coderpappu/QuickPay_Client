import { ErrorMessage } from "formik";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import {
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
  useUpdateLeaveApplicationMutation,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

// Modal Component
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, onSave, leaveData, setLeaveData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-dark-card p-5 rounded-md w-96">
        <h3 className="text-xl font-semibold mb-4 dark:text-dark-heading-color">
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
              className=" mt-2 p-2  w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color "
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
              className=" mt-2 p-2  w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
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
              className=" mt-2 p-2  w-full px-2 py-1 border-dark-box border border-opacity-5 dark:bg-dark-box rounded-md h-10 text-sm focus:outline-none focus:border-button-bg focus:border dark:text-dark-text-color"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-200 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[#3686FF] text-white rounded-md"
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

  const { data: companyId } = useGetCompanyIdQuery();
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
      <tbody className="dark:text-dark-text-color">
        {leaveApplicationList?.data?.map((leave, index) => (
          <tr
            key={leave?.id}
            className={index % 2 === 0 ? "" : "bg-gray-50  rounded-sm"}
          >
            <td className="py-2 text-sm ">{++index}</td>
            <td className="py-2 text-sm ">{leave?.LeaveType?.name}</td>
            <td className="py-2 text-sm ">{leave?.created_at}</td>
            <td className="py-2 text-sm ">{leave?.start_date}</td>
            <td className="py-2 text-sm ">{leave?.end_date}</td>
            <td className="py-2 text-sm ">{leave?.leaveDuration}</td>
            <td className="py-2 text-sm ">{leave?.reason}</td>
            <td className="py-2 text-sm ">{leave?.paid_status}</td>
            <td className="py-2 text-sm ">{leave?.note || "..."}</td>
            <td className="py-2 text-sm ">Manager</td>
            <td className="py-2 text-sm flex-wrap justify-center items-center">
              <div
                className={` ${statusColorHandler(leave.status)} w-32 m-auto px-1 py-2 rounded-full text-center text-gray-700 font-bold text-xs`}
              >
                {leave?.status}
              </div>
            </td>
            <td className="py-2 text-sm text-center flex justify-center items-center gap-2">
              <div>
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-sm p-2 flex justify-center items-center cursor-pointer">
                  <CiEdit size={20} onClick={() => openModal(leave)} />
                </div>
              </div>
              <div className="w-8 h-8 bg-red-500 text-white text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                <AiOutlineDelete size={20} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <>
      <div>
        <h2 className="font-semibold text-lg pb-2 dark:text-dark-heading-color">
          Employee Leave Applications
        </h2>
      </div>
      <div className="border-solid border-[1px] mt-3 border-slate-200 dark:border-dark-border-color dark:border-opacity-10 bg-white dark:bg-dark-box rounded-md p-5 w-full h-auto ">
        <div className="flex flex-wrap justify-between items-center mb-4">
          {/* <div className="dark:text-light-bg"></div> */}
        </div>
        <table className="w-full h-auto">
          <thead className="border-b border-slate-200 dark:border-dark-border-color dark:border-opacity-10 dark:text-white mt-8 text-left ">
            <tr>
              <th className="pb-2 text-[14px] w-[3%]">SL</th>
              <th className="pb-2 text-[14px] w-[10%]">Leave Type</th>
              <th className="pb-2 text-[14px] w-[10%]">Applied on</th>
              <th className="pb-2 text-[14px] w-[10%]">Start Date</th>
              <th className="pb-2 text-[14px] w-[10%]">End Date</th>
              <th className="pb-2 text-[14px] w-[5%]">Days</th>
              <th className="pb-2 text-[14px] w-[10%]">Reason</th>
              <th className="pb-2 text-[14px] w-[10%]">Paid Status</th>
              <th className="pb-2 text-[14px] w-[10%]">Note</th>
              <th className="pb-2 text-[14px] w-[8%]">Approved By</th>
              <th className="pb-2 text-[14px] w-[10%] text-center">Status</th>
              <th className="pb-2 text-[14px] w-[10%] text-center">Action</th>
            </tr>
          </thead>
          {content}
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
