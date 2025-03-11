import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateEarnLeaveMutation,
  useGetEarnLeaveQuery,
} from "../../../features/api";
const EarnLeave = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [workDay, setWorkDay] = useState(0);
  const [leaveDay, setLeaveDay] = useState(0);
  const companyId = useSelector((state) => state.company.companyId);

  const { data: earnLeaveData } = useGetEarnLeaveQuery(companyId);

  const [updateEarnLeaveData] = useCreateEarnLeaveMutation();

  const updateFormHandler = (e) => {
    e.preventDefault();
    setIsUpdate(!isUpdate);
  };

  const updateEarnLeave = (e) => {
    e.preventDefault();
    updateEarnLeaveData({
      name: "Earn Leave",
      code: "EL",
      workday: Number(workDay),
      leaveday: Number(leaveDay),
      company_id: companyId,
    });
    setIsUpdate(!isUpdate);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between pb-2">
        <div>
          <h2 className="pb-2 text-lg font-semibold dark:text-dark-heading-color">
            Earn Leave Configure{" "}
          </h2>
        </div>
      </div>

      <div className="h-auto w-full rounded-md border-[1px] border-solid border-slate-200 bg-white p-5 dark:border-none dark:bg-dark-card">
        <div className="flex w-full flex-wrap items-center justify-between rounded-sm border-b border-[#ddd] px-4 py-3 text-sm text-black dark:border-opacity-5 dark:text-white">
          <div className="w-[10%]">
            <h3>SL</h3>
          </div>
          <div className="w-[30%]">
            <h3>For Work Day</h3>
          </div>
          <div className="w-[30%]">
            <h3>Day of Earn Leave </h3>
          </div>
          <div className="w-[20%]">
            <h3>Code</h3>
          </div>

          <div className="w-[10%]">
            <h3>Actions</h3>
          </div>
        </div>

        {/* table data  */}
        <form>
          <div className="flex w-full flex-wrap items-center justify-between rounded-sm bg-[#fff] px-4 py-2 text-sm text-black dark:bg-dark-box dark:text-light-text-color">
            <div className="w-[10%]">
              <h3>01</h3>
            </div>

            <div className="w-[30%]">
              {isUpdate ? (
                <input
                  type="number"
                  value={workDay}
                  onChange={(e) => setWorkDay(e.target.value)}
                  className="w-[80%] rounded-md bg-blue-100 px-2 py-3 outline-none dark:bg-dark-card"
                />
              ) : (
                <h3>{earnLeaveData?.data?.workday || 0}</h3>
              )}
            </div>

            <div className="w-[30%]">
              {isUpdate ? (
                <input
                  type="number"
                  value={leaveDay}
                  onChange={(e) => setLeaveDay(e.target.value)}
                  className="w-[80%] rounded-md bg-blue-100 px-2 py-3 outline-none dark:bg-dark-card"
                />
              ) : (
                <h3>{earnLeaveData?.data?.leaveday || 0}</h3>
              )}
            </div>
            <div className="w-[20%]">
              <h3>{earnLeaveData?.data?.code || "EL"}</h3>
            </div>

            <div className="w-[10%]">
              {isUpdate ? (
                <button
                  className="rounded-sm bg-[#3686FF] px-4 py-2 text-white"
                  onClick={updateEarnLeave}
                >
                  Update
                </button>
              ) : (
                <button
                  className="rounded-sm bg-[#3686FF] px-4 py-2 text-white"
                  onClick={updateFormHandler}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EarnLeave;
