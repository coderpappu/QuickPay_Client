import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Footer from "./components/Footer";
import { useEffect } from "react";
const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode state from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    // Save dark mode state to localStorage
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  return (
    // main container
    <div
      className={`bg-[#EBEFF2] w-full dark:bg-dark-bg ${darkMode && "dark"} lg:wrapper-container xl:w-full flex flex-wrap justify-between`}
    >
      {/* sidebar  */}
      <div className="2xl:w-[15%] xl:w-[20%] lg:w-[20%] fixed h-screen bg-[#0E1A34] ">
        <Sidebar />
      </div>

      {/* container  */}
      <div className="xl:w-[80%] 2xl:w-[100%] lg:w-[80%] left-0 pl-[15%] h-screen flex flex-col">
        {/* header  */}
        <Header darkModeHandler={darkModeHandler} darkMode={darkMode} />

        {/* content  */}
        <div className="lg:p-4 xl:py-5 xl:px-14 flex-grow">
          <Outlet />
        </div>

        {/* footer always at the bottom */}
        <Footer className="fixed bottom-0 w-full" />
      </div>
    </div>
  );
};

export default Layout;
