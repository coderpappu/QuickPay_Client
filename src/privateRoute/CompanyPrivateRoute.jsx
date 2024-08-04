import { Outlet, useNavigate } from "react-router-dom";
import { useGetCompanyIdQuery } from "../features/api";

const CompanyPrivateRoute = () => {
    const { data: companyId, isLoading, isSuccess, isError } = useGetCompanyIdQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return "Loading...";
    }

    if (isError) {
        navigate("/company/list");
        return null; // or loading indicator if needed
    }

    if (isSuccess && companyId) {
        return <Outlet />;
    }

    // Handle any other cases (e.g., success but no companyId)
    return null; // or redirect or loading indicator
};

export default CompanyPrivateRoute;
