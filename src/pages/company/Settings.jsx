import React, { useState } from "react";
import Button from "../../components/company/Button";

const Settings = () => {
  const [selected, setSelected] = useState("1");
  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };
  return (
    <div>
      <div className="border-b border-[#e6e6e6] pb-2">
        {" "}
        <h2 className="text-[26px] font-poppins font-bold">Settings</h2>
        <p className="text-base text-[#747474] font-medium mt-1">
          Manage your account setting and preferences.
        </p>
      </div>
      <div>
        <div className="w-full my-2  rounded-sm bg-[#fff] flex flex-wrap  ">
          <Button
            buttonid="1"
            isActive={selected == "1"}
            handleSelect={() => handleSelect("1")}
            title={"Employee"}
          />
          <Button
            buttonid="2"
            isActive={selected == "2"}
            handleSelect={() => handleSelect("2")}
            title={"Billings"}
          />
          <Button
            buttonid="3"
            isActive={selected == "3"}
            handleSelect={() => handleSelect("3")}
            title={"Email"}
          />
          <Button
            buttonid="4"
            isActive={selected == "4"}
            handleSelect={() => handleSelect("4")}
            title={"Info"}
          />
        </div>
        {selected == "1" && (
          <div>
            <div className="w-full mt-2  border-solid border-[1px] border-slate-200 bg-white rounded-md p-5  ">
              <div className="w-[250px] h-[60px] mb-6 flex flex-wrap items-center justify-between">
                <h1>Over Time : </h1>

                <input type="checkbox" className="w-4 h-4" />

                <input
                  type="number"
                  placeholder="100"
                  value="100"
                  className="w-[100px] h-7 p-[2px] bg-[#e7ecff] rounded-sm text-center"
                />
              </div>

              <butto className="py-2 px-10 bg-[#6D28D9] rounded-[4px] text-white mt-6">
                Save
              </butto>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
