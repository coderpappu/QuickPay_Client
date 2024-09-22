import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import {
  useDeleteGradeMutation,
  useDeleteLeaveTypeMutation,
  useDeleteLoanTypeMutation,
  useGetCompanyIdQuery,
  useGetGradeListQuery,
  useGetLeaveTypeListQuery,
  useSetCompanyIdMutation,
} from "../../../../features/api";

import ConfirmDialog from "../../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../../utils/ErrorMessage";

import { useGetLoanTypeListQuery } from "../../../../features/api";
import LoanTypeForm from "./LoanTypeForm";

const LoanTypeList = () => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [editLoanId, setEditLoanId] = useState(undefined);

  const onClose = () => {
    setIsPopupOpen(false);
    setEditLoanId(undefined);
  };

  const handleLoantypeid = (id) => {
    setEditLoanId(id);
    setIsPopupOpen(true);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteLoanType] = useDeleteLoanTypeMutation();
  const [setCompanyId] = useSetCompanyIdMutation();

  const {
    data: loanTypeList,
    isLoading,
    isError,
    error,
  } = useGetLoanTypeListQuery(companyId);

  const handleActivate = (id) => {
    setCompanyId(id);
  };

  const handleDeactivate = () => {
    // setCompanyId(null);
  };

  const handleLoanType = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteLoanType(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Loan type deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete loan type");
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

  let loanTypeData;

  if (!isLoading && !isError) {
    loanTypeData = loanTypeList?.data;
    content = (
      <>
        {loanTypeData?.map((loanType, index) => (
          <tr
            key={loanType?.id}
            className={index % 2 === 0 ? "" : "bg-gray-50 rounded-sm"}
          >
            <td className="py-2 text-sm text-center">{index + 1}</td>
            <td className="py-2 text-sm font-semibold pl-10">
              {loanType?.name}
            </td>
            <td className="py-2 text-sm text-center">
              {loanType.interestRate}
            </td>

            <td className="py-2 text-sm text-center">
              {loanType?.maxLoanAmount}
            </td>

            <td className="py-2 text-sm">
              <div
                className="grid place-items-center cursor-pointer"
                onClick={() => handleLoantypeid(loanType?.id)}
              >
                <TbEdit className="text-2xl text-[#3686FF]" />
              </div>
            </td>
            <td
              className="py-2 text-sm"
              onClick={() => handleLoanType(loanType?.id)}
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
          <h2 className="font-semibold text-lg pb-2">Loan Types </h2>
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
              Add Loan Type
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
                  <th className="pb-2 text-base text-center">Interest Rate</th>
                  <th className="pb-2 text-base text-center">Max Amount</th>

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
              <h3 className="text-lg font-medium text-gray-800">Loan Type</h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <LoanTypeForm onClose={onClose} loanTypeId={editLoanId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanTypeList;
