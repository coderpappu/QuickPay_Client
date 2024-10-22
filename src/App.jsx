import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Calendar from "./pages/calendar/Calendar";
import Holiday from "./pages/calendar/holiday/Holiday";
import { default as TypeForm } from "./pages/calendar/holiday/type/TypeForm";
import Weekend from "./pages/calendar/weekend/Weekend";
import WeekendSetting from "./pages/calendar/weekend/WeekendSettings";
import CompanyList from "./pages/company/CompanyList";
import CompanyPofile from "./pages/company/CompanyPofile";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";
import Settings from "./pages/company/Settings";
import AddShift from "./pages/company/shift/AddShift";
import EditShift from "./pages/company/shift/EditShift";
import ShiftList from "./pages/company/shift/ShiftList";
import DepartmentForm from "./../src/components/hrm/department/DepartmentForm";
import DepartmentList from "./pages/department/DepartmentList";
import DepartmentSetting from "./pages/department/DepartmentSettings";
import DesignationList from "./pages/designation/DesignationList";
import DesignationSetting from "./pages/designation/DesignationSettings";
import AttendanceList from "./pages/employee/AttendancesList";
import EmployeeList from "./pages/employee/employeeList";
import EmployeeRegistration from "./pages/employee/employeeRegistrationForm";
import ManualAttendance from "./pages/employee/ManualAttendance";
import Profile from "./pages/employee/Profile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SectionList from "./pages/section/SectionList";
import SectionSettings from "./pages/section/SectionSettings";
import LoginPage from "./pages/user/LoginPage";
import ProfileUpdate from "./pages/user/ProfileUpdate";
import RegistraionPage from "./pages/user/RegistraionPage";
import CompanyPrivateRoute from "./privateRoute/CompanyPrivateRoute";
import PrivateRoute from "./privateRoute/PrivateRoute";
import HolidayForm from "./pages/calendar/holiday/HolidayForm";
import LoginEmployee from "./pages/employee/LoginEmployee";
import Leave from "./pages/employee/Leave";
import LeaveSettings from "./pages/leave/LeaveSettings";
import LeaveTypeList from "./pages/leave/LeaveTypeList";
import LeaveForm from "./pages/employee/LeaveForm";
import LeaveTypeForm from "./pages/leave/LeaveTypeForm";
import LeaveApplicationList from "./pages/leave/LeaveApplicationList";
import EarnLeave from "./pages/leave/earnLeave/EarnLeave";
import GradeList from "./pages/payroll/grade/gradeList";
import GradeForm from "./pages/payroll/grade/gradeForm";
import AllowanceList from "./pages/payroll/allowance/AllowanceList";
import AllowanceForm from "./pages/payroll/allowance/AllowanceForm";
import DeductionList from "./pages/payroll/deduction/DeductionList";
import DeductionForm from "./pages/payroll/deduction/DeductionForm";
import LoanTypeList from "./pages/payroll/Loan/LoanType/LoanTypeList";
import LoanTypeForm from "./pages/payroll/Loan/LoanType/LoanTypeForm";
import SystemSettings from "./pages/company/SystemSettings";
import HrmSetup from "./pages/hrm/HrmSetup";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeLeaveApplication from "./pages/leave/EmployeeLeaveApplication";
import Application from "./pages/employee/Application";

function App() {
  return (
    <>
      <Routes>
        {/* Private routes that require user authentication */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            {/* employee dashboard route  */}
            <Route path="employee/profile" element={<EmployeeProfile />} />

            <Route
              path="company/leave/application"
              element={<LeaveApplicationList />}
            />
            <Route path="/leave/form" element={<LeaveForm />} />
            <Route
              path="/employee/leave/application"
              element={<EmployeeLeaveApplication />}
            />

            <Route index element={<Home />} />
            <Route path="company/list" element={<CompanyList />} />

            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<ProfileUpdate />} />

            <Route path="company/create" element={<CompanySettingsPage />} />
            <Route
              path="company/update/:id"
              element={<CompanySettingsPage />}
            />
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

              <Route path="/company/allowance/" element={<AllowanceList />} />
              <Route
                path="/company/allowance/form/:id"
                element={<AllowanceForm />}
              />

              <Route path="/company/deduction/" element={<DeductionList />} />
              <Route
                path="/company/deduction/form/:id"
                element={<DeductionForm />}
              />

              {/* Loan  */}
              <Route path="/account-settings" element={<Application />} />
              <Route path="/leave/application/:id" element={<Application />} />

              <Route path="/company/loan/type" element={<LoanTypeList />} />
              <Route path="/company/loan/type/:id" element={<LoanTypeForm />} />
            </Route>
          </Route>
        </Route>

        {/* Public routes */}

        <Route path="employee/login" element={<LoginEmployee />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistraionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
