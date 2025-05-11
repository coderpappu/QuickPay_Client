import { AiOutlineSetting } from "react-icons/ai";
import { RxHome } from "react-icons/rx";
import { TbCards } from "react-icons/tb";

import { BiArchive, BiCircleThreeQuarter } from "react-icons/bi";
import { BsCheck2Circle, BsClockHistory } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { LuUserRoundCog } from "react-icons/lu";
import { MdModelTraining, MdOutlinePolicy } from "react-icons/md";
import { RiCalendarScheduleLine, RiSpeedUpLine } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";

const adminMenuItems = [
  {
    title: "Dashboard",
    icon: <RxHome size={18} />,
    subMenu: [
      { title: "Overview", link: "/editor" },
      { title: "Reports", link: "company/settings" },
      { title: "Reports", link: "/holiday" },
      { title: "Holiday Type", link: "/holiday/type/add" },
      { title: "Holiday Form", link: "/holidayform/" },
      { title: "Loader", link: "/loader/" },
    ],
  },
  {
    title: "Manage Company",
    icon: <TbCards size={18} />,
    link: "/company/list",
  },

  {
    icon: <GoPeople size={18} />,
    title: "Employee Setup",
    link: "/company/employee",
  },
  {
    icon: <BiCircleThreeQuarter size={18} />,
    title: "Payroll Setup",
    subMenu: [
      { title: "Set Salary", link: "/employee/setsalary" },
      { title: "Payslip", link: "/employee/payslip" },
      { title: "Bonus Slip", link: "/employee/bonus-slip" },
    ],
  },
  {
    icon: <BsCheck2Circle size={18} />,
    title: "Leave Management",
    subMenu: [
      { title: "Leave Application", link: "/company/leave/application" },
    ],
  },
  {
    icon: <BsClockHistory size={18} />,
    title: "Attendance ",
    subMenu: [
      { title: "Attendance List", link: "/employee/attendences" },
      { title: "Manual Attendance ", link: "/employee/attendence" },
      { title: "Biometric", link: "/employee/bio/attendences" },
      { title: "Reconciliation", link: "/reconciliation/application/list" },
    ],
  },
  {
    icon: <BsClockHistory size={18} />,
    title: "Reports",
    subMenu: [
      { title: "Monthly Att Report", link: "/report/month/attendnace" },
      { title: "Daily Att Report", link: "/report/daily/attendnace" },
      { title: "Salary Report", link: "/report/salary" },
    ],
  },
  {
    icon: <RiCalendarScheduleLine size={18} />,
    title: "Holiday Management",
    subMenu: [
      { title: "Holiday Add", link: "holiday" },
      { title: "Calendar", link: "/company/calendar" },
    ],
  },

  {
    icon: <TbPigMoney size={18} />,
    title: "Loan Management",
    subMenu: [{ title: "Loan Application", link: "/admin/employee/loan" }],
  },
  {
    icon: <RiSpeedUpLine size={18} />,
    title: "Performance Setup",
    subMenu: [
      { title: "Indficator", link: "/profile-settings" },
      { title: "Appraisal", link: "/account-settings" },
      { title: "Gaol Tracking ", link: "/account-settings" },
    ],
  },
  {
    icon: <MdModelTraining size={18} />,
    title: "Training Setup",
    subMenu: [
      { title: "Training List", link: "/profile-settings" },
      { title: "Trainer", link: "/account-settings" },
    ],
  },
  {
    icon: <HiOutlineShieldCheck size={18} />,
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
    icon: <HiOutlineClipboard size={18} />,
    title: "Meeting",

    link: "/company/list",
  },
  {
    title: "Company Policy",
    icon: <MdOutlinePolicy size={18} />,
    link: "/company/list",
  },
  {
    title: "HRM Setup",
    icon: <BiArchive size={18} />,
    link: "/hrm-setup",
  },

  // {
  //   title: "Banking system",
  //   icon: <TbMoneybag size={18} />,
  //   subMenu: [
  //     { title: "Account", link: "/add-product" },
  //     { title: "Transfer", link: "/manage-products" },
  //   ],
  // },
  {
    title: "User Management",
    icon: <LuUserRoundCog size={18} />,
    subMenu: [
      { title: "User", link: "/users" },
      { title: "Role", link: "/manage-products" },
    ],
  },

  {
    title: "Settings",
    icon: <AiOutlineSetting size={18} />,
    subMenu: [
      {
        title: "System Settings",
        link: "/systemsettings",
      },
      {
        title: "Permission Manager",
        link: "/permission-manager",
      },

      {
        title: "Security Settings",
        subMenu: [
          { title: "Password", link: "/employee/loan/apply" },
          { title: "Two-Factor Auth", link: "/2fa-settings" },
        ],
      },
    ],
  },
];

const employeeMenuItems = [
  {
    title: "Dashboard",
    icon: <RxHome size={18} />,
    subMenu: [{ title: "Overview", link: "/" }],
  },
  {
    title: "Leave Management",
    icon: <TbCards size={18} />,
    subMenu: [
      { title: "Apply Leave", link: "/employee/leave/application" },
      { title: "Reports", link: "/employee/leave/form" },
    ],
  },
  {
    title: "Loan Management",
    icon: <TbCards size={18} />,

    subMenu: [
      { title: "Apply Loan", link: "/employee/loan/apply" },
      { title: "Reports", link: "/employee/loan" },
    ],
  },
  {
    title: "Attendance",
    icon: <TbCards size={18} />,

    subMenu: [
      { title: "Report", link: "/employee/attendence/overview" },
      { title: "Reconciliation", link: "/reconciliation/application" },
    ],
  },
  {
    title: "Holiday",
    icon: <TbCards size={18} />,
    link: "/",
  },
];

export { adminMenuItems, employeeMenuItems };
