import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import {
  useDeleteLoanTypeMutation,
  useSetCompanyIdMutation,
} from "../../../../features/api";

import ConfirmDialog from "../../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../../utils/ErrorMessage";

import { useSelector } from "react-redux";
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

  const companyId = useSelector((state) => state.company.companyId);
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
        },
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
            className={index % 2 === 0 ? "" : "rounded-sm bg-gray-50"}
          >
            <td className="py-2 text-center text-sm">{index + 1}</td>
            <td className="py-2 pl-10 text-sm font-semibold">
              {loanType?.name}
            </td>
            <td className="py-2 text-center text-sm">
              {loanType.interestRate}
            </td>

            <td className="py-2 text-center text-sm">
              {loanType?.maxLoanAmount}
            </td>

            <td className="py-2 text-sm">
              <div
                className="grid cursor-pointer place-items-center"
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
          <h2 className="pb-2 text-lg font-semibold">Loan Types </h2>
        </div>
      </div>

      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
        <div className="mb-4 flex flex-wrap justify-between">
          <div className="text-base font-medium">
            {/* {companies && companies?.length} Company Available for Now */}
          </div>
          <div>
            <Link
              onClick={() => setIsPopupOpen(true)}
              className="rounded-[3px] bg-[#3686FF] px-5 py-2 text-white transition hover:bg-[#7f39f0]"
            >
              Add Loan Type
            </Link>
          </div>
        </div>

        <div>
          <table className="h-auto w-full">
            {!isError && (
              <thead className="mt-8 border-b border-slate-200 text-left">
                <tr>
                  <th className="pb-2 text-center text-base">SL</th>
                  <th className="pb-2 pl-10 text-base">Name</th>
                  <th className="pb-2 text-center text-base">Interest Rate</th>
                  <th className="pb-2 text-center text-base">Max Amount</th>

                  <th className="pb-2 text-center text-base">Update</th>
                  <th className="pb-2 text-center text-base">Delete</th>
                </tr>
              </thead>
            )}

            <tbody>{content}</tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
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
