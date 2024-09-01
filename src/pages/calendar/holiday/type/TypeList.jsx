import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  useDeleteTypeMutation,
  useGetCompanyIdQuery,
  useGetTypeListQuery,
} from "../../../../features/api";

import ListSkeleton from "../../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../../utils/ErrorMessage";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../../helpers/ConfirmDialog";
import TypeForm from "./TypeForm";

const TypeList = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteType] = useDeleteTypeMutation();
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
                deleteType(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Type deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete type");
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
    data: weekends,
    isLoading,
    isError,
    error,
  } = useGetTypeListQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError)
    content = weekends?.data ? (
      weekends?.data?.map((weekend, index) => (
        <tr
          key={weekend?.id}
          className={`${
            index % 2 === 0 ? "" : "bg-gray-50"
          } rounded-sm md:rounded-none`}
        >
          <td className="py-2 text-sm text-center">{++index}</td>
          <td className="py-2 text-sm font-semibold pl-4 md:pl-10">
            {weekend?.name}
          </td>

          <td
            className="py-2 text-sm"
            onClick={() => handleDeleteWeekend(weekend?.id)}
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
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Holiday Type</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-[50%] h-auto overflow-x-auto">
        {/* Heading And Btn */}
        <div className="flex flex-wrap justify-between mb-4">
          <div className="font-medium text-base">
            {weekends?.data?.length | 0} Holiday Type Available for Now
          </div>
          <div>
            <button
              onClick={() => setIsPopupOpen(true)} // Open the popup on click
              className="px-3 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Type
            </button>
          </div>
        </div>
        <div>
          <table className="w-full h-auto table-fixed">
            {!isError && (
              <thead className="border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-base text-center">SL</th>
                  <th className="pb-2 text-base pl-4 md:pl-10">Name</th>

                  <th className="pb-2 text-base text-center">Action</th>
                </tr>
              </thead>
            )}

            <tbody>{content}</tbody>
          </table>
        </div>
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
              <TypeForm onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeList;
