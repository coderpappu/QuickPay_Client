import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteShiftMutation,
  useGetShiftListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import ErrorMessage from "../../../utils/ErrorMessage";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../company/SettingCardHeader";

import { useSelector } from "react-redux";
import CardSkeleton from "../../../skeletons/card";
import formatTimeTo12Hour from "../../../utils/timeConverter";
import ShiftForm from "./ShiftForm";
const ShiftCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectShiftId, setSelectShiftId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectShiftId(id);
  };

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteShift] = useDeleteShiftMutation();

  const {
    data: shiftList,
    isLoading,
    isError,
    error,
  } = useGetShiftListQuery(companyId);

  const handleDeleteShift = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteShift({ shiftId: id, company_Id: companyId }).then(
                  (res) => {
                    if (res.error != null) {
                      toast.error(res.error.data.message);
                    } else {
                      toast.success("Shift deleted successfully");
                    }
                  },
                );
              } catch (error) {
                toast.error(error.message || "Failed to delete shift");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Shift"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };
  let content;

  if (isLoading && !isError) return <CardSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError && shiftList?.data)
    content = shiftList?.data?.map((shift) => (
      <div
        key={shift?.id}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[20%] dark:text-white">
          <h3>{shift?.name}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{formatTimeTo12Hour(shift?.start_time)}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{formatTimeTo12Hour(shift?.end_time)}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <h3>{formatTimeTo12Hour(shift?.late_time_count)}</h3>
        </div>

        <div className="w-[15%] dark:text-white">
          <h3>{formatTimeTo12Hour(shift?.early_out_count)}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
              <CiEdit size={20} onClick={() => handleOpen(shift?.id)} />
            </div>

            {/* delete button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteShift(shift?.id)}
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
          title="Shift"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Name</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Start Time</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>End Time</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Late Time</h3>
            </div>

            <div className="w-[15%] dark:text-white">
              <h3>Early out Time</h3>
            </div>

            <div className="w-[15%] dark:text-white">
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
                  Shift
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <ShiftForm shiftId={selectShiftId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default ShiftCard;
