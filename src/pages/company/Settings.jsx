import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/company/Button";
import {
    useGetCompanyIdQuery,
    useGetRootSettingQuery,
    useSetSettingMutation,
} from "../../features/api";

const Settings = () => {
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
    <div>
      <div className="border-b border-[#e6e6e6] pb-2">
        <h2 className="text-[26px] font-poppins font-bold">Settings</h2>
        <p className="text-base text-[#747474] font-medium mt-1">
          Manage your account setting and preferences.
        </p>
      </div>
      <div>
        <div className="w-full my-2  rounded-sm bg-[#fff] flex flex-wrap">
          <Button
            buttonid="1"
            isActive={selected === "1"}
            handleSelect={() => handleSelect("1")}
            title={"Employee"}
          />
          <Button
            buttonid="2"
            isActive={selected === "2"}
            handleSelect={() => handleSelect("2")}
            title={"Billings"}
          />
          <Button
            buttonid="3"
            isActive={selected === "3"}
            handleSelect={() => handleSelect("3")}
            title={"Email"}
          />
          <Button
            buttonid="4"
            isActive={selected === "4"}
            handleSelect={() => handleSelect("4")}
            title={"Info"}
          />
        </div>
        {selected === "1" && (
          <div>
            <div className="w-full mt-2 border-solid border-[1px] border-slate-200 bg-white rounded-md p-5">
              <div className="w-[280px] h-[60px] mb-6 flex flex-wrap items-center justify-between">
                <h1>Over Time :</h1>
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={overtime.enabled}
                  onChange={handleCheckboxChange}
                />
                <input
                  type="number"
                  placeholder="100"
                  value={overtime.minutes}
                  onChange={handleInputChange}
                  className="w-[100px] h-7 p-[2px] bg-[#e7ecff] rounded-sm text-center"
                />{" "}
                Miniute
              </div>

              <button
                className="py-2 px-10 bg-[#3686FF] rounded-[4px] text-white mt-6"
                onClick={settingHandler}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
