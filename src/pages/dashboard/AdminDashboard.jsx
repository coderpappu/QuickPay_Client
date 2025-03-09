import React, { useEffect } from "react";
import { FcBriefcase } from "react-icons/fc";
// employee icon
import { FcNightLandscape, FcVoicePresentation } from "react-icons/fc";
import { useDispatch } from "react-redux";
import StatusCard from "../../components/dashboard/StatusCard";
import {
  useGetActiveCompanyQuery,
  useGetAttendancesQuery,
  useGetEmployeesQuery,
  useGetShiftListQuery,
} from "../../features/api";
import { setCompanyId } from "../../features/companySlice";
import DatePicker from "../../utils/DatePicker";

const AdminDashboard = () => {
  // company related request
  const dispatch = useDispatch();

  const { data: activeCompanyId, refetch: refetchActiveCompany } =
    useGetActiveCompanyQuery();

  const companyId = activeCompanyId?.data?.company_id;

  const { data: employees } = useGetEmployeesQuery(companyId);
  const { data: shifts } = useGetShiftListQuery(companyId);

  const { data: attendances } = useGetAttendancesQuery({
    companyId,
    date: DatePicker(),
  });

  // Effect to set company ID from local storage on component mount

  useEffect(() => {
    if (companyId) {
      dispatch(setCompanyId(companyId)); // Dispatch action to set company ID in the store
    }
  }, [companyId, dispatch]);

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
        color={"#3686FF"}
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
