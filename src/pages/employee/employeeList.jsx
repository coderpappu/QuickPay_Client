import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";

import {
  useDeleteEmployeeMutation,
  useGetCompanyIdQuery,
  useGetEmployeesQuery,
  useSetCompanyIdMutation,
} from "../../features/api";

import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

import toast from "react-hot-toast";

import { useState } from "react";
import { Link } from "react-router-dom";

const LeaveCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [leaveTypeId, setleaveTypeId] = useState(null);

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setleaveTypeId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [setCompanyId] = useSetCompanyIdMutation();

  const {
    data: employeesData,
    isLoading,
    isError,
    error,
  } = useGetEmployeesQuery(companyId);

  const handleDeleteEmployee = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteEmployee(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Employee deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete employee");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="employee account"
          />
        ),
        {
          duration: Infinity,
        }
      );

    confirm();
  };

  let content;
  if (isLoading && !isError) return <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;
  let employees;
  if (!isLoading && !isError) {
    employees = employeesData?.data;
    content = (
      <>
        {employees?.map((employee, index) => (
          <>
            <div
              key={employee?.id}
              className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
            >
              <div className="dark:text-white w-[5%]">
                <h3>{++index}</h3>
              </div>
              <div className="dark:text-white w-[15%]">
                <Link to={`/company/employee/details/${employee?.id}`}>
                  <div className="w-[60%] px-2 py-2 hover:bg-button-bg hover:text-white transition-all duration-150 border border-dark-heading-color text-dark-heading-color rounded-md text-center">
                    <h3>{employee?.employeeId}</h3>
                  </div>
                </Link>
              </div>

              <div className="dark:text-white w-[20%]">
                <h3>{employee?.name}</h3>
              </div>

              <div className="dark:text-white w-[15%]">
                <h3>{employee?.EmployeeDepartment?.[0]?.department?.name}</h3>
              </div>

              <div className="dark:text-white w-[15%]">
                <h3>{employee?.EmployeeDesignation[0]?.designation?.name}</h3>
              </div>

              <div className="dark:text-white w-[15%]">
                <h3>{employee?.EmployeeSection?.[0]?.section?.name}</h3>
              </div>
              <div className="dark:text-white w-[10%]">
                <div className="flex flex-wrap justify-start gap-2">
                  {/* edit button  */}
                  <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
                    <Link to={`/company/employee/update/${employee?.id}`}>
                      <CiEdit size={20} />
                    </Link>
                  </div>

                  {/* delete button  */}
                  <div
                    onClick={() => handleDeleteEmployee(employee?.id)}
                    className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
                  >
                    <AiOutlineDelete size={20} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <div className="flex justify-between items-center border-b border-dark-box border-opacity-5 dark:border-dark-border-color dark:border-opacity-5 px-6 py-4">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              Employee List
            </h3>
            {/* <p className="text-xs text-light-text-color">{subTitle}</p> */}
          </div>

          <div
            className="w-8 h-8 bg-green-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            onClick={() => handleOpen()}
          >
            <Link to="/company/employee/registration">
              <IoAdd color="#fff" />
            </Link>
          </div>
        </div>
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Employee ID</h3>
            </div>
            <div className="dark:text-white w-[20%]">
              <h3>Name</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Department</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Designation</h3>
            </div>

            <div className="dark:text-white w-[15%]">
              <h3>Section</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>
        {/* {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card  rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Designation
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <LeaveTypeForm
                  leaveTypeId={leaveTypeId}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </div>
            </div>
          </div>
        )} */}
      </BrandCardWrapper>
    </>
  );
};

export default LeaveCard;
