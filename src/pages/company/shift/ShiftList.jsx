import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useDeleteShiftMutation,
  useGetShiftListQuery,
} from "../../../features/api";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkelaton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";

const ShiftList = () => {
  const company_Id = useSelector((state) => state.company.companyId);
  const {
    data: ShiftList,
    isLoading,
    isError,
    error: errorMsg,
  } = useGetShiftListQuery({
    company_Id: company_Id,
  });

  const [deleteShift, { isLoading: loding, isError: error }] =
    useDeleteShiftMutation();

  const handleDeleteShift = async (id, company_Id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteShift({ shiftId: id, company_Id }).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Shift deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete shift");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  let content = null;

  if (isLoading && !isError) content = <ListSkelaton />;
  if (isError && !isLoading)
    content = <ErrorMessage message={errorMsg?.data?.message} />;

  if (!isLoading && !isError && ShiftList?.data) {
    const data = ShiftList?.data;

    content = (
      <>
        {data?.map((shift, index) => (
          <tr
            key={shift?.id}
            className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
          >
            <td className="py-2 text-center text-sm">{++index}</td>
            <td className="py-2 pl-10 text-sm font-semibold">{shift?.name}</td>
            <td className="py-2 text-center text-sm">{shift?.start_time}</td>
            <td className="py-2 text-center text-sm">{shift?.end_time}</td>
            <td className="py-2 text-center text-sm">
              {shift?.late_time_count}
            </td>
            <td className="py-2 text-sm">
              <Link to={`/company/edit/shift/${shift?.id}`}>
                <div className="grid place-items-center">
                  <TbEdit className="text-2xl text-[#3686FF]" />
                </div>
              </Link>
            </td>
            <td
              className="py-2 text-sm"
              onClick={() => handleDeleteShift(shift?.id, company_Id)}
            >
              <div className="grid place-items-center">
                <MdOutlineDeleteOutline className="cursor-pointer text-2xl text-red-600" />
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold"> Shift</h2>
        </div>
      </div>

      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        {/* Heading And Btn */}
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="text-base font-medium">
            {" "}
            {!isError && `Now ${ShiftList?.data?.length} shift are available`}
          </div>
          <div>
            <Link
              to="/company/add/shift"
              className="rounded-[3px] bg-[#3686FF] px-5 py-2 text-white transition hover:bg-[#7f39f0]"
            >
              Add Shift
            </Link>
          </div>
        </div>
        <table className="h-auto w-full">
          {!isError && (
            <thead className="mt-8 border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-center text-base">SL</th>
                <th className="pb-2 pl-10 text-base">Name</th>
                <th className="pb-2 text-center text-base">Start Time</th>
                <th className="pb-2 text-center text-base">End Time</th>
                <th className="pb-2 text-center text-base">Late Time </th>
                <th className="pb-2 text-center text-base">Update </th>
                <th className="pb-2 text-center text-base">Delete </th>
              </tr>
            </thead>
          )}
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};
export default ShiftList;
