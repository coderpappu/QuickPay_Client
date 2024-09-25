import { useState } from "react";
import { AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../components/Logo";
import { useGetCompanyIdQuery, useGetUserQuery } from "../features/api";
import { PiDotDuotone } from "react-icons/pi";
const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data } = useGetUserQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Example array with nested submenus
  const menuItems = [
    {
      title: "Products",
      icon: <AiOutlineProduct size={20} />,
      subMenu: [
        { title: "Add Product", link: "/add-product" },
        { title: "Manage Products", link: "/manage-products" },
      ],
    },
    {
      title: "Settings",
      icon: <AiOutlineSetting size={20} />,
      subMenu: [
        {
          title: "General Settings",
          subMenu: [
            { title: "Profile Settings", link: "/profile-settings" },
            { title: "Account Settings", link: "/account-settings" },
          ],
        },
        {
          title: "Security Settings",
          subMenu: [
            { title: "Password", link: "/password-settings" },
            { title: "Two-Factor Auth", link: "/2fa-settings" },
          ],
        },
      ],
    },
    // Add more menus as needed
  ];

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
        {subMenus.map((sub, subIndex) => (
          <li key={subIndex}>
            {sub.subMenu ? (
              <>
                {/* Handle nested submenu */}
                <button
                  onClick={() => handleSubMenuClick(subIndex)}
                  className="w-full flex justify-between items-center pl-3 pr-4 py-2 "
                >
                  <div className="flex flex-wrap justify-start items-center gap-1">
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
              <div
                className="flex flex-wrap justify-normal items-center
               pl-4"
              >
                <PiDotDuotone color="#3686FF" size={20} />
                <a
                  href={sub.link}
                  className="block  pr-4 py-2 hover:text-white"
                >
                  <h3> {sub.title}</h3>
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0E1A34] shadow-inner text-white w-64 xl:w-64 2xl:w-[284px] flex-shrink-0">
      <div className="lg:px-4 xl:px-4 font-poppins text-[15px] text-[#d5d5d5]">
        <div className="py-6">
          <Logo />
        </div>
        <ul className="mt-4">
          {menuItems.map((menu, menuIndex) => (
            <li
              key={menuIndex}
              className={`group ${activeMenu === menuIndex ? "" : ""}`}
            >
              <button
                onClick={() => handleMenuClick(menuIndex)}
                className={`w-full py-3 mb-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "dashboard" && `bg-[#3686FF] text-white`
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

              {activeMenu === menuIndex && renderSubMenu(menu.subMenu)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
