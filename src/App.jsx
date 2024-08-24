import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/user/LoginPage";
import RegistraionPage from "./pages/user/RegistraionPage";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";
import Home from "./pages/Home";
import Layout from "./Layout";
import Profile from "./pages/employee/Profile";
import CompanyList from "./pages/company/CompanyList";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ProfileUpdate from "./pages/user/ProfileUpdate";
import DepartmentList from "./pages/department/DepartmentList";
import DepartmentSetting from "./pages/department/DepartmentSettings";
import DesignationList from "./pages/designation/DesignationList";
import DesignationSetting from "./pages/designation/DesignationSettings";
import AddShift from "./pages/company/shift/AddShift";
import ShiftList from "./pages/company/shift/ShiftList";
import EditShift from "./pages/company/shift/EditShift";
import SectionList from "./pages/section/SectionList";
import SectionSettings from "./pages/section/SectionSettings";
import CompanyPrivateRoute from "./privateRoute/CompanyPrivateRoute";
import CompanyPofile from "./pages/company/CompanyPofile";
import ManualAttendance from "./pages/employee/ManualAttendance";
import UserProfile from "./pages/employee/Profile";
import EmployeeList from "./pages/employee/employeeList";
import EmployeeRegistration from "./pages/employee/employeeRegistrationForm";
import DepartmentForm from "./pages/department/DepartmentForm";
import AttendanceList from "./pages/employee/AttendancesList";
import Settings from "./pages/company/Settings";

function App() {
  return (
    <>
      <Routes>
        {/* Private routes that require user authentication */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
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
              <Route
                path="company/employee/details/:id"
                element={<Profile />}
              />

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

              {/* Attendance  */}
              <Route
                path="employee/attendence"
                element={<ManualAttendance />}
              />
              <Route path="employee/attendences" element={<AttendanceList />} />
            </Route>
          </Route>
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistraionPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
