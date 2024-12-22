import React, { useState } from "react";
import toast from "react-hot-toast";
import BrandCardWrapper from "../../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../../components/company/SettingCardHeader";
import {
  useDeleteHolidayMutation,
  useGetCompanyIdQuery,
  useGetHolidayListQuery,
} from "../../../features/api";

import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ListSkeleton from "../../../skeletons/ListSkeleton";
import ErrorMessage from "../../../utils/ErrorMessage";
import HolidayFormPopup from "./HolidayForm";
const HolidayList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);
  const { data: companyId } = useGetCompanyIdQuery();
  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedHolidayId(id);
  };

  const [deleteHoliday] = useDeleteHolidayMutation();

  const handleDeleteWeekend = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteHoliday(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Holiday deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete holiday");
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
    data: holidays,
    isLoading,
    isError,
    error,
  } = useGetHolidayListQuery(companyId, {
    skip: companyId == null,
  });

  let content;

  if (isLoading && !isError) content = <ListSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && holidays?.data?.holidays)
    content = holidays?.data?.holidays?.map((holiday, index) => (
      <div
        key={holiday?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[15%] dark:text-white">
          <h3>{holiday?.name}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{holiday?.HolidayType?.name}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{holiday?.from_date}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{holiday?.to_date}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{holiday?.description}</h3>
        </div>

        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* delete button  */}
            <div
              className="m-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center"
              onClick={() => handleDeleteWeekend(holiday?.id)}
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
        <HrmSetupCardHeader title="Holidays" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[15%] dark:text-white">
              <h3>Name</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Type</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>From</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>To</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Description</h3>
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
                  Holiday
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <HolidayFormPopup
                  holidayId={selectedHolidayId}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </div>
  );
};

export default HolidayList;
