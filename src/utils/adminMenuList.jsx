import { AiOutlineProduct, AiOutlineSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { PiDotDuotone } from "react-icons/pi";
import { LuListTodo } from "react-icons/lu";

const adminMenuItems = [
  {
    title: "Dashboard",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "Overview", link: "/" },
      { title: "Reports", link: "/company/allowance/" },
    ],
  },
  {
    title: "Manage Company",
    icon: <LuListTodo size={20} />,
    link: "/company/list",
  },
  {
    title: "HRM system",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "Employee Setup", link: "/employee-setup" },
      {
        title: "Payroll Setup",
        subMenu: [
          { title: "Set Salary", link: "/profile-settings" },
          { title: "Payslip", link: "/account-settings" },
        ],
      },
      {
        title: "Leave Management",
        subMenu: [
          { title: "Manage Leave", link: "/profile-settings" },
          { title: "Attendance", link: "/account-settings" },
          { title: "Biometric ", link: "/account-settings" },
        ],
      },
      {
        title: "Performance Setup",
        subMenu: [
          { title: "Indficator", link: "/profile-settings" },
          { title: "Appraisal", link: "/account-settings" },
          { title: "Gaol Tracking ", link: "/account-settings" },
        ],
      },
      {
        title: "Training Setup",
        subMenu: [
          { title: "Training List", link: "/profile-settings" },
          { title: "Trainer", link: "/account-settings" },
        ],
      },
      {
        title: "HR Admin Setup",
        subMenu: [
          { title: "Award", link: "/profile-settings" },
          { title: "Transfer", link: "/account-settings" },
          { title: "Resignation", link: "/account-settings" },
          { title: "Trip", link: "/account-settings" },
          { title: "Complaints", link: "/account-settings" },
          { title: "Warning", link: "/account-settings" },
          { title: "Termination", link: "/account-settings" },
          { title: "Annoucement", link: "/account-settings" },
          { title: "Holiday", link: "/account-settings" },
        ],
      },
      {
        title: "Meeting",
        icon: <LuListTodo size={20} />,
        link: "/company/list",
      },
      {
        title: "Company Policy",
        icon: <LuListTodo size={20} />,
        link: "/company/list",
      },
      {
        title: "HRM Setup",
        icon: <LuListTodo size={20} />,
        link: "/company/list",
      },
    ],
  },
  {
    title: "Banking system",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "Account", link: "/add-product" },
      { title: "Transfer", link: "/manage-products" },
    ],
  },
  {
    title: "User Management",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "User", link: "/add-product" },
      { title: "Role", link: "/manage-products" },
    ],
  },
  {
    title: "Products",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "Add Product", link: "/add-product" },
      { title: "Manage Products", link: "/manage-products" },
    ],
  },
  {
    title: "HRM System",
    icon: <AiOutlineProduct size={20} />,
    subMenu: [
      { title: "HRM System Setup", link: "/hrm-setup" },
      { title: "Manage Products", link: "/manage-products" },
    ],
  },
  {
    title: "Settings",
    icon: <AiOutlineSetting size={20} />,
    subMenu: [
      {
        title: "System Settings",
        link: "/systemsettings",
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
];

export { adminMenuItems };
