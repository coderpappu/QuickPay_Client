import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  // useDeletetypeMutation,
  useGetCompaniesQuery,
  useSetCompanyIdMutation,
  useGetCompanyIdQuery,
  useGetLeaveTypeListQuery,
  useDeleteLeaveTypeMutation,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import ErrorMessage from "../../utils/ErrorMessage";
import LeaveTypeForm from "./LeaveTypeForm";

const LeaveTypeList = () => {
  //   const {
  //     data: companyData,
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useGetCompaniesQuery();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteLeaveType] = useDeleteLeaveTypeMutation();
  const [setCompanyId] = useSetCompanyIdMutation();

  const {
    data: leaveTypes,
    isLoading,
    isError,
    error,
  } = useGetLeaveTypeListQuery(companyId);

  const handleActivate = (id) => {
    setCompanyId(id);
  };

  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleDeleteCompany = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteLeaveType(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Company deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete company");
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
  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  let leaveTypesData;

  if (!isLoading && !isError) {
    leaveTypesData = leaveTypes?.data;
    content = (
      <>
        {leaveTypesData?.map((type, index) => (
          <tr
            key={type?.id}
            className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          >
            <td className="py-2 text-sm text-center">{index + 1}</td>
            <td className="py-2 text-sm font-semibold pl-10">{type?.name}</td>
            <td className="py-2 text-sm text-center">{type.code}</td>

            <td className="py-2 text-sm text-center">{type?.type}</td>
            <td className="py-2 text-sm text-center">{type?.day}</td>
            <td className="py-2 text-sm text-center">{type?.description}</td>

            <td className="py-2 text-sm">
              <Link to={`/company/leave/form/${type?.id}`}>
                <div className="grid place-items-center">
                  <TbEdit className="text-2xl text-[#6D28D9]" />
                </div>
              </Link>
            </td>
            <td
              className="py-2 text-sm"
              onClick={() => handleDeleteCompany(type?.id)}
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
          <h2 className="font-semibold text-lg pb-2">Leave Type </h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="font-medium text-base">
            {/* {companies && companies?.length} Company Available for Now */}
          </div>
          <div>
            <Link
              onClick={() => setIsPopupOpen(true)}
              className="px-5 py-2 rounded-[3px] text-white bg-[#6D28D9] transition hover:bg-[#7f39f0]"
            >
              Add Leave Type
            </Link>
          </div>
        </div>

        <div>
          <table className="w-full h-auto">
            {!isError && (
              <thead className="border-b border-slate-200 text-left mt-8">
                <tr>
                  <th className="pb-2 text-base text-center">SL</th>
                  <th className="pb-2 text-base pl-10">Name</th>
                  <th className="pb-2 text-base text-center">Code</th>
                  <th className="pb-2 text-base text-center">Type</th>
                  <th className="pb-2 text-base text-center">Day</th>
                  <th className="pb-2 text-base text-center">Description</th>

                  <th className="pb-2 text-base text-center">Update</th>
                  <th className="pb-2 text-base text-center">Delete</th>
                </tr>
              </thead>
            )}

            <tbody>{content}</tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Leave Type</h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <LeaveTypeForm onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypeList;
