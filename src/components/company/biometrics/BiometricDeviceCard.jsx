import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDepartmentMutation,
  useGetCompanyIdQuery,
  useGetDepartmentsQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import FormSkeleton from "../../../skeletons/FormSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../BrandCardWrapper";
import { HrmSetupCardHeader } from "../SettingCardHeader";
import DeviceForm from "./BiometricDeviceForm";

const BiometricsDeviceCard = () => {
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
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const {
    data: departmentList,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery(companyId);

  const handleDeleteDepartment = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteDepartment(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Department deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete department");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Department"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) return <FormSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && departmentList?.data)
    content = departmentList?.data?.map((department, index) => (
      <div
        key={department?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[35%] dark:text-white">
          <h3>{department?.name}</h3>
        </div>

        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-400 p-2">
              <CiEdit size={20} onClick={() => handleOpen(department?.id)} />
            </div>

            {/* delete button  */}
            <div
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center"
              onClick={() => handleDeleteDepartment(department?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Department" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[35%] dark:text-white">
              <h3>Department</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
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
                {/* <DepartmentForm
                  departmentId={selectedDepartmentId}
                  setIsPopupOpen={setIsPopupOpen}
                /> */}

                <DeviceForm />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default BiometricsDeviceCard;
