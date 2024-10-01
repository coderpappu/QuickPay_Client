import React from "react";
import BrandCardWrapper from "./BrandCardWrapper";
import SettingCardHeader from "./SettingCardHeader";
import SettingCardFooter from "./SettingCardFooter";
import SwitchCard from "./SwitchCard";
const NotificationCard = () => {
  return (
    <BrandCardWrapper>
      {/* setting card heading  */}
      <SettingCardHeader
        title="Brand Settings"
        subTitle="Edit your brand details"
      />

      <div className="px-6 py-3">
        <div className="flex justify-between items-center my-2">
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
          <div className="w-[32%]">
            <SwitchCard title=" Customer Invoice Sent" />
          </div>
        </div>
      </div>

      <SettingCardFooter title="Save" />
    </BrandCardWrapper>
  );
};

export default NotificationCard;
