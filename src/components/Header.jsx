import React, { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ProfilePalceholderImg from "../assets/profile-placeholder.png";
import { useGetUserQuery } from "../features/api";

const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserQuery();

  const handleToggle = () => {
    setShow(!show);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company_id");

    let checkToken = localStorage.getItem("token");

    useEffect(() => {
      if (!checkToken) {
        navigate("/login");
      } else {
        return;
      }
    }, [checkToken]);
  };
  return (
    <div className="bg-[#fff] w-full py-2 xl:px-6">
      <div className="lg:wrapper-container xl:w-full flex flex-wrap items-center justify-between ">
        {/* Product Brand Logo  */}
        <div className="w-[80%]">{/* <Logo /> */}</div>

        {/* Company Name  */}
        {/* <div className="w-[40%] text-center">
            <h2 className="font-semibold text-2xl text-[#fff] font-sans">
              Xceed Bangladesh LTD
            </h2>
          </div> */}
        <div className="w-[20%] flex flex-wrap align-center justify-end">
          <div className="w-[40px] h-[40px] flex flex-col items-center rounded-md bg-[#e9e9e961] mr-2">
            <CiBellOn className="text-2xl text-[#0E1A34] m-auto" />
          </div>
          <div className="w-[40px] h-[40px] flex flex-col items-center rounded-md bg-[#e9e9e961] mr-2">
            <IoChatbubbleOutline className="text-2xl text-[#0E1A34] m-auto" />
          </div>
          <div className="relative">
            {/* profile here  */}

            <div className="flex flex-wrap items-center ">
              <img
                src={userData?.data?.file || ProfilePalceholderImg}
                alt="Avatar "
                className="w-[40px] h-[40px] rounded-full border border-[#0E1A34]"
              />

              <label className="ml-1 font-medium text-[#0E1A34]">
                {userData?.data?.first_name}
              </label>
              <MdOutlineKeyboardArrowDown
                className="text-[#0E1A34] text-xl cursor-pointer"
                onClick={handleToggle}
              />
            </div>
            {show && (
              <div className="absolute w-[150px] h-[100px] p-2 rounded-sm bg-[#30414e] border-2 top-11 right-0">
                {userData?.data?.type == "employee" ? (
                  <Link to="employee/details" className="font-medium text-sm">
                    My Profile
                  </Link>
                ) : (
                  <Link to="/profile" className="font-medium text-sm">
                    My Profile
                  </Link>
                )}
                <br />
                <Link className="font-medium text-sm"> Setting</Link>
                <br />
                <Link className="font-medium text-sm" onClick={handleLogOut}>
                  Logout
                </Link>
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
