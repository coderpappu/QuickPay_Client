import React from "react";
import { FcBriefcase } from "react-icons/fc";
// employee icon
import { FcNightLandscape } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";
import StatusCard from "../../components/dashboard/StatusCard";
import DatePicker from "../../utils/DatePicker";
import {
  useGetEmployeesQuery,
  useGetCompanyIdQuery,
  useGetShiftListQuery,
  useGetAttendancesQuery,
} from "../../features/api";

const AdminDashboard = () => {
  // company related request
  const { data: companyId } = useGetCompanyIdQuery();

  const { data: employees } = useGetEmployeesQuery(companyId);
  const { data: shifts } = useGetShiftListQuery(companyId);
  const { data: attendances } = useGetAttendancesQuery({
    companyId,
    date: DatePicker(),
  });

  // company data
  let totalEmployees = employees?.data.length || 0;
  let totalShifts = shifts?.data.length || 0;
  let totalAttendances = attendances?.data.length || 0;

  return (
    <>
      <StatusCard
        title={"Employee"}
        count={totalEmployees}
        percentage={12}
        icon={FcBriefcase}
        color={"#ddd"}
      />
      <StatusCard
        title={"Shift"}
        count={totalShifts}
        percentage={12}
        icon={FcNightLandscape}
        color={"#E4669D"}
      />
      <StatusCard
        title={"Attendance"}
        count={totalAttendances}
        percentage={12}
        icon={FcVoicePresentation}
        color={"#E4669D"}
      />
    </>
  );
};

export default AdminDashboard;
