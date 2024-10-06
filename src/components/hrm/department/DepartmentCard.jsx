import React from "react";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import SettingCardHeader, {
  HrmSetupCardHeader,
} from "../../company/SettingCardHeader";
import SettingCardFooter from "../../company/SettingCardFooter";
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
} from "../../../features/api";

import CardSkeleton from "../../skeletons/hrm-card-skeletons/card";
import ErrorMessage from "../../../utils/ErrorMessage";
import DepartmentForm from "./DepartmentForm";

const DepartmentCard = () => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedDepartmentId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteDeduction] = useDeleteDepartmentMutation();

  const {
    data: departmentList,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery(companyId);

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    return <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && departmentList?.data)
    return (
      <>
        <BrandCardWrapper>
          <HrmSetupCardHeader title="Department" handleOpen={handleOpen} />
          <div className="px-6 py-3">
            {/* header  */}
            <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
              <div className="dark:text-white w-[35%]">
                <h3>Department</h3>
              </div>

              <div className="dark:text-white w-[15%]">
                <h3>Actions</h3>
              </div>
            </div>

            {/* body  */}

            {departmentList?.data?.map((department, index) => (
              <div
                key={department?.id}
                className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
              >
                <div className="dark:text-white w-[35%]">
                  <h3>{department?.name}</h3>
                </div>

                <div className="dark:text-white w-[15%]">
                  <div className="flex flex-wrap justify-start gap-2">
                    {/* edit button  */}
                    <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                      <CiEdit
                        size={20}
                        onClick={() => handleOpen(department?.id)}
                      />
                    </div>

                    {/* delete button  */}
                    <div className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer">
                      <AiOutlineDelete size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">
                    Department
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => setIsPopupOpen(false)} // Close popup
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-4">
                  <DepartmentForm departmentId={selectedDepartmentId} />
                </div>
              </div>
            </div>
          )}
        </BrandCardWrapper>
      </>
    );
};

export default DepartmentCard;
