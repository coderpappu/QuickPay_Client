import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="bg-[#fff] w-full">
      <Header />

      <div className="lg:wrapper-container xl:w-full flex flex-wrap justify-between">
        <div className="xl:w-[15%] lg:w-[20%] ">
          <Sidebar />
        </div>

        <div className="xl:w-[85%] lg:w-[80%] lg:p-4 xl:py-5 xl:px-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
