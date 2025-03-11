import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CompanyPrivateRoute = () => {
  const companyId = useSelector((state) => state.company.companyId);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!companyId) {
      navigate("/company/list", { state: { from: location } }); // Redirect to the company list if no valid company ID
    }
  }, [companyId, navigate, location]);

  if (!companyId) {
    return null; // Prevent rendering of Outlet
  }

  return <Outlet />; // Render child routes if company ID is valid
};

export default CompanyPrivateRoute;
