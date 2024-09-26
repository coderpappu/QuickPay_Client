import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`bg-[#fff] w-full dark:bg-[#1F1F1F] ${darkMode && "dark"}`}>
      <div className="lg:wrapper-container xl:w-full flex flex-wrap justify-between">
        <div className="2xl:w-[15%] xl:w-[20%] lg:w-[20%] ">
          <Sidebar />
        </div>

        <div className="xl:w-[80%] 2xl:w-[85%] lg:w-[80%]">
          <Header />
          <div className="lg:p-4 xl:py-5 xl:px-14 bg-[#EBEFF2] dark:bg-[#1F1F1F] h-screen">
            <Outlet />
          </div>
        </div>

        <button onClick={() => darkModeHandler()}>Mode Changed</button>
      </div>
    </div>
  );
};

export default Layout;
