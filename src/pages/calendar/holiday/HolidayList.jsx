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
        }
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

  if (!isLoading && !isError && holidays?.data)
    content = holidays?.data?.map((holiday, index) => (
      <div
        key={holiday?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[15%]">
          <h3>{holiday?.name}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <h3>{holiday?.HolidayType?.name}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <h3>{holiday?.from_date}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <h3>{holiday?.to_date}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <h3>{holiday?.description}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* delete button  */}
            <div
              className="w-8 h-8 bg-red-500 m-auto text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
              onClick={() => handleDeleteWeekend(holiday?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="w-[49%] ">
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Department" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[15%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Type</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>From</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>To</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Description</h3>
            </div>

            <div className="dark:text-white w-[15%] text-center">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body  */}
          {content}
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
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
