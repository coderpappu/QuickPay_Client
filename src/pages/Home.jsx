import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PopUp from "../components/PopUp";
import { useGetUserQuery } from "../features/api";
import { setCompanyId } from "../features/companySlice";
import AdminDashboard from "./dashboard/AdminDashboard";

const Home = () => {
  const dispatch = useDispatch();
  const { data: employeeData } = useGetUserQuery();

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      dispatch(setCompanyId(storedCompanyId));
    }
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="text-center text-6xl font-bold text-dark-heading-color">
        QuickPay
      </h1>

      {!employeeData?.data && <PopUp />}

      <div className="mb-2">
        <h4 className="text-xl font-bold text-dark-heading-color">
          Welcome to QuickPay
        </h4>
      </div>

      <div className="flex flex-wrap items-center justify-start">
        {/* show card */}
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Home;
