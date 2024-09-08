import { Link } from "react-router-dom";
import { useGetCompanyIdQuery, useGetUserQuery } from "../features/api";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiCalendarCheckLight } from "react-icons/pi";
import { BiCheckShield } from "react-icons/bi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { RxCalendar } from "react-icons/rx";
const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeSubMain, setActiveSubMain] = useState(null);
  const { data } = useGetUserQuery();

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
      setActiveSubMenu(null); // Reset submenu when a new menu is selected
    } // Reset submenu when a new menu is selected
  };

  const handleSubMainClick = (menu) => {
    if (activeSubMain === menu) {
      setActiveSubMain(null);
    } else {
      setActiveSubMain(menu);
      setActiveSubMenu(null); // Reset submenu when a new menu is selected
    } // Reset submenu when a new menu is selected
  };

  const handleSubMenuClick = (subMenu) => {
    setActiveSubMenu(subMenu);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="bg-[#d6deff] shadow-inner text-black w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">XCEED Bangladesh</h2>
          {data?.data?.type === "employee" ? (
            <ul className="mt-4">
              <Link to="/company/calendar">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center  ${
                    activeMenu === "calendar" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("calendar")}
                >
                  <RxCalendar size={20} className="mr-1" />
                  Company Calendar
                </li>
              </Link>
              <Link to="#">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                    activeMenu === "Attendance" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("Attendance")}
                >
                  <BiCheckShield className="mr-1" size={21} />
                  Attendance
                </li>
              </Link>
              <Link to="/employee/leave">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                    activeMenu === "Apply" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("Apply")}
                >
                  <BsBoxArrowInUpRight size={18} className="mr-1" />
                  Leave
                </li>
              </Link>
              <Link to="/employee/details">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                    activeMenu === "profile" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("profile")}
                >
                  Profile
                </li>
              </Link>

              {/* {activeMenu === "calendar" && (
                <div className="ml-3">
                  
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "calendarShow" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("calendarShow")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Calendar
                    </li>
                  </Link>
                </div>
              )} */}

              {/* <Link to="/employee/details">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                    activeSubMenu === "employees" && "text-[#6D28D9]"
                  }`}
                  onClick={() => handleSubMenuClick("employees")}
                >
                  <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                  Employees
                </li>
              </Link> */}
            </ul>
          ) : (
            <ul className="mt-4">
              <Link to="/company/list">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer ${
                    activeMenu === "manageCompany" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("manageCompany")}
                >
                  Manage Company
                </li>
              </Link>
              {companyId && (
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center justify-between ${
                    activeMenu === "dashboard" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("dashboard")}
                >
                  Dashboard
                  <IoIosArrowForward
                    className={`ml-2 transition-all ${
                      activeMenu === "dashboard" ? "rotate-90" : ""
                    }`}
                  />
                </li>
              )}
              {activeMenu === "dashboard" && (
                <div className="ml-3">
                  <Link to="/">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "attendance" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("attendance")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Admin Dashboard
                    </li>
                  </Link>{" "}
                </div>
              )}

              {/* Attendance menu */}
              {companyId && (
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center justify-between ${
                    activeMenu === "attendance" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("attendance")}
                >
                  Attendance
                  <IoIosArrowForward
                    className={`ml-2 transition-all ${
                      activeMenu === "attendance" ? "rotate-90" : ""
                    }`}
                  />
                </li>
              )}
              {activeMenu === "attendance" && (
                <div className="ml-3">
                  <Link to="/employee/attendence">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "attendance" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("attendance")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Attendance
                    </li>
                  </Link>
                  <Link to="/employee/attendences">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "attendanceList" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("attendanceList")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Attendance List
                    </li>
                  </Link>
                </div>
              )}
              {/* Company Settings menu */}
              {companyId && (
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center justify-between ${
                    activeMenu === "calendar" && `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("calendar")}
                >
                  Calendar System
                  <IoIosArrowForward
                    className={`ml-2 transition-all ${
                      activeMenu === "calendar" ? "rotate-90" : ""
                    }`}
                  />
                </li>
              )}

              {activeMenu === "calendar" && (
                <div className="ml-3">
                  <Link to="/company/weekend">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "weekend" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("weekend")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Weekend
                    </li>
                  </Link>
                  <Link to="/holiday">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "holiday" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("holiday")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Holiday
                    </li>
                  </Link>

                  <Link to="/company/calendar">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "calendarShow" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("calendarShow")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Calendar
                    </li>
                  </Link>
                </div>
              )}

              {/* Company Settings menu */}
              {companyId && (
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center justify-between ${
                    activeMenu === "leaveManagement" &&
                    `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("leaveManagement")}
                >
                  Leave Management
                  <IoIosArrowForward
                    className={`ml-2 transition-all ${
                      activeMenu === "leaveManagement" ? "rotate-90" : ""
                    }`}
                  />
                </li>
              )}

              {activeMenu === "leaveManagement" && (
                <>
                  <div className="ml-3">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all   cursor-pointer flex flex-wrap items-center justify-between `}
                      onClick={() => handleSubMainClick("leavesetup")}
                    >
                      Setup
                      <IoIosArrowForward
                        className={`ml-2 transition-all ${
                          activeSubMain === "leavesetup" ? "rotate-90" : ""
                        }`}
                      />
                    </li>
                    {activeSubMain === "leavesetup" && (
                      <div className="ml-2">
                        <Link to="company/leave/type">
                          <li
                            className={`py-1 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                              activeSubMenu === "leaveType" && "text-[#6D28D9]"
                            }`}
                            onClick={() => handleSubMenuClick("leaveType")}
                          >
                            <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                            Leave Type
                          </li>
                        </Link>
                        <Link to="/company/leave">
                          <li
                            className={`py-1 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                              activeSubMenu === "earnLeave" && "text-[#6D28D9]"
                            }`}
                            onClick={() => handleSubMenuClick("earnLeave")}
                          >
                            <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                            Earn Leave
                          </li>
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="ml-3">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all   cursor-pointer flex flex-wrap items-center justify-between `}
                      onClick={() => handleSubMainClick("leaveApplication")}
                    >
                      Leave Applicaion
                      <IoIosArrowForward
                        className={`ml-2 transition-all ${
                          activeSubMain === "leaveApplication"
                            ? "rotate-90"
                            : ""
                        }`}
                      />
                    </li>
                    {activeSubMain === "leaveApplication" && (
                      <div className="ml-2">
                        <Link to="company/leave/application">
                          <li
                            className={`py-1 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                              activeSubMenu === "leaveApplication" &&
                              "text-[#6D28D9]"
                            }`}
                            onClick={() =>
                              handleSubMenuClick("leaveApplication")
                            }
                          >
                            <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                            Leave Applications
                          </li>
                        </Link>
                        <Link to="/company/leave">
                          <li
                            className={`py-1 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                              activeSubMenu === "earnLeave" && "text-[#6D28D9]"
                            }`}
                            onClick={() => handleSubMenuClick("earnLeave")}
                          >
                            <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                            Earn Leave
                          </li>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}

              {companyId && (
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer flex flex-wrap items-center justify-between ${
                    activeMenu === "companySettings" &&
                    `bg-[#6D28D9] text-white`
                  }`}
                  onClick={() => handleMenuClick("companySettings")}
                >
                  Company Settings
                  <IoIosArrowForward
                    className={`ml-2 transition-all ${
                      activeMenu === "companySettings" ? "rotate-90" : ""
                    }`}
                  />
                </li>
              )}

              {activeMenu === "companySettings" && (
                <div className="ml-3">
                  <Link to="/company/shift/list">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "shift" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("shift")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Schedule
                    </li>
                  </Link>
                  <Link to="/department/list">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "department" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("department")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Department
                    </li>
                  </Link>
                  <Link to="/designation/list">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "designation" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("designation")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Designation
                    </li>
                  </Link>
                  <Link to="/section/list">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "section" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("section")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Section
                    </li>
                  </Link>

                  <Link to="/company/employee">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "employees" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("employees")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Employees
                    </li>
                  </Link>

                  <Link to="/company/settings">
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#6D28D9] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "setting" && "text-[#6D28D9]"
                      }`}
                      onClick={() => handleSubMenuClick("setting")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#6D28D9] rounded-full mr-2"></div>
                      Settings
                    </li>
                  </Link>
                </div>
              )}

              {/* Manage Users menu */}
              {/* <Link to="/manage/users">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer ${
                  activeMenu === "manageUsers" && `bg-[#6D28D9] text-white`
                }`}
                onClick={() => handleMenuClick("manageUsers")}
              >
                Manage Users
              </li>
            </Link> */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
