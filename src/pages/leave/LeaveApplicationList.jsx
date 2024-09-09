import React, { useState } from "react";
import {
  useGetAllLeaveApplicationQuery,
  useGetCompanyIdQuery,
  useUpdateLeaveApplicationMutation,
} from "../../features/api";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { ErrorMessage, Form } from "formik";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Modal Component
const Modal = ({ isOpen, onClose, onSave, leaveData, setLeaveData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Leave Application</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={leaveData.status}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Paid Status</label>
            <select
              name="paid_status"
              value={leaveData.paid_status}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="PAID">PAID</option>
              <option value="UNPAID">UNPAID</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Note</label>
            <textarea
              name="note"
              value={leaveData.note}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
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
              className="px-4 py-2 bg-[#6D28D9] text-white rounded-md"
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
        return "bg-[#ffffcd] text-[#f7d000]";
      case "APPROVED":
        return "bg-[#DDF6E1] text-[#1DCF33]";
      case "REJECTED":
        return "bg-[#ffd4d4] text-[#ff0d0d]";
      default:
        return "text-gray-500";
    }
  };

  if (!isLoading && !isError) {
    content = (
      <tbody>
        {leaveApplicationList?.data?.map((leave, index) => (
          <tr
            key={leave?.id}
            className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          >
            <td className="py-2 text-sm ">{++index}</td>
            <td className="py-2 text-sm ">{leave?.LeaveType?.name}</td>
            <td className="py-2 text-sm ">{leave?.start_date}</td>
            <td className="py-2 text-sm ">{leave?.end_date}</td>
            <td className="py-2 text-sm ">2</td>
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
            <td className="py-2 text-sm text-center flex justify-center items-center">
              <LiaEditSolid
                size={23}
                color="#6D28D9"
                onClick={() => openModal(leave)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="border-solid border-[1px] mt-3 border-slate-200 bg-white rounded-md p-5 w-full h-auto">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div>All Leave Request</div>
      </div>
      <table className="w-full h-auto">
        <thead className="border-b border-slate-200 text-left mt-8">
          <tr>
            <th className="pb-2 text-base ">SL</th>
            <th className="pb-2 text-base ">Leave Type</th>
            <th className="pb-2 text-base ">From</th>
            <th className="pb-2 text-base ">To</th>
            <th className="pb-2 text-base ">Days</th>
            <th className="pb-2 text-base ">Reason</th>
            <th className="pb-2 text-base ">Paid Status</th>
            <th className="pb-2 text-base ">Note</th>
            <th className="pb-2 text-base ">Approved By</th>
            <th className="pb-2 text-base text-center">Status</th>
            <th className="pb-2 text-base text-center">Action</th>
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
  );
};

export default LeaveApplicationList;
