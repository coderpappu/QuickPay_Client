import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteDeductionMutation,
  useGetCompanyIdQuery,
  useGetDeductionListQuery,
  useSetCompanyIdMutation,
} from "../../../features/api";

import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import DeductionForm from "./DeductionForm";

const DeductionList = () => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteDeduction] = useDeleteDeductionMutation();
  const [setCompanyId] = useSetCompanyIdMutation();

  const {
    data: deductionList,
    isLoading,
    isError,
    error,
  } = useGetDeductionListQuery(companyId);

  const handleActivate = (id) => {
    setCompanyId(id);
  };

  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleDeleteDeduction = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteDeduction(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Deduction deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete deduction");
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

  let deductionData;

  if (!isLoading && !isError) {
    deductionData = deductionList?.data;
    content = (
      <>
        {deductionData?.map((deduction, index) => (
          <tr
            key={deduction?.id}
            className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          >
            <td className="py-2 text-sm text-center">{index + 1}</td>
            <td className="py-2 text-sm font-semibold pl-10">
              {deduction?.name}
            </td>
            <td className="py-2 text-sm text-center">{deduction?.type}</td>

            <td className="py-2 text-sm text-center">
              {deduction?.basic_percentage}
            </td>
            <td className="py-2 text-sm text-center">
              {deduction?.limit_per_month}
            </td>
            <td className="py-2 text-sm">
              <Link to={`/company/deduction/form/${deduction?.id}`}>
                <div className="grid place-items-center">
                  <TbEdit className="text-2xl text-[#3686FF]" />
                </div>
              </Link>
            </td>
            <td
              className="py-2 text-sm"
              onClick={() => handleDeleteDeduction(deduction?.id)}
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
          <h2 className="font-semibold text-lg pb-2">Employee Grade List </h2>
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
              className="px-5 py-2 rounded-[3px] text-white bg-[#3686FF] transition hover:bg-[#7f39f0]"
            >
              Add Allowance
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
                  <th className="pb-2 text-base text-center">Type</th>
                  <th className="pb-2 text-base text-center">
                    Basic Percentage
                  </th>
                  <th className="pb-2 text-base text-center">
                    Limit Per Month
                  </th>
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
              <h3 className="text-lg font-medium text-gray-800">
                Allowance List
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <DeductionForm onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeductionList;
