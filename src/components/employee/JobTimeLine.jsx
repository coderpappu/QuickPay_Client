import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useGetJobTimeLineQuery } from "../../features/api";
import JobTimeLineForm from "./JobTimeLineForm";

const JobTimeLine = () => {
  const [viewStatus, setViewStatus] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { id } = useParams();
  const { data: jobTimeLineDetails } = useGetJobTimeLineQuery(id);
  console.log(jobTimeLineDetails);

  const onClose = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log(isPopupOpen);
  };

  const handleEdit = () => {
    // setMode(!mode);
    setViewStatus(!viewStatus);
  };

  return (
    <div className="w-[39%] mt-3 relative p-6 bg-white dark:bg-dark-card rounded-md">
      {/* Timeline View  */}
      <ul
        className={`timeline timeline-vertical align left-[-150px] ${viewStatus ? "hidden" : "block"}`}
      >
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
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[350px] text-justify timeline-box">
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
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[350px] text-justify timeline-box">
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
          <div className="timeline-end bg-slate-50 dark:bg-dark-box border-dark-text-color border-opacity-10 rounded-md w-[350px] text-justify timeline-box">
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

      {/* edit board  */}
      <div className={`w-full  ${!viewStatus ? "hidden" : "block"}`}>
        <div className="w-[60%] mb-2 ml-6 dark:bg-dark-box p-3 rounded-md flex flex-wrap justify-between items-center">
          <div className="border-r  py-2 px-3 border-slate-500 border-dashed border-opacity-35">
            01
          </div>
          <div>
            <h2>Web Developer</h2>
            <p className="text-sm mt-1">Codex Debware</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-400 text-white rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <Link to={`/company/update/:id`}>
                <CiEdit size={20} />
              </Link>
            </div>

            {/* delete button  */}
            <div
              // onClick={() => handleDeleteCompany(company?.id)}
              className="w-8 h-8 bg-red-500 text-white text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
        <div className="w-[60%] mb-2 ml-6 dark:bg-dark-box p-3 rounded-md flex flex-wrap justify-between items-center">
          <div className="border-r  py-2 px-3 border-slate-500 border-dashed border-opacity-35">
            01
          </div>
          <div>
            <h2>Web Developer</h2>
            <p className="text-sm mt-1">Codex Debware</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-400 text-white rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <Link to={`/company/update/:id`}>
                <CiEdit size={20} />
              </Link>
            </div>

            {/* delete button  */}
            <div
              // onClick={() => handleDeleteCompany(company?.id)}
              className="w-8 h-8 bg-red-500 text-white text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>

        <div className="w-[60%] mb-2 ml-6 dark:bg-dark-box p-3 rounded-md flex flex-wrap justify-between items-center">
          <div className="border-r  py-2 px-3 border-slate-500 border-dashed border-opacity-35">
            01
          </div>
          <div>
            <h2>Web Developer</h2>
            <p className="text-sm mt-1">Codex Debware</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-400 text-white rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <Link to={`/company/update/:id`}>
                <CiEdit size={20} />
              </Link>
            </div>

            {/* delete button  */}
            <div
              // onClick={() => handleDeleteCompany(company?.id)}
              className="w-8 h-8 bg-red-500 text-white text-center flex justify-center items-center rounded-sm p-2 cursor-pointer"
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>

        <div
          className="w-8 h-8 absolute right-5 top-3 rounded-full bg-green-500 text-center flex justify-center items-center  p-2 cursor-pointer"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          // onClick={() => handleOpen()}
        >
          <Link>
            <IoAdd color="#fff" />
          </Link>
        </div>
        <div className="flex justify-end mt-7">
          <button
            className="border border-red-500 transition-all   text-sm text-red-500 hover:bg-red-500 hover:text-white px-3 py-[6px] rounded-[5px]"
            onClick={() => handleEdit()}
          >
            Cancel
          </button>
        </div>
      </div>

      {isPopupOpen && <JobTimeLineForm onClose={onClose} />}

      {!viewStatus && (
        <div
          className="absolute right-1 top-2 w-[40px] cursor-pointer h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2"
          onClick={() => handleEdit()}
        >
          <FiEdit className="text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default JobTimeLine;
