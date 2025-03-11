import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  useDeleteTypeMutation,
  useGetTypeListQuery,
} from "../../../../features/api";

import { useSelector } from "react-redux";
import BrandCardWrapper from "../../../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../../../components/company/SettingCardHeader";
import ConfirmDialog from "../../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../../utils/ErrorMessage";
import TypeForm from "./TypeForm";

const TypeList = () => {
  const navigate = useNavigate();
  const companyId = useSelector((state) => state.company.companyId);
  const [deleteType] = useDeleteTypeMutation();

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedTypeId(id);
  };

  const handleDeleteType = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteType(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Type deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete type");
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

  const {
    data: types,
    isLoading,
    isError,
    error,
  } = useGetTypeListQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && types?.data)
    content = types?.data?.map((type, index) => (
      <div
        key={type?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[35%] dark:text-white">
          <h3>{type?.name}</h3>
        </div>

        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* delete button  */}
            <div
              className="m-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center"
              onClick={() => handleDeleteType(type?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="w-[49%]">
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Holiday Types" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[35%] dark:text-white">
              <h3>Title</h3>
            </div>

            <div className="w-[15%] text-center dark:text-white">
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
                  Holiday Type
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <TypeForm typeId={selectedTypeId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </div>
  );
};

export default TypeList;
