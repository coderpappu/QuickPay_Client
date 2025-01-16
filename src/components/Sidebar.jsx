import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiDotDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import {
  useGetCompanyIdQuery,
  useGetUserPerModuleQuery,
  useGetUserQuery,
} from "../features/api";
import { adminMenuItems, employeeMenuItems } from "../utils/MenuList";
const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: userData } = useGetUserQuery();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeUserType, setActiveUserType] = useState(null);

  const userId = userData?.data?.id;

  const { data: userPermissions } = useGetUserPerModuleQuery(userId);

  const handleMenuClick = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
    setActiveSubMenu(null); // Reset submenu when a new menu is clicked
  };

  const handleSubMenuClick = (index) => {
    setActiveSubMenu(index);
  };

  // Determine the correct menu items based on user type and permissions
  let currentMenuItems;
  if (
    (userData?.data && userData?.data?.type === "SUPER_ADMIN") ||
    userData?.data?.type === "ADMIN"
  ) {
    currentMenuItems = adminMenuItems;
  } else {
    currentMenuItems = employeeMenuItems;
  }

  // Filter menu items based on user permissions
  const filterMenuItemsByPermissions = (menuItems) => {
    if (userData?.data?.type === "SUPER_ADMIN") {
      return menuItems; // Show full admin menu for super admin
    }

    if (!userPermissions) {
      return []; // Return an empty array if userPermissions is not yet loaded
    }

    return menuItems
      .map((menu) => {
        if (menu.subMenu) {
          menu.subMenu = filterMenuItemsByPermissions(menu.subMenu);
          return menu.subMenu.length > 0 ? menu : null;
        }

        const hasPermission = userPermissions?.data?.includes(menu.title);
        return hasPermission ? menu : null;
      })
      .filter(Boolean);
  };

  const filteredMenuItems = filterMenuItemsByPermissions(currentMenuItems);

  // Recursive function to render nested submenus
  const renderSubMenu = (subMenus) => {
    return (
      <ul className="mt-2 space-y-2 pl-5">
        {subMenus?.map((sub, subIndex) => (
          <li key={subIndex}>
            {sub.subMenu ? (
              <>
                {/* Handle nested submenu */}
                <button
                  onClick={() => handleSubMenuClick(subIndex)}
                  className="flex w-full items-center justify-between py-2 pl-3 pr-4"
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
                  className="block py-2 pr-4 hover:text-white"
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
    <div className="flex w-64 flex-shrink-0 flex-col text-white shadow-inner xl:w-64 2xl:w-[284px]">
      <div className="font-poppins text-[15px] text-[#d5d5d5] lg:px-4 xl:px-4">
        <div className="py-6">
          <Logo />
        </div>
        <ul className="mt-4">
          {filteredMenuItems.map((menu, menuIndex) => (
            <li key={menuIndex}>
              {menu.subMenu ? (
                // Handle nested menus
                <button
                  onClick={() => handleMenuClick(menuIndex)}
                  className={`mb-2 flex w-full cursor-pointer items-center justify-between rounded-[3px] px-4 py-3 transition-all hover:bg-[#3686FF] hover:text-white ${
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
                  className={`mb-2 flex w-full cursor-pointer items-center rounded-[3px] px-4 py-3 transition-all hover:bg-[#3686FF] hover:text-white ${
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
