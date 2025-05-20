import { useEffect, useRef, useState } from "react";
import { CiBellOn, CiDark, CiLight } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoIosPower } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ManProfile from "../assets/man-placeholder.jpg";
import { useGetbrandQuery, useGetUserQuery } from "../features/api";

const Header = ({ darkModeHandler, darkMode }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data: userData, isLoading, isError } = useGetUserQuery();

  const companyId = useSelector((state) => state.company.companyId);

  const { data: brandDetails } = useGetbrandQuery(companyId);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#fff] py-2 xl:px-6 dark:bg-dark-card">
      <div className="flex flex-wrap items-center justify-between lg:wrapper-container xl:w-full">
        {/* Product Brand Logo  */}
        <div className="w-[80%]">
          <h2 className="font-poppins text-2xl font-semibold text-[#0E1A34] dark:text-white">
            {brandDetails?.data?.titleText || "Your Company Name"}
          </h2>
        </div>

        {/* Company Name  */}

        <div className="align-center flex w-[20%] flex-wrap justify-end">
          <div className="mr-2 flex h-[40px] w-[40px] flex-col items-center rounded-md bg-[#e9e9e961] dark:bg-dark-box dark:text-white">
            {darkMode ? (
              <CiLight
                size={20}
                className="m-auto cursor-pointer"
                onClick={() => darkModeHandler()}
              />
            ) : (
              <CiDark
                size={20}
                className="m-auto cursor-pointer"
                onClick={() => darkModeHandler()}
              />
            )}
          </div>
          <div className="mr-2 flex h-[40px] w-[40px] flex-col items-center rounded-md bg-[#e9e9e961] dark:bg-dark-box">
            <CiBellOn className="m-auto text-2xl text-[#0E1A34] dark:text-white" />
          </div>
          <div className="mr-2 flex h-[40px] w-[40px] flex-col items-center rounded-md bg-[#e9e9e961] dark:bg-dark-box">
            <IoChatbubbleOutline className="m-auto text-2xl text-[#0E1A34] dark:text-white" />
          </div>
          <div className="relative" ref={dropdownRef}>
            {/* profile here  */}

            <div className="flex flex-wrap items-center">
              <img
                src={userData?.data?.file || ManProfile}
                alt="Avatar "
                className="h-[40px] w-[40px] rounded-full border border-[#0E1A34]"
              />

              <label className="ml-1 font-medium text-[#0E1A34] dark:text-white">
                {userData?.data?.first_name ||
                  userData?.data?.name.split(" ")[0]}
              </label>
              <MdOutlineKeyboardArrowDown
                className="cursor-pointer text-xl text-[#0E1A34] dark:text-white"
                onClick={handleToggle}
              />
            </div>
            {show && (
              <div className="absolute right-0 top-14 h-[100px] w-[150px] rounded-md bg-[#ffffff] p-2 dark:bg-dark-card">
                <div className="flex flex-wrap gap-2 rounded-md px-2 py-2 hover:bg-[#EFF0F2] hover:dark:bg-dark-box">
                  <FiUser className="dark:text-white" />
                  {userData?.data?.type == "employee" ? (
                    <Link
                      to="employee/profile"
                      className="text-sm font-medium dark:text-white"
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      className="text-sm font-medium dark:text-white"
                    >
                      Profile
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 rounded-md px-2 py-2 hover:bg-[#EFF0F2] dark:text-white hover:dark:bg-dark-box">
                  <IoIosPower />
                  <Link className="text-sm font-medium" onClick={handleLogOut}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
