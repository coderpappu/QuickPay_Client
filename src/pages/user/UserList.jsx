import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";

import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

import toast from "react-hot-toast";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../../features/api";
import UserRegistration from "./UserRegistration";
import UserUpdate from "./UserUpdate";

const Users = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // State to manage popup visibility
  const [user, setUser] = useState(null);

  const handleOpen = (id) => {
    setIsPopupOpen(true);
  };
  const handleEditOpen = (data) => {
    setIsEditPopupOpen(true);
    setUser(data);
  };
  const onClose = () => {
    setIsPopupOpen(false);
  };
  const onEditClose = () => {
    setIsEditPopupOpen(false);
  };
  const { data: usersData, isLoading, isError, error } = useGetUsersQuery();
  const [userDelete] = useDeleteUserMutation();

  const handleUserDelete = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await userDelete(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("User deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete user");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="User account delete"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  let content;
  if (isLoading && !isError) return <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;
  let users;
  if (!isLoading && !isError) {
    users = usersData?.data;
    content = (
      <>
        {users?.map((user, index) => (
          <>
            <div
              key={user?.id}
              className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
            >
              <div className="w-[5%] dark:text-white">
                <h3>{++index}</h3>
              </div>
              <div className="w-[15%] dark:text-white">
                <Link to={`/company/employee/details/${user?.id}`}>
                  <div className="w-[60%] rounded-md border border-dark-heading-color px-2 py-2 text-center text-dark-heading-color transition-all duration-150 hover:bg-button-bg hover:text-white">
                    <h3>{user?.first_name + " " + user?.last_name}</h3>
                  </div>
                </Link>
              </div>

              <div className="w-[15%] dark:text-white">
                <h3>{user?.email}</h3>
              </div>
              <div className="w-[15%] dark:text-white">
                <h3>{user?.phone}</h3>
              </div>
              <div className="w-[15%] dark:text-white">
                <h3>{user?.type}</h3>
              </div>
              <div className="w-[10%] dark:text-white">
                <h3>{user?.status}</h3>
              </div>

              <div className="w-[10%] dark:text-white">
                <div className="flex flex-wrap justify-start gap-2">
                  {/* edit button  */}
                  <div
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-400 p-2"
                    onClick={() => handleEditOpen(user)}
                  >
                    <CiEdit size={20} />
                  </div>

                  {/* delete button  */}
                  <div
                    onClick={() => handleUserDelete(user?.id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center"
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
        <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
          <div>
            <h3 className="text-base leading-6 dark:text-dark-heading-color">
              User List
            </h3>
            {/* <p className="text-xs text-light-text-color">{subTitle}</p> */}
          </div>

          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-500 p-2 text-center"
            onClick={() => handleOpen()}
          >
            <IoAdd color="#fff" />
          </div>
        </div>
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[5%] dark:text-white">
              <h3>SL</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Department</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Employee ID</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Designation</h3>
            </div>

            <div className="w-[10%] dark:text-white">
              <h3>Status</h3>
            </div>
            <div className="w-[10%] dark:text-white">
              <h3>Action</h3>
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
                  Registration
                </h3>

                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <UserRegistration onClose={onClose} />
              </div>
            </div>
          </div>
        )}
        {isEditPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  User Account Update
                </h3>

                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsEditPopupOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <UserUpdate user={user} onClose={onEditClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default Users;
