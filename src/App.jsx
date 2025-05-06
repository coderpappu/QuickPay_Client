import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import DepartmentForm from "./../src/components/hrm/department/DepartmentForm";
import "./App.css";
import CompanySettings from "./components/company/CompanySettings";

import SalaryUpdate from "./components/payroll/SalaryUpdate";
import SetSalaryCard from "./components/payroll/SetSalary";
import Layout from "./Layout";
import AttendanceList from "./pages/attendnace/AttendancesList";
import ManualAttendance from "./pages/attendnace/ManualAttendance";
import Calendar from "./pages/calendar/Calendar";
import Holiday from "./pages/calendar/holiday/Holiday";
import HolidayForm from "./pages/calendar/holiday/HolidayForm";
import { default as TypeForm } from "./pages/calendar/holiday/type/TypeForm";
import Weekend from "./pages/calendar/weekend/Weekend";
import WeekendSetting from "./pages/calendar/weekend/WeekendSettings";
import CompanyList from "./pages/company/CompanyList";
import CompanyPofile from "./pages/company/CompanyPofile";
import Settings from "./pages/company/Settings";
import AddShift from "./pages/company/shift/AddShift";
import EditShift from "./pages/company/shift/EditShift";
import ShiftList from "./pages/company/shift/ShiftList";
import SystemSettings from "./pages/company/SystemSettings";
import DepartmentList from "./pages/department/DepartmentList";
import DepartmentSetting from "./pages/department/DepartmentSettings";
import DesignationList from "./pages/designation/DesignationList";
import DesignationSetting from "./pages/designation/DesignationSettings";
import Application from "./pages/employee/Application";
import EmployeeList from "./pages/employee/employeeList";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeRegistration from "./pages/employee/employeeRegistrationForm";
import ExperienceApplication from "./pages/employee/ExperienceCertificate";
import JoiningLetter from "./pages/employee/JoiningLetter";
import Leave from "./pages/employee/Leave";
import LeaveForm from "./pages/employee/LeaveForm";
import LoginEmployee from "./pages/employee/LoginEmployee";
import NOCLetter from "./pages/employee/NOCLetter";
import Profile from "./pages/employee/Profile";
import Home from "./pages/Home";
import HrmSetup from "./pages/hrm/HrmSetup";
import EarnLeave from "./pages/leave/earnLeave/EarnLeave";
import EmployeeLeaveApplication from "./pages/leave/EmployeeLeaveApplication";
import LeaveSettings from "./pages/leave/LeaveSettings";
import LeaveTypeForm from "./pages/leave/LeaveTypeForm";
import LeaveTypeList from "./pages/leave/LeaveTypeList";
import NotFound from "./pages/NotFound";

import AdminEmployeeLoanForm from "./components/hrm/loan/Employee_Loan/Admin/EmployeeLoanForm";
import AdminEmployeeLoanList from "./components/hrm/loan/Employee_Loan/Admin/EmployeeLoanList";
import EmployeeLoanList from "./components/hrm/loan/Employee_Loan/EmployeeLoanList";

import BonusSlipCard from "./components/payroll/payslip/BonusSlip";
import PaySlipCard from "./components/payroll/payslip/PaySlipCard";
import BiometricAttendnaces from "./pages/attendnace/BiometricAttendnaces";
import EditorComponent from "./pages/editor-test/EditorComponent";
import LeaveApplicationListCard from "./pages/leave/LeaveApplicationList";
import GradeForm from "./pages/payroll/grade/gradeForm";
import GradeList from "./pages/payroll/grade/gradeList";
import LoanTypeForm from "./pages/payroll/Loan/LoanType/LoanTypeForm";
import LoanTypeList from "./pages/payroll/Loan/LoanType/LoanTypeList";
import PermissionCard from "./pages/permission/PermissionCard";
import DailyAttendnaceReport from "./pages/report/DailyAttendanceReport";
import MonthlyAttendnaceReport from "./pages/report/MonthLyAttendnaceReport";
import SalaryReport from "./pages/report/SalaryReport";
import SectionList from "./pages/section/SectionList";
import SectionSettings from "./pages/section/SectionSettings";
import LoginPage from "./pages/user/LoginPage";
import MainUserProfile from "./pages/user/MainUserProfile";
import ProfileUpdate from "./pages/user/ProfileUpdate";
import RegistraionPage from "./pages/user/RegistraionPage";
import Users from "./pages/user/UserList";
import UserProfile from "./pages/user/UserProfile";
import CompanyPrivateRoute from "./privateRoute/CompanyPrivateRoute";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";

