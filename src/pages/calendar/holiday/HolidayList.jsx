import { MdOutlineDeleteOutline } from "react-icons/md";
import {
    useDeleteHolidayMutation,
    useGetCompanyIdQuery,
    useGetHolidayListQuery
} from "../../../features/api";

import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import HolidayFormPopup from "./HolidayForm";

const HolidayList = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteHoliday] = useDeleteHolidayMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteWeekend = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteHoliday(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Holiday deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete holiday");
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

  const {
    data: holidays,
    isLoading,
    isError,
    error,
  } = useGetHolidayListQuery(companyId, {
    skip: companyId == null,
  });

  //   console.log(holidays?.data?.[0]?.HolidayType?.name);

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError)
    content = holidays?.data ? (
      holidays?.data?.map((holiday, index) => (
        <tr
          key={holiday?.id}
          className={`${
            index % 2 === 0 ? "" : "bg-gray-50"
          } rounded-sm md:rounded-none`}
        >
          <td className="py-2 text-sm text-center">{++index}</td>
          <td className="py-2 text-sm font-medium pl-4 ">{holiday?.name}</td>
          <td className="py-2 text-sm font-medium pl-4 ">
            {holiday?.HolidayType?.name}
          </td>
          <td
            className={` ${holiday.status === "INACTIVE" && "text-red-600"} py-2 font-medium text-sm text-center`}
          >
            {holiday?.from_date}
          </td>
          <td
            className={` ${holiday.status === "INACTIVE" && "text-red-600"} py-2 font-medium text-sm text-center`}
          >
            {holiday?.to_date}
          </td>
          <td
            className={` ${holiday.status === "INACTIVE" && "text-red-600"} py-2 font-medium text-sm text-center`}
          >
            {holiday?.description}
          </td>

          {/* <td className="py-2 text-sm">
            <Link to={`/weekend/update/${holiday?.id}`}>
              <div className="grid place-items-center">
                <TbEdit className="text-2xl text-[#3686FF]" />
              </div>
            </Link>
          </td> */}
          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteWeekend(holiday?.id)}
          >
            <div className="grid place-items-center">
              <MdOutlineDeleteOutline className="text-2xl text-red-600 cursor-pointer" />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <h3 className="center py-6">No data to show</h3>
    );

  return (
    // <div className="px-4 md:px-0">
    //   <div className="flex flex-wrap justify-between items-center pb-2">
    //     <div>
    //       <h2 className="font-semibold text-lg pb-2">Holiday</h2>
    //     </div>
    //   </div>

    <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-[64%] h-auto overflow-x-auto">
      {/* Heading And Btn */}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="font-medium text-base">
          {holidays?.data?.length | 0} Holiday Available for Now
        </div>
        <div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-5 py-2 text-sm rounded-[3px] text-white bg-[#3686FF] transition hover:bg-[#7f39f0]"
          >
            Add Weekend
          </button>
        </div>
      </div>
      <div>
        <table className="w-full h-auto table-fixed">
          {!isError && (
            <thead className="border-b border-slate-200 text-left">
              <tr>
                <th className="pb-2 text-sm text-center w-10">SL</th>
                <th className="pb-2 text-sm pl-4 ">Name</th>
                <th className="pb-2 text-sm pl-4 ">Type</th>
                <th className="pb-2 text-sm text-center">From</th>
                <th className="pb-2 text-sm text-center">To</th>
                <th className="pb-2 text-sm text-center">Description</th>

                <th className="pb-2 text-sm text-center">Action</th>
              </tr>
            </thead>
          )}

          <tbody>{content}</tbody>
        </table>
      </div>
      {/* Popup Component */}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Add Holiday Type
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <HolidayFormPopup onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default HolidayList;
