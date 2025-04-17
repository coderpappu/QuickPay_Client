import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useGetRootSettingQuery,
  useSetSettingMutation,
} from "../../features/api";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardFooter from "./SettingCardFooter";
import SettingCardHeader from "./SettingCardHeader";
const CompanySettingCard = () => {
  const [setSetting] = useSetSettingMutation();
  const companyId = useSelector((state) => state.company.companyId);
  const { data: setting, isLoading } = useGetRootSettingQuery(companyId);

  const [selected, setSelected] = useState("1");

  const [overtime, setOvertime] = useState({
    overtime_status: false,
    overtime_min: "00", // Default value
  });

  // Fetch the saved settings when the component mounts
  useEffect(() => {
    if (setting && setting.data) {
      setOvertime({
        overtime_status: setting.data.overtime_status,
        overtime_min: setting.data.overtime_min,
      });
    }
  }, [setting]);

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
    try {
      await setSetting({
        ...overtime,
        company_id: companyId,
        setting_id: setting?.data?.id || "1",
      });

      toast.success("Employee Setting Set Successfully");
    } catch (error) {
      toast.error("Failed to set employee settings");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrandCardWrapper>
      <SettingCardHeader
        title="Company Settings"
        subTitle="Edit your company settings"
      />
      <div className="px-6 py-3 dark:text-dark-text-color">
        <div className="mb-6 flex h-[60px] w-[280px] flex-wrap items-center justify-between">
          <h1 className="dark:text-dark-text-color">Over Time :</h1>
          <input
            type="checkbox"
            className="h-4 w-4 dark:bg-dark-box"
            checked={overtime.overtime_status}
            onChange={handleCheckboxChange}
          />
          <input
            type="number"
            placeholder="100"
            value={overtime.overtime_min}
            onChange={handleInputChange}
            className="h-7 w-[100px] rounded-sm bg-[#e7ecff] p-[2px] text-center dark:bg-dark-box dark:text-dark-text-color"
          />
          Minute
        </div>

        <SettingCardFooter title="Save" handleUpdate={settingHandler} />
      </div>
    </BrandCardWrapper>
  );
};

export default CompanySettingCard;