function App() {
  return (
    <>
      <Routes>
        {/* Private routes that require user authentication */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            {/* employee dashboard route  */}

            <Route path="/users" element={<Users />} />
            <Route path="/user/profile/:id" element={<UserProfile />} />
            <Route path="employee/profile" element={<EmployeeProfile />} />
            <Route
              path="company/leave/application"
              element={<LeaveApplicationListCard />}
            />
            <Route path="/leave/form" element={<LeaveForm />} />
            <Route
              path="/employee/leave/application"
              element={<EmployeeLeaveApplication />}
            />
            <Route index element={<Home />} />
            <Route path="company/list" element={<CompanyList />} />
            <Route path="profile" element={<MainUserProfile />} />
            <Route path="profile/:id" element={<ProfileUpdate />} />
            <Route path="company/create" element={<CompanySettings />} />
            <Route path="company/update/:id" element={<CompanySettings />} />
            <Route path="company/details/:id" element={<CompanyPofile />} />
            {/* Company-specific private routes */}
            <Route element={<CompanyPrivateRoute />}>
              <Route path="company/employee" element={<EmployeeList />} />
              <Route
                path="company/employee/registration"
                element={<EmployeeRegistration />}
              />
              {/* employee account edit route  */}
              <Route
                path="company/employee/update/:id"
                element={<EmployeeRegistration />}
              />
              <Route
                path="company/employee/details/:id"
                element={<Profile />}
              />
              <Route path="employee/profile" element={<EmployeeProfile />} />
              <Route path="company/shift/list" element={<ShiftList />} />
              <Route path="company/add/shift" element={<AddShift />} />
              <Route path="company/edit/shift/:id" element={<EditShift />} />
              <Route path="department/list" element={<DepartmentList />} />
              <Route
                path="department/update/:id"
                element={<DepartmentForm />}
              />
              <Route path="department/create" element={<DepartmentSetting />} />
              <Route path="designation/list" element={<DesignationList />} />
              <Route
                path="designation/create"
                element={<DesignationSetting />}
              />
              <Route
                path="designation/update/:id"
                element={<DesignationSetting />}
              />
              <Route path="section/list" element={<SectionList />} />
              <Route path="section/create" element={<SectionSettings />} />
              <Route path="section/update/:id" element={<SectionSettings />} />
              <Route path="company/settings" element={<Settings />} />
              <Route path="/systemsettings" element={<SystemSettings />} />
              <Route path="/hrm-setup" element={<HrmSetup />} />
              {/* Attendance  */}
              <Route
                path="employee/attendence"
                element={<ManualAttendance />}
              />
              <Route path="employee/attendences" element={<AttendanceList />} />
              <Route
                path="employee/bio/attendences"
                element={<BiometricAttendnaces />}
              />
              <Route path="company/calendar" element={<Calendar />} />
              <Route path="employee/leave" element={<Leave />} />
              <Route path="company/leave" element={<LeaveSettings />} />
              <Route path="company/leave/type" element={<LeaveTypeList />} />
              <Route path="company/leave/earnleave" element={<EarnLeave />} />

              <Route
                path="company/leave/form/:id"
                element={<LeaveTypeForm />}
              />
              <Route path="company/weekend" element={<Weekend />} />
              <Route
                path="company/weekend/create"
                element={<WeekendSetting />}
              />
              <Route path="/weekend/update/:id" element={<WeekendSetting />} />
              <Route path="/holiday" element={<Holiday />} />
              <Route path="/holiday/type/add" element={<TypeForm />} />
              <Route path="/holidayform/" element={<HolidayForm />} />

              {/* Payroll System - Grade end point   */}
              <Route path="/company/grade/" element={<GradeList />} />
              <Route path="/company/grade/form/:id" element={<GradeForm />} />

              {/* <Route path="/company/allowance/" element={<AllowanceList />} /> */}

              {/* Loan  */}
              <Route path="/employee/loan" element={<EmployeeLoanList />} />
              <Route
                path="/employee/loan/apply"
                element={<AdminEmployeeLoanForm />}
              />
              <Route
                path="/admin/employee/loan"
                element={<AdminEmployeeLoanList />}
              />
              <Route
                path="/admin/employee/loan/apply"
                element={<AdminEmployeeLoanForm />}
              />
              <Route path="/account-settings" element={<Application />} />
              {/* letter and application format  */}
              <Route path="/leave/application/:id" element={<Application />} />
              <Route
                path="/experiencecertificate/:id"
                element={<ExperienceApplication />}
              />
              <Route path="/joiningletter/:id" element={<JoiningLetter />} />
              <Route path="/nocletter/:id" element={<NOCLetter />} />

              <Route path="/company/loan/type" element={<LoanTypeList />} />
              <Route path="/company/loan/type/:id" element={<LoanTypeForm />} />
              <Route path="/editor" element={<EditorComponent />} />

              {/* salary route  */}
              <Route path="/employee/setsalary" element={<SetSalaryCard />} />
              <Route
                path="/employee/setsalary/update/:id"
                element={<SalaryUpdate />}
              />

              {/* payslip  */}
              <Route path="/employee/payslip" element={<PaySlipCard />} />
              <Route path="/employee/bonus-slip" element={<BonusSlipCard />} />

              {/* reports  */}
              <Route
                path="/report/month/attendnace"
                element={<MonthlyAttendnaceReport />}
              />
              <Route
                path="/report/daily/attendnace"
                element={<DailyAttendnaceReport />}
              />
              <Route path="/report/salary" element={<SalaryReport />} />

              {/* loader test route  */}
              <Route path="/loader/" element={<ProfileSkeleton />} />

              {/* Permission  */}
              <Route path="/permission-manager" element={<PermissionCard />} />
            </Route>
          </Route>
        </Route>

        {/* Public routes */}

        <Route path="employee/login" element={<LoginEmployee />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistraionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
