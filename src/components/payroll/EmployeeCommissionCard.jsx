import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useParams } from "react-router-dom";
import {
  useDeleteEmployeeCommissionMutation,
  useGetCompanyIdQuery,
  useGetEmployeeCommissionListQuery,
} from "../../features/api";

import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import ErrorMessage from "../../utils/ErrorMessage";
import BrandCardWrapper from "../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../company/SettingCardHeader";
import EmployeeCommissionForm from "./EmployeeCommissionForm";

const EmployeeCommissionCard = () => {
  const { id: employeeId } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectCommissionId, setSelectCommissionId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectCommissionId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteCommission] = useDeleteEmployeeCommissionMutation();

  const {
    data: employeeCommissionList,
    isLoading,
    isError,
    error,
  } = useGetEmployeeCommissionListQuery({ employeeId, companyId });

  const handleDeleteCommission = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteCommission(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Employee Commission deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete Commission");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Commission"
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && employeeCommissionList?.data)
    content = employeeCommissionList?.data?.map((commission) => (
      <div
        key={commission?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[20%]">
          <h3>{commission?.title} </h3>
        </div>
        <div className="dark:text-white w-[20%]">
          <h3>{commission?.type}</h3>
        </div>

        <div className="dark:text-white w-[20%]">
          <h3>{commission?.value}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="w-8 h-8 bg-indigo-600 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit size={20} onClick={() => handleOpen(commission?.id)} />
            </div>

            {/* delete button  */}
            <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteCommission(commission?.id)}
              />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Commission"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[20%]">
              <h3>Name</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Type</h3>
            </div>

            <div className="dark:text-white w-[20%]">
              <h3>Value</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card  rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Employee Commission
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <EmployeeCommissionForm
                  commissionId={selectCommissionId}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default EmployeeCommissionCard;