 <Link to="/company/calendar">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center  ${
                  activeMenu === "calendar" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("calendar")}
              >
                <RxCalendar size={20} className="mr-1" />
                Company Calendar
              </li>
            </Link>
            <Link to="#">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                  activeMenu === "Attendance" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("Attendance")}
              >
                <BiCheckShield className="mr-1" size={21} />
                Attendance
              </li>
            </Link>
            <Link to="/employee/leave">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                  activeMenu === "Apply" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("Apply")}
              >
                <BsBoxArrowInUpRight size={18} className="mr-1" />
                Leave
              </li>
            </Link>
            <Link to="/employee/details">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                  activeMenu === "profile" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("profile")}
              >
                Profile
              </li>
            </Link>

            {/* {activeMenu === "calendar" && (
                <div className="ml-3">
                  
                    <li
                      className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                        activeSubMenu === "calendarShow" && "text-[#3686FF]"
                      }`}
                      onClick={() => handleSubMenuClick("calendarShow")}
                    >
                      <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                      Calendar
                    </li>
                  </Link>
                </div>
              )} */}

            {/* <Link to="/employee/details">
                <li
                  className={`py-2 px-4 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                    activeSubMenu === "employees" && "text-[#3686FF]"
                  }`}
                  onClick={() => handleSubMenuClick("employees")}
                >
                  <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                  Employees
                </li>
              </Link> */}