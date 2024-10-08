import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateEarnLeaveMutation,
  useGetCompanyIdQuery,
  useGetEarnLeaveQuery,
} from "../../../features/api";

const EarnLeave = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [workDay, setWorkDay] = useState(0);
  const [leaveDay, setLeaveDay] = useState(0);
  const { data: companyId } = useGetCompanyIdQuery();

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
      <div className="flex flex-wrap justify-between items-center pb-2">
        <div>
          <h2 className="font-semibold text-lg pb-2 dark:text-dark-heading-color">
            Earn Leave Configure{" "}
          </h2>
        </div>
      </div>

      <div className="border-solid border-[1px] border-slate-200 dark:border-none bg-white dark:bg-dark-card rounded-md p-5 w-full h-auto">
        <div className="w-full flex flex-wrap justify-between items-center py-3 px-4  border-b border-[#ddd] dark:border-opacity-5 text-black dark:text-white rounded-sm text-sm">
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
          <div
            className="w-full flex flex-wrap justify-between items-center py-2 px-4 bg-[#fff] dark:bg-dark-box
           text-black dark:text-light-text-color rounded-sm text-sm"
          >
            <div className="w-[10%]">
              <h3>01</h3>
            </div>

            <div className="w-[30%]">
              {isUpdate ? (
                <input
                  type="number"
                  value={workDay}
                  onChange={(e) => setWorkDay(e.target.value)}
                  className="w-[80%] bg-blue-100 dark:bg-dark-card px-2 py-3 rounded-md outline-none"
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
                  className="w-[80%] bg-blue-100 dark:bg-dark-card px-2 py-3 rounded-md outline-none"
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
                  className="px-4 py-2 bg-[#3686FF]  text-white rounded-sm "
                  onClick={updateEarnLeave}
                >
                  Update
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-[#3686FF]  text-white rounded-sm "
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
