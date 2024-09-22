import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="bg-[#fff] w-full">
      <div className="lg:wrapper-container xl:w-full flex flex-wrap justify-between">
        <div className="2xl:w-[15%] xl:w-[20%] lg:w-[20%] ">
          <Sidebar />
        </div>

        <div className="xl:w-[80%] 2xl:w-[85%] lg:w-[80%]">
          <Header />
          <div className="lg:p-4 xl:py-5 xl:px-14 bg-[#EBEFF2] h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
