import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeleteBonusTypeMutation,
  useGetBonusTypeListQuery,
} from "../../../features/api";
import ConfirmDialog from "../../../helpers/ConfirmDialog";
import BrandCardWrapper from "../../company/BrandCardWrapper";
import DelayPolicy from "./DelayPolicy";

const PolicyCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectBonusTypeId, setSelectBonusTypeId] = useState(null);
  const [activeSetting, setActiveSetting] = useState(1);

  const companyId = useSelector((state) => state.company.companyId);
  const [deleteBonusType] = useDeleteBonusTypeMutation();

  const {
    data: bonusTypeList,
    isLoading,
    isError,
    error,
  } = useGetBonusTypeListQuery(companyId);

  const handleActiveSettingId = (id) => {
    setActiveSetting(id);
  };

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectBonusTypeId(id);
  };

  const handleDeleteBonusType = async (bonusTypeId) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.bonusTypeId);
              try {
                deleteBonusType(bonusTypeId).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Bonus type deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete bonus type");
              }
            }}
            onCancel={() => toast.dismiss(t.bonusTypeId)}
            title="bonus type"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  const settings = [
    { id: 1, name: "Delay" },
    { id: 2, name: "Early Out" },
    { id: 3, name: "Extra Work" },
  ];

  return (
    <BrandCardWrapper>
      <div className="flex items-center justify-between border-b border-dark-box border-opacity-5 px-6 py-4 dark:border-dark-border-color dark:border-opacity-5">
        <h3 className="text-base leading-6 dark:text-dark-heading-color">
          Policy
        </h3>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 px-6 py-4">
        {settings.map((setting) => (
          <button
            key={setting.id}
            className={`rounded-sm px-5 py-2 text-sm transition duration-200 ${
              activeSetting === setting.id
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100 dark:bg-dark-box dark:text-white"
            }`}
            onClick={() => handleActiveSettingId(setting.id)}
          >
            {setting.name}
          </button>
        ))}
      </div>

      {/* Body Content */}
      <div className="px-6 py-3">
        {activeSetting === 1 && <DelayPolicy />}
        {activeSetting === 2 && <div>Early Out Policy Component</div>}
        {activeSetting === 3 && <div>Extra Work Policy Component</div>}
      </div>
    </BrandCardWrapper>
  );
};

export default PolicyCard;
