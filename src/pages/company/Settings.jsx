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

  console.log(setting);

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
        <h2 className="font-poppins text-[26px] font-bold">Settings</h2>
        <p className="mt-1 text-base font-medium text-[#747474]">
          Manage your account setting and preferences.
        </p>
      </div>
      <div>
        <div className="my-2 flex w-full flex-wrap rounded-sm bg-[#fff]">
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
            <div className="mt-2 w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5">
              <div className="mb-6 flex h-[60px] w-[280px] flex-wrap items-center justify-between">
                <h1>Over Time :</h1>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={overtime.enabled}
                  onChange={handleCheckboxChange}
                />
                <input
                  type="number"
                  placeholder="100"
                  value={overtime.minutes}
                  onChange={handleInputChange}
                  className="h-7 w-[100px] rounded-sm bg-[#e7ecff] p-[2px] text-center"
                />{" "}
                Miniute
              </div>

              <button
                className="mt-6 rounded-[4px] bg-[#3686FF] px-10 py-2 text-white"
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
