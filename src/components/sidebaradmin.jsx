 <Link to="/company/list">
              <li
                className={`py-2 mb-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex justify-start items-center ${
                  activeMenu === "manageCompany" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("manageCompany")}
              >
                <LuListTodo size={20} className="mr-2" />
                Manage Company
              </li>
            </Link>


            
            {companyId && (
              <li
                className={`py-2 mb-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "dashboard" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("dashboard")}
              >
                <div className="w-[80%] flex justify-start items-center">
                  <AiOutlineProduct size={20} className="mr-2" />
                  Dashboard
                </div>
                <IoIosArrowForward
                  className={` transition-all ${
                    activeMenu === "dashboard" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}
            {activeMenu === "dashboard" && (
              <div className="ml-3">
                <Link to="/">
                  <li
                    className={`py-2 mb-2 px-4 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "attendance" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("attendance")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Admin Dashboard
                  </li>
                </Link>{" "}
              </div>
            )}

            {/* Attendance menu */}
            {companyId && (
              <li
                className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "attendance" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("attendance")}
              >
                <div className="w-[80%] flex justify-start items-center">
                  <GoPeople size={20} className="mr-2" />
                  Attendance
                </div>
                <IoIosArrowForward
                  className={` transition-all ${
                    activeMenu === "attendance" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}
            {activeMenu === "attendance" && (
              <div className="ml-3">
                <Link to="/employee/attendence">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "attendance" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("attendance")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Attendance
                  </li>
                </Link>
                <Link to="/employee/attendences">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "attendanceList" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("attendanceList")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Attendance List
                  </li>
                </Link>
              </div>
            )}
            {/* Company Settings menu */}
            {companyId && (
              <li
                className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "calendar" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("calendar")}
              >
                <div className="w-[90%] flex justify-start items-center">
                  <IoCalendarClearOutline size={19} className="mr-2" />
                  Calendar System
                </div>
                <IoIosArrowForward
                  className={` transition-all ${
                    activeMenu === "calendar" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}

            {activeMenu === "calendar" && (
              <div className="ml-3">
                <Link to="/company/weekend">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "weekend" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("weekend")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Weekend
                  </li>
                </Link>
                <Link to="/holiday">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "holiday" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("holiday")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Holiday
                  </li>
                </Link>

                <Link to="/company/calendar">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "calendarShow" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("calendarShow")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Calendar
                  </li>
                </Link>
              </div>
            )}

            {/* Company Settings menu */}
            {companyId && (
              <li
                className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "leaveManagement" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("leaveManagement")}
              >
                <div className="w-[80%] flex justify-start items-center">
                  <RxExit size={19} className="mr-2" />
                  Leave
                </div>
                <IoIosArrowForward
                  className={`transition-all ${
                    activeMenu === "leaveManagement" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}

            {activeMenu === "leaveManagement" && (
              <>
                <div className="ml-3">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all   cursor-pointer flex flex-wrap items-center justify-between `}
                    onClick={() => handleSubMainClick("leavesetup")}
                  >
                    Setup
                    <IoIosArrowForward
                      className={`ml-2 transition-all ${
                        activeSubMain === "leavesetup" ? "rotate-90" : ""
                      }`}
                    />
                  </li>
                  {activeSubMain === "leavesetup" && (
                    <div className="ml-2">
                      <Link to="company/leave/type">
                        <li
                          className={`py-1 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                            activeSubMenu === "leaveType" && "text-[#3686FF]"
                          }`}
                          onClick={() => handleSubMenuClick("leaveType")}
                        >
                          <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                          Leave Type
                        </li>
                      </Link>
                      <Link to="/company/leave/earnleave">
                        <li
                          className={`py-1 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                            activeSubMenu === "earnLeave" && "text-[#3686FF]"
                          }`}
                          onClick={() => handleSubMenuClick("earnLeave")}
                        >
                          <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                          Earn Leave
                        </li>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="ml-3">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all   cursor-pointer flex flex-wrap items-center justify-between `}
                    onClick={() => handleSubMainClick("leaveApplication")}
                  >
                    Leave Applicaion
                    <IoIosArrowForward
                      className={`ml-2 transition-all ${
                        activeSubMain === "leaveApplication" ? "rotate-90" : ""
                      }`}
                    />
                  </li>
                  {activeSubMain === "leaveApplication" && (
                    <div className="ml-2">
                      <Link to="company/leave/application">
                        <li
                          className={`py-1 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                            activeSubMenu === "leaveApplication" &&
                            "text-[#3686FF]"
                          }`}
                          onClick={() => handleSubMenuClick("leaveApplication")}
                        >
                          <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                          Leave Applications
                        </li>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Payroll  */}
            {companyId && (
              <li
                className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "payroll" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("payroll")}
              >
                <div className="w-[88%] flex justify-start items-center">
                  <TbMoneybag size={20} className="mr-2" />
                  PayRoll
                </div>
                <IoIosArrowForward
                  className={`ml-2 transition-all ${
                    activeMenu === "payroll" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}

            {/* Grade Menu  */}
            {activeMenu === "payroll" && (
              <div className="ml-3">
                <Link to="/company/grade">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "grade" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("grade")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Grade List
                  </li>
                </Link>
                <Link to="/company/allowance">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "allowance" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("allowance")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Allowance List
                  </li>
                </Link>
                <Link to="/company/deduction">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "deduction" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("deduction")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Deduction List
                  </li>
                </Link>

                {/* loan system  */}
                <div className="ml-3">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all   cursor-pointer flex flex-wrap items-center justify-between `}
                    onClick={() => handleSubMainClick("loansetup")}
                  >
                    Loan Management
                    <IoIosArrowForward
                      className={`ml-2 transition-all ${
                        activeSubMain === "loansetup" ? "rotate-90" : ""
                      }`}
                    />
                  </li>
                  {activeSubMain === "loansetup" && (
                    <div className="ml-2">
                      <Link to="company/loan/type">
                        <li
                          className={`py-1 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                            activeSubMenu === "loanType" && "text-[#3686FF]"
                          }`}
                          onClick={() => handleSubMenuClick("loanType")}
                        >
                          <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                          Loan Type
                        </li>
                      </Link>
                      <Link to="/company/loan/application">
                        <li
                          className={`py-1 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                            activeSubMenu === "loanApplication" &&
                            "text-[#3686FF]"
                          }`}
                          onClick={() => handleSubMenuClick("loanApplication")}
                        >
                          <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                          Loan Application
                        </li>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            {companyId && (
              <li
                className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer flex flex-wrap items-center justify-between ${
                  activeMenu === "companySettings" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("companySettings")}
              >
                <div className="w-[88%]  flex justify-start items-center">
                  <AiOutlineSetting size={20} className="mr-2" />
                  Company Settings
                </div>
                <IoIosArrowForward
                  className={`ml-2 transition-all ${
                    activeMenu === "companySettings" ? "rotate-90" : ""
                  }`}
                />
              </li>
            )}

            {activeMenu === "companySettings" && (
              <div className="ml-3">
                <Link to="/company/shift/list">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "shift" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("shift")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Schedule
                  </li>
                </Link>
                <Link to="/department/list">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "department" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("department")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Department
                  </li>
                </Link>
                <Link to="/designation/list">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "designation" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("designation")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Designation
                  </li>
                </Link>
                <Link to="/section/list">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "section" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("section")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Section
                  </li>
                </Link>

                <Link to="/company/employee">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "employees" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("employees")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Employees
                  </li>
                </Link>

                <Link to="/company/settings">
                  <li
                    className={`py-2 px-4 mb-2 rounded-[3px] transition-all hover:text-[#3686FF] cursor-pointer flex flex-wrap items-center ${
                      activeSubMenu === "setting" && "text-[#3686FF]"
                    }`}
                    onClick={() => handleSubMenuClick("setting")}
                  >
                    <div className="w-[6px] h-[6px] bg-[#3686FF] rounded-full mr-2"></div>
                    Settings
                  </li>
                </Link>
              </div>
            )}

            {/* Manage Users menu */}
            {/* <Link to="/manage/users">
              <li
                className={`py-2 px-4 rounded-[3px] transition-all hover:text-white hover:bg-[#3686FF] cursor-pointer ${
                  activeMenu === "manageUsers" && `bg-[#3686FF] text-white`
                }`}
                onClick={() => handleMenuClick("manageUsers")}
              >
                Manage Users
              </li>
            </Link> */}