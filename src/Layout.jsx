import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="bg-[#F7F7F7] w-full">
      <Header />

      <div className="wrapper-container flex flex-wrap justify-between">
        <div className="w-[20%] bg-slate-200">
          <Sidebar />
        </div>

        <div className="w-[80%] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
