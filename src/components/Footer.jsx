import React, { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ProfilePalceholderImg from "../assets/profile-placeholder.png";
import ManProfile from "../assets/man-placeholder.jpg";
import { useGetUserQuery } from "../features/api";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoIosPower } from "react-icons/io";

const Footer = () => {
  return (
    <div className="border-[#fff] border-t dark:border-dark-card w-full py-2 xl:px-6">
      <div className="lg:wrapper-container xl:w-full flex flex-wrap items-center justify-between ">
        {/* Product Brand Logo  */}
        <div className="w-[80%]">
          <h2 className=" text-sm text-[#0E1A34] dark:text-dark-text-color font-poppins">
            © 2024 Aluxt ERP
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
