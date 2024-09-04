import { Outlet, useNavigate } from "react-router-dom";
import {
  useGetEmployeeDetailsQuery,
  useGetEmployeeQuery,
  useGetUserQuery,
} from "../features/api";
import HomeSkeleton from "../skeletons/HomeSkeleton";
// Corrected import name
const PrivateRoute = () => {
  const { data, isLoading, isSuccess, isError } = useGetUserQuery();
  const { data: employeeData } = useGetEmployeeQuery();

  const navigate = useNavigate();

  let content = null;
  if (isLoading) content = <HomeSkeleton />;
  if (isError) content = navigate("/login");
  if (isSuccess && !isError && data) content = <Outlet />;

  return <>{content}</>;
};

export default PrivateRoute;
