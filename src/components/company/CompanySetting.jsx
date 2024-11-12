import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetCompanyIdQuery,
  useGetRootSettingQuery,
  useSetSettingMutation,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";

const CompanySettingCard = () => {
  const [setSetting] = useSetSettingMutation();
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: setting } = useGetRootSettingQuery(companyId);

  const [selected, setSelected] = useState("1");

  const [overtime, setOvertime] = useState({
    overtime_status: false,
    overtime_min: "00", // Default value
  });

  // Handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  // Handle changes to the checkbox
  const handleCheckboxChange = (event) => {
    setOvertime((prevState) => ({
      ...prevState,
      overtime_status: event.target.checked,
    }));
  };

  // Handle changes to the input field
  const handleInputChange = (event) => {
    setOvertime((prevState) => ({
      ...prevState,
      overtime_min: event.target.value,
    }));
  };

  // Function to handle the save button click
  const settingHandler = async () => {
    if (overtime.overtime_status === true) {
      try {
        await setSetting({
          ...overtime,
          company_id: companyId,
          setting_id: setting?.data,
        });

        toast.success("Employee Setting Set Successfully");
      } catch (error) {
        toast.error("Failed to set employee settings");
      }
    }
    // Add your logic to save the settings
  };

  return (
    <BrandCardWrapper>
      <SettingCardHeader
        title="Company Settings"
        subTitle="Edit your company settings"
      />
      <div className="px-6 py-3 dark:text-dark-text-color">
        <div className="w-[280px] h-[60px] mb-6 flex flex-wrap items-center justify-between">
          <h1 className="dark:text-dark-text-color">Over Time :</h1>
          <input
            type="checkbox"
            className="w-4 h-4 dark:bg-dark-box"
            checked={overtime.enabled}
            onChange={handleCheckboxChange}
          />
          <input
            type="number"
            placeholder="100"
            value={overtime.minutes}
            onChange={handleInputChange}
            className="w-[100px] h-7 p-[2px] bg-[#e7ecff]  dark:bg-dark-box dark:text-dark-text-color rounded-sm text-center"
          />
          Miniute
        </div>

        <SettingCardFooter title="Save" handleUpdate={settingHandler} />
      </div>
    </BrandCardWrapper>
  );
};

export default CompanySettingCard;
