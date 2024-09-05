import React, { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TbDots } from "react-icons/tb";
import { HiOutlinePlusSm } from "react-icons/hi";
import LeaveForm from "./LeaveForm";

const Leave = () => {
  const [progressValue, setProgressValue] = useState(10);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const onClose = () => {
    console.log(isPopupOpen);
    setIsPopupOpen(false);
  };

  console.log(isPopupOpen);

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2">Leave Management</h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 bg-white rounded-md p-5 w-full h-[250px]">
        <div>
          <h2 className="font-semibold">Leaves</h2>
        </div>
        <div className="w-full h-[100px]  mt-2 flex flex-wrap justify-around ">
          <div className="w-[100px] h-[100px] text-center">
            <CircularProgressbar
              value={progressValue}
              text={`${progressValue}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#4CCD99",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>30 / 100 </h2>
            </div>
          </div>

          <div className="w-[100px] h-[100px] text-center">
            <CircularProgressbar
              value={progressValue}
              text={`${progressValue}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#7695FF",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>30 / 100 </h2>
            </div>
          </div>
          <div className="w-[100px] h-[100px] text-center">
            <CircularProgressbar
              value={progressValue}
              text={`${progressValue}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#FF3838",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>30 / 100 </h2>
            </div>
          </div>
          <div className="w-[100px] h-[100px] text-center">
            <CircularProgressbar
              value={progressValue}
              text={`${progressValue}%`}
              strokeWidth={11}
              styles={buildStyles({
                textColor: "red",
                pathColor: "#FFD23F",
                trailColor: "#F2F5FF",
                strokeLinecap: "round",
              })}
            />
            <div className="mt-2">
              <h2>Sick Leave</h2>
              <h2>30 / 100 </h2>
            </div>
          </div>
          <div className="w-[200px] h-[150px] bg-[#F2F5FF] p-2 rounded-md">
            <h1>Other Leaves</h1>
          </div>
        </div>
      </div>
      <div className="border-solid border-[1px] mt-3 border-slate-200 bg-white rounded-md p-5 w-full h-[250px]">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>All Leave Request</div>

          <button
            className="px-3 py-2 bg-[#6D28D9] text-white flex justify-between items-center rounded-md"
            onClick={() => setIsPopupOpen(true)}
          >
            {" "}
            <HiOutlinePlusSm className="mr-1" /> Apply Leave
          </button>
        </div>
        <table className="w-full h-auto">
          {/* {!isError && ( */}
          <thead className="border-b border-slate-200 text-left mt-8">
            <tr>
              <th className="pb-2 text-base ">Leave Type</th>
              <th className="pb-2 text-base ">From</th>
              <th className="pb-2 text-base ">To</th>
              <th className="pb-2 text-base ">Days</th>
              <th className="pb-2 text-base ">Reason</th>
              <th className="pb-2 text-base ">Approved By</th>
              <th className="pb-2 text-base ">Status</th>
              <th className="pb-2 text-base ">Action</th>
            </tr>
          </thead>
          {/* )} */}
          <tbody>
            <tr
              // key={employee?.id}
              className={" rounded-sm"}
            >
              <td className="py-2 text-sm ">Casual Leave</td>

              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                16/03/2006
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                16/03/2007
              </td>
              <td className="py-2 text-sm">{/* {employee?.name} */}2</td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Fever
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Manager
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Approved
              </td>
              <td className="py-2 text-sm text-center">
                <TbDots />
              </td>
            </tr>

            <tr
              // key={employee?.id}
              className={"bg-gray-50 rounded-sm"}
            >
              <td className="py-2 text-sm ">Sick Leave</td>

              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                16/03/2006
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                16/03/2007
              </td>
              <td className="py-2 text-sm">{/* {employee?.name} */}2</td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Fever
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Manager
              </td>
              <td className="py-2 text-sm ">
                {/* {employee?.name} */}
                Approved
              </td>
              <td className="py-2 text-sm text-center">
                <TbDots />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                Add Holiday Type
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)} // Close popup
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <LeaveForm onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
