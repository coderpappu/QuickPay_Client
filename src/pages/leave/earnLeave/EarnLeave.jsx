import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteLeaveTypeMutation,
  useGetCompanyIdQuery,
  useGetLeaveTypeListQuery,
  useSetCompanyIdMutation,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import LeaveTypeForm from "../LeaveTypeForm";

const EarnLeave = () => {
  //   const {
  //     data: companyData,
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useGetCompaniesQuery();
  const navigate = useNavigate();

  const [isUpdate, setIsUpdate] = useState(false);

  const updateFormHandler = () => {
    setIsUpdate(!isUpdate);
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
                  <TbEdit className="text-2xl text-[#3686FF]" />
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
          <h2 className="font-semibold text-lg pb-2">Earn Leave Configure </h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-auto">
        <div className="w-full flex flex-wrap justify-between items-center py-3 px-4 font-semibold border-b border-[#ddd] text-black rounded-sm">
          <div className="w-[10%]">
            <h3>SL</h3>
          </div>
          <div className="w-[40%]">
            <h3>For Work Day</h3>
          </div>
          <div className="w-[40%]">
            <h3>Day of Earn Leave </h3>
          </div>
          <div className="w-[10%]">
            <h3>Actions</h3>
          </div>
        </div>

        {/* table data  */}
        <div className="w-full flex flex-wrap justify-between items-center py-3 px-4 bg-[#fff] text-black rounded-sm">
          <div className="w-[10%]">
            <h3>01</h3>
          </div>
          <div className="w-[40%]">
            {isUpdate ? (
              <input
                type="number"
                value={22}
                className="w-[80%] bg-blue-100 px-2 py-3 rounded-md"
              />
            ) : (
              <h3>22</h3>
            )}
          </div>
          <div className="w-[40%]">
            {isUpdate ? (
              <input
                type="number"
                value={1}
                className="w-[80%] bg-blue-100 px-2 py-3 rounded-md"
              />
            ) : (
              <h3>01</h3>
            )}
          </div>
          <div className="w-[10%]">
            <button
              className="px-4 py-2 bg-[#3686FF]  text-white rounded-sm "
              onClick={updateFormHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnLeave;
