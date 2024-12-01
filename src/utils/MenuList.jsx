import { AiOutlineSetting } from "react-icons/ai";
import { LuListTodo, LuUsers2 } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { TbCards, TbMoneybag } from "react-icons/tb";

import { LuUser2 } from "react-icons/lu";
const adminMenuItems = [
  {
    title: "Dashboard",
    icon: <RxHome size={20} />,
    subMenu: [
      { title: "Overview", link: "/company/calendar" },
      { title: "Reports", link: "company/settings" },
      { title: "Reports", link: "/holiday" },
      { title: "Holiday Type", link: "/holiday/type/add" },
      { title: "Holiday Form", link: "/holidayform/" },
      { title: "Loader", link: "/loader/" },
    ],
  },
  {
    title: "Manage Company",
    icon: <TbCards size={20} />,
    link: "/company/list",
  },
  {
    title: "HRM system",
    icon: <LuUsers2 size={20} />,
    subMenu: [
      { title: "Employee Setup", link: "/company/employee" },
      {
        title: "Payroll Setup",
        subMenu: [
          { title: "Set Salary", link: "/employee/setsalary" },
          { title: "Payslip", link: "/employee/payslip" },
        ],
      },
      {
        title: "Leave Management",
        subMenu: [
          { title: "Leave Application", link: "/company/leave/application" },
        ],
      },
      {
        title: "Attendance ",
        subMenu: [
          { title: "Attendance List", link: "/employee/attendences" },
          { title: "Manual Attendance ", link: "/employee/attendence" },
          { title: "Biometric", link: "/employee/attendence-biometric" },
        ],
      },
      {
        title: "Holiday Management",
        subMenu: [
          { title: "Holiday Add", link: "holiday" },
          { title: "Calendar", link: "/company/calendar" },
        ],
      },

      {
        title: "Loan Management",
        subMenu: [
          { title: "Loan Application", link: "/company/leave/application" },
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
        link: "/hrm-setup",
      },
    ],
  },
  {
    title: "Banking system",
    icon: <TbMoneybag size={20} />,
    subMenu: [
      { title: "Account", link: "/add-product" },
      { title: "Transfer", link: "/manage-products" },
    ],
  },
  {
    title: "User Management",
    icon: <LuUser2 size={19} />,
    subMenu: [
      { title: "User", link: "/add-product" },
      { title: "Role", link: "/manage-products" },
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

const employeeMenuItems = [
  {
    title: "Dashboard",
    icon: <RxHome size={20} />,
    subMenu: [
      { title: "Overview", link: "/" },
      { title: "Reports", link: "/company/loan/type" },
      { title: "Reports", link: "section/create" },
    ],
  },
  {
    title: "Leave Management",
    icon: <TbCards size={20} />,
    subMenu: [
      { title: "Apply Leave", link: "/employee/leave/application" },
      { title: "Reports", link: "/employee/leave/form" },
    ],
  },
  {
    title: "Loan Management",
    icon: <TbCards size={20} />,

    subMenu: [
      { title: "Apply Loan", link: "/" },
      { title: "Reports", link: "/company/loan/type" },
    ],
  },
  {
    title: "Attendance",
    icon: <TbCards size={20} />,

    subMenu: [
      { title: "sheet", link: "/" },
      { title: "Reports", link: "/company/loan/type" },
    ],
  },
  {
    title: "Holiday",
    icon: <TbCards size={20} />,
    link: "/",
  },
];

export { adminMenuItems, employeeMenuItems };
