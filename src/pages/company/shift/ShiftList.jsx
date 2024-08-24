import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useDeleteShiftMutation,
  useGetCompanyIdQuery,
  useGetShiftListQuery,
} from "../../../features/api";

import ErrorMessage from "../../../utils/ErrorMessage";
import ListSkelaton from "../../../skeletons/ListSkeleton";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import toast from "react-hot-toast";
const ShiftList = () => {
  const { data: company_Id } = useGetCompanyIdQuery();

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
        }
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
            className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          >
            <td className="py-2 text-sm text-center">{++index}</td>
            <td className="py-2 text-sm font-semibold pl-10">{shift?.name}</td>
            <td className="py-2 text-sm text-center">{shift?.start_time}</td>
            <td className="py-2 text-sm text-center">{shift?.end_time}</td>
            <td className="py-2 text-sm text-center">
              {shift?.late_time_count}
            </td>
            <td className="py-2 text-sm ">
              <Link to={`/company/edit/shift/${shift?.id}`}>
                <div className="grid place-items-center">
                  <TbEdit className="text-2xl text-[#6D28D9]" />
                </div>
              </Link>
            </td>
            <td
              className="py-2 text-sm "
              onClick={() => handleDeleteShift(shift?.id, company_Id)}
            >
              <div className="grid place-items-center">
                <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2"> Shift</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        {/* Heading And Btn */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="font-medium text-base ">
            {" "}
            {!isError && `Now ${ShiftList?.data?.length} shift are available`}
          </div>
          <div>
            <Link
              to="/company/add/shift"
              className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Shift
            </Link>
          </div>
        </div>
        <table className="w-full h-auto ">
          {!isError && (
            <thead className="border-b border-slate-200 text-left mt-8">
              <tr>
                <th className="pb-2 text-base text-center">SL</th>
                <th className="pb-2 text-base pl-10">Name</th>
                <th className="pb-2 text-base text-center">Start Time</th>
                <th className="pb-2 text-base text-center">End Time</th>
                <th className="pb-2 text-base text-center">Late Time </th>
                <th className="pb-2 text-base text-center">Update </th>
                <th className="pb-2 text-base text-center">Delete </th>
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
