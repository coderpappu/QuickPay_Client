import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ProfileImg from "../assets/avatar1.jpg";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PopUp from "../components/PopUp";

const Home = () => {
  return (
    <div className="">
      <h1 className="text-6xl text-[#6D28D9] font-bold text-center">
        QuickPay
      </h1>

      <PopUp />

      <h4>Welcome to QuickPay</h4>
    </div>
  );
};

export default Home;
