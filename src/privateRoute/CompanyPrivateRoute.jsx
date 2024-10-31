import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetCompanyIdQuery } from "../features/api";

const CompanyPrivateRoute = () => {
  const { data: companyId, isLoading, isError } = useGetCompanyIdQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return "Loading...";
  }

  if (isError || !companyId) {
    navigate("/company/list"); // Redirect to the company list if no valid company ID
    return null; // Prevent rendering of Outlet
  }

  return <Outlet />; // Render child routes if company ID is valid
};

export default CompanyPrivateRoute;
