import React, { useEffect } from "react";
import PopUp from "../components/PopUp";

import { useGetUserQuery, useSetCompanyIdMutation } from "../features/api";
import AdminDashboard from "./dashboard/AdminDashboard";

const Home = () => {
  const [setCompanyId] = useSetCompanyIdMutation();

  const { data: employeeData } = useGetUserQuery();

  useEffect(() => {
    setCompanyId(employeeData?.data?.company_id);
  }, [setCompanyId]);

  return (
    <div className="">
      <h1 className="text-6xl text-[#6D28D9] font-bold text-center">
        QuickPay
      </h1>

      {!employeeData?.data && <PopUp />}

      <div className="mb-2">
        <h4 className="text-xl font-bold ">Welcome to QuickPay</h4>
      </div>

      <div className="flex flex-wrap items-center justify-start">
        {/* show card  */}
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Home;
