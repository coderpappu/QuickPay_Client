import { Link } from "react-router-dom";
import { useGetCompanyIdQuery } from "../features/api";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
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
                  activeMenu === "companySettings" && `bg-[#6D28D9] text-white`
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
              </div>
            )}

            {/* Manage Users menu */}
            <Link to="/manage/users">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer ${
                  activeMenu === "manageUsers" && `bg-[#6D28D9] text-white`
                }`}
                onClick={() => handleMenuClick("manageUsers")}
              >
                Manage Users
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
