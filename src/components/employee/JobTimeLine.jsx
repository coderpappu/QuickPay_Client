import React from "react";

const JobTimeLine = () => {
  return (
    <div className="w-[39%] mt-3 relative p-4 bg-white dark:bg-dark-card rounded-md">
      <ul className="timeline timeline-vertical align left-[-130px]">
        <li>
          <div className="timeline-start text-dark-heading-color py-[2px] px-3 border  border-slate-500 border-opacity-35 rounded-full text-sm">
            2023-2024
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor "
              className="h-5 w-5 text-slate-300 dark:text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[300px] text-justify timeline-box">
            <h2 className="text-sm text-dark-heading-color  font-bold">
              {" "}
              Web Developer
            </h2>
            <p className="text-sm">
              Xceed Bangladesh LTD.{" "}
              <label
                htmlFor=""
                className="py-[2px] px-2 border  border-slate-500 border-opacity-35 rounded-full  text-[10px]"
              >
                Full-Time
              </label>{" "}
            </p>
            <p className="text-xs mt-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore, ipsa ipsa ipsa!
            </p>
          </div>
          <hr className="bg-slate-300 dark:bg-slate-600" />
        </li>
        <li>
          <hr className="bg-slate-300 dark:bg-slate-600" />
          <div className="timeline-start text-dark-heading-color py-[2px] px-3 border  border-slate-500 border-opacity-35 rounded-full text-sm">
            2022-2023
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor "
              className="h-5 w-5 text-slate-300 dark:text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[300px] text-justify timeline-box">
            <h2 className="text-sm text-dark-heading-color font-bold">
              {" "}
              Web Developer
            </h2>
            <p className="text-sm">
              Xceed Bangladesh LTD.{" "}
              <label
                htmlFor=""
                className="py-[2px] px-2 border  border-slate-500 border-opacity-35 rounded-full  text-[10px]"
              >
                Intern
              </label>{" "}
            </p>
            <p className="text-xs mt-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore, ipsa ipsa ipsa!
            </p>
          </div>
          <hr className="bg-slate-300 dark:bg-slate-600" />
        </li>

        <li>
          <hr className="bg-slate-300 dark:bg-slate-600" />
          <div className="timeline-start text-dark-heading-color py-[2px] px-3 border  border-slate-500 border-opacity-35 rounded-full text-sm">
            2021 - 2021
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor "
              className="h-5 w-5 text-slate-300 dark:text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[300px] text-justify timeline-box">
            <h2 className="text-sm text-dark-heading-color font-bold">
              {" "}
              Software Engineer
            </h2>
            <p className="text-sm">
              Xceed Bangladesh LTD.{" "}
              <label
                htmlFor=""
                className="py-[2px] px-2 border  border-slate-500 border-opacity-35 rounded-full  text-[10px]"
              >
                Part-Time
              </label>{" "}
            </p>
            <p className="text-xs mt-1 text-slate-400">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore, ipsa ipsa ipsa!
            </p>
          </div>
          <hr className="bg-slate-300 dark:bg-slate-600" />
        </li>
      </ul>
    </div>
  );
};

export default JobTimeLine;
