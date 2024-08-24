import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ProfileImg from "../assets/avatar1.jpg";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PopUp from "../components/PopUp";
import StatusCard from "../components/dashboard/StatusCard";
import { AiOutlineSlack } from "react-icons/ai";
import { BiFingerprint } from "react-icons/bi";
import { FcBriefcase } from "react-icons/fc";
// employee icon
import { FcNightLandscape } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";

const Home = () => {
  return (
    <div className="">
      {/* <h1 className="text-6xl text-[#6D28D9] font-bold text-center">
        QuickPay
      </h1> */}

      <PopUp />

      <div className="mb-2">
        <h4 className="text-xl font-bold ">Welcome to QuickPay</h4>
      </div>

      <div className="flex flex-wrap items-center justify-start">
        {/* show card  */}
        <StatusCard
          title={"Employee"}
          count={100}
          percentage={12}
          icon={FcBriefcase}
          color={"#ddd"}
        />
        <StatusCard
          title={"Shift"}
          count={"02"}
          percentage={12}
          icon={FcNightLandscape}
          color={"#E4669D"}
        />
        <StatusCard
          title={"Attendance"}
          count={80}
          percentage={12}
          icon={FcVoicePresentation}
          color={"#E4669D"}
        />
      </div>
    </div>
  );
};

export default Home;
