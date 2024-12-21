import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetCompanyIdQuery } from "../features/api";

const CompanyPrivateRoute = () => {
  const { data: companyId, isLoading, isError } = useGetCompanyIdQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !companyId) {
        navigate("/company/list", { state: { from: location } }); // Redirect to the company list if no valid company ID
      }
    }
  }, [isLoading, isError, companyId, navigate, location]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError || !companyId) {
    return null; // Prevent rendering of Outlet
  }

  return <Outlet />; // Render child routes if company ID is valid
};

export default CompanyPrivateRoute;
