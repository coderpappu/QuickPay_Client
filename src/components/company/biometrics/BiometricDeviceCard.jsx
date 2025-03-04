import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDeviceConfigureMutation,
  useGetCompanyIdQuery,
  useGetDeviceListQuery,
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
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectedDeviceId(id);
  };

  const { data: companyId } = useGetCompanyIdQuery();
  const [deleteDepartment] = useDeleteDeviceConfigureMutation();

  const {
    data: deviceList,
    isLoading,
    isError,
    error,
  } = useGetDeviceListQuery(companyId);

  const handleDeleteDevice = async (id) => {
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
                    toast.success("Device deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete device");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Device"
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

  if (!isLoading && !isError && deviceList?.data?.length == 0)
    content = <ErrorMessage message="Please add your device!" />;

  if (!isLoading && !isError && deviceList?.data?.length > 0) {
    content = deviceList.data.map((device) =>
      device?.configMethod === "IP" ? (
        <div
          key={device?.id}
          className="my-3 flex w-full flex-wrap items-center justify-between border border-dark-border-color px-3 py-4 text-[13px] dark:border-opacity-10"
        >
          <div className="w-[20%] dark:text-white">
            <h2 className="text-sm leading-7 dark:text-dark-text-color">
              Device Name
            </h2>
            <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
              <h2>{device?.name}</h2>
            </div>
          </div>

          <div className="w-[15%] dark:text-white">
            <h2 className="text-sm leading-7 dark:text-dark-text-color">
              Method
            </h2>
            <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
              <h3>{device?.configMethod}</h3>
            </div>
          </div>
          <div className="w-[25%] dark:text-white">
            <h2 className="text-sm leading-7 dark:text-dark-text-color">
              IP Address
            </h2>
            <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
              <h3>{device?.ipAddress}</h3>
            </div>
          </div>
          <div className="w-[15%] dark:text-white">
            <h2 className="text-sm leading-7 dark:text-dark-text-color">
              PORT
            </h2>
            <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
              <h3>{device?.port}</h3>
            </div>
          </div>

          <div className="w-[15%] dark:text-white">
            <div className="flex flex-wrap justify-start gap-2">
              {/* edit button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-green-400 p-2">
                <CiEdit size={20} onClick={() => handleOpen(device?.id)} />
              </div>

              {/* delete button  */}
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500 p-2 text-center"
                onClick={() => handleDeleteDevice(device?.id)}
              >
                <AiOutlineDelete size={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          key={device?.id}
          className="my-3 flex w-full flex-wrap items-center justify-between border border-dark-border-color px-3 py-4 text-[13px] dark:border-opacity-10"
        >
          <div className="my-2 flex w-full flex-wrap justify-between gap-4">
            <div className="w-[20%] dark:text-white">
              <h2 className="text-sm leading-7 dark:text-dark-text-color">
                Device Name
              </h2>
              <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
                <h2>{device?.name}</h2>
              </div>
            </div>

            <div className="w-[25%] dark:text-white">
              <h2 className="text-sm leading-7 dark:text-dark-text-color">
                Method
              </h2>
              <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
                <h3>{device?.configMethod}</h3>
              </div>
            </div>
            <div className="w-[15%] dark:text-white">
              <h2 className="text-sm leading-7 dark:text-dark-text-color">
                Username
              </h2>
              <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
                <h3>{device?.username}</h3>
              </div>
            </div>

            <div className="flex w-[20%] flex-wrap justify-end gap-2 dark:text-white">
              {/* edit button  */}
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-green-400 p-2">
                <CiEdit size={20} onClick={() => handleOpen(device?.id)} />
              </div>

              {/* delete button  */}
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-500 p-2 text-center"
                onClick={() => handleDeleteDevice(device?.id)}
              >
                <AiOutlineDelete size={20} />
              </div>
            </div>
          </div>
          <div className="my-2 flex w-full flex-wrap justify-start gap-6">
            <div className="w-[100%] dark:text-white">
              <h2 className="text-sm leading-7 dark:text-dark-text-color">
                API URL
              </h2>
              <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-2 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
                <h3>{device?.apiUrl}</h3>
              </div>
            </div>
          </div>

          <div className="my-2 flex w-full flex-wrap justify-start gap-6">
            <div className="w-[100%] dark:text-white">
              <h2 className="text-sm leading-7 dark:text-dark-text-color">
                Auth Token
              </h2>
              <div className="w-full rounded-md border border-dark-box border-opacity-5 px-2 py-5 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box dark:text-dark-text-color">
                <h3>{device?.authKey}</h3>
              </div>
            </div>
          </div>
        </div>
      ),
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader title="Devices" handleOpen={handleOpen} />
        <div className="px-6 py-3">
          {/* header  */}

          {/* body  */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Device
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <DeviceForm
                  deviceId={selectedDeviceId}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default BiometricsDeviceCard;
