import { useState } from "react";
import { AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../components/Logo";
import { useGetCompanyIdQuery, useGetUserQuery } from "../features/api";
import { PiDotDuotone } from "react-icons/pi";
import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";
import { adminMenuItems } from "../utils/adminMenuList";
const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data } = useGetUserQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
    setActiveSubMenu(null); // Reset submenu when a new menu is clicked
  };

  const handleSubMenuClick = (index) => {
    setActiveSubMenu(index);
  };

  // Recursive function to render nested submenus
  const renderSubMenu = (subMenus) => {
    return (
      <ul className="pl-5 mt-2 space-y-2">
        {subMenus?.map((sub, subIndex) => (
          <li key={subIndex}>
            {sub.subMenu ? (
              <>
                {/* Handle nested submenu */}
                <button
                  onClick={() => handleSubMenuClick(subIndex)}
                  className="w-full flex justify-between items-center pl-3 pr-4 py-2"
                >
                  <div className="flex items-center gap-1">
                    <PiDotDuotone color="#3686FF" size={20} />
                    <span>{sub.title}</span>
                  </div>
                  <IoIosArrowForward
                    className={`${activeSubMenu === subIndex ? "rotate-90" : ""} transition-transform`}
                  />
                </button>
                {/* Render deeper nested submenu if available */}
                {activeSubMenu === subIndex && renderSubMenu(sub.subMenu)}
              </>
            ) : (
              <div className="flex items-center pl-4">
                <PiDotDuotone color="#3686FF" size={20} />
                <Link
                  to={sub.link}
                  className="block pr-4 py-2 hover:text-white"
                >
                  <span>{sub.title}</span>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col  shadow-inner text-white w-64 xl:w-64 2xl:w-[284px] flex-shrink-0">
      <div className="lg:px-4 xl:px-4 font-poppins text-[15px] text-[#d5d5d5]">
        <div className="py-6">
          <Logo />
        </div>
        <ul className="mt-4">
          {adminMenuItems.map((menu, menuIndex) => (
            <li key={menuIndex}>
              {menu.subMenu ? (
                // Handle nested menus
                <button
                  onClick={() => handleMenuClick(menuIndex)}
                  className={`w-full py-3 mb-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex items-center justify-between ${
                    activeMenu === menuIndex && "bg-[#3686FF] text-white"
                  }`}
                >
                  <span className="flex items-center">
                    {menu.icon}
                    <span className="ml-2">{menu.title}</span>
                  </span>
                  <IoIosArrowForward
                    className={`${activeMenu === menuIndex ? "rotate-90" : ""} transition-transform`}
                  />
                </button>
              ) : (
                // Handle single-level menus
                <Link
                  to={menu.link}
                  className={` w-full py-3 mb-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex items-center ${
                    activeMenu === menuIndex && "bg-[#3686FF] text-white"
                  }`}
                >
                  <span className="flex items-center">
                    {menu.icon}
                    <span className="ml-2">{menu.title}</span>
                  </span>
                </Link>
              )}

              {/* Render submenu if active */}
              {activeMenu === menuIndex &&
                menu.subMenu &&
                renderSubMenu(menu.subMenu)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
