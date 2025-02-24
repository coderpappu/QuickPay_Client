import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
      className={`w-full bg-[#EBEFF2] dark:bg-dark-bg ${darkMode && "dark"} flex h-[100%] flex-wrap justify-between lg:wrapper-container xl:w-full`}
    >
      {/* sidebar  */}
      <div className="fixed h-screen bg-[#0E1A34] lg:w-[20%] xl:w-[20%] 2xl:w-[15%]">
        <Sidebar />
      </div>

      {/* container  */}
      <div className="left-0 flex min-h-screen flex-col pl-[15%] lg:w-[80%] xl:w-[80%] 2xl:w-[100%]">
        {/* header  */}
        <Header darkModeHandler={darkModeHandler} darkMode={darkMode} />

        {/* content  */}
        <div className="flex-grow lg:p-4 xl:px-14 xl:py-5">
          <Outlet />
        </div>

        {/* footer always at the bottom */}
        <Footer className="fixed bottom-0 w-full" />
      </div>
    </div>
  );
};

export default Layout;
