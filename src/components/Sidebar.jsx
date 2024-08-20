import { Link } from "react-router-dom";
import { useGetCompanyIdQuery } from "../features/api";
const Sidebar = () => {
  const { data: companyId } = useGetCompanyIdQuery();
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="bg-[#F0F3FF] shadow-inner text-black w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-bold">XCEED Bangladesh </h2>
          <ul className="mt-4">
            <Link to="/company/list">
              <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                Manage Company
              </li>
            </Link>

            {companyId && (
              <>
                <Link to="/company/shift/list">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Shift & Schedule
                  </li>
                </Link>
                <Link to="/department/list">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Manage Department
                  </li>
                </Link>
                <Link to="/designation/list">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Manage Designation
                  </li>
                </Link>
                <Link to="/section/list">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Manage Section
                  </li>
                </Link>

                <Link to="/employee/attendence">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Attendance
                  </li>
                </Link>
                <Link to="/employee/attendences">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Attendance List
                  </li>
                </Link>

                <Link to="/company/employee">
                  <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
                    Employees
                  </li>
                </Link>
              </>
            )}
            <li className="py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#6D28D9] cursor-pointer">
              Manage Users
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
