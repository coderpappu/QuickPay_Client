import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteJobTimeLineMutation,
  useGetJobTimeLineQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import ListSkeleton from "../../skeletons/ListSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";
import JobTimeLineForm from "./JobTimeLineForm";

const JobTimeLine = () => {
  const [viewStatus, setViewStatus] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const { id } = useParams();

  const {
    data: jobTimeLineDetails,
    isLoading,
    isError,
    error,
  } = useGetJobTimeLineQuery(id);

  const [deleteJobTimeLine] = useDeleteJobTimeLineMutation();

  let content;
  let editContent;

  const yearPicker = (date) => {
    return new Date(date)?.getFullYear();
  };

  const handleEdit = () => {
    // setMode(!mode);
    setViewStatus(!viewStatus);
  };

  const handleEditId = (id) => {
    setEditId(id);
    setIsPopupOpen(true);
  };

  if (isLoading && !isError) return <ListSkeleton />;
  if (!isLoading && isError)
    content = (
      <div className="ml-[30%]">
        <ErrorMessage message="Job not found" />
      </div>
    );

  if (jobTimeLineDetails)
    content = jobTimeLineDetails?.data?.map((data, index) =>
      index == 0 ? (
        <li>
          <div className="timeline-start rounded-full border border-slate-500 border-opacity-35 px-3 py-[2px] text-sm text-dark-heading-color">
            {yearPicker(jobTimeLineDetails?.data?.[0]?.jobStart) +
              " - " +
              yearPicker(jobTimeLineDetails?.data?.[0]?.jobEnd)}
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
          <div className="timeline-end timeline-box w-[350px] rounded-md border-dark-text-color border-opacity-10 bg-slate-50 text-justify dark:bg-dark-box">
            <h2 className="text-sm font-bold text-dark-heading-color">
              {" "}
              {data?.jobTitle}
            </h2>
            <p className="text-sm">
              {data?.company_name + " "}
              <label
                htmlFor=""
                className="rounded-full border border-slate-500 border-opacity-35 px-2 py-[2px] text-[10px]"
              >
                {data?.jobType}
              </label>{" "}
            </p>
            <p className="mt-1 text-xs">{data?.jobDescription}</p>
          </div>
          <hr className="bg-slate-300 dark:bg-slate-600" />
        </li>
      ) : (
        <li>
          <hr className="bg-slate-300 dark:bg-slate-600" />
          <div className="timeline-start rounded-full border border-slate-500 border-opacity-35 px-3 py-[2px] text-sm text-dark-heading-color">
            {yearPicker(jobTimeLineDetails?.data?.[0]?.jobStart) +
              " - " +
              yearPicker(jobTimeLineDetails?.data?.[0]?.jobEnd)}
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
          <div className="timeline-end timeline-box w-[350px] rounded-md border-dark-text-color border-opacity-10 bg-slate-50 text-justify dark:bg-dark-box">
            <h2 className="text-sm font-bold text-dark-heading-color">
              {" "}
              {data?.jobTitle}
            </h2>
            <p className="text-sm">
              {data?.company_name + " "}
              <label
                htmlFor=""
                className="rounded-full border border-slate-500 border-opacity-35 px-2 py-[2px] text-[10px]"
              >
                {data?.jobType}
              </label>{" "}
            </p>
            <p className="mt-1 text-xs">{data?.jobDescription}</p>
          </div>
          <hr className="bg-slate-300 dark:bg-slate-600" />
        </li>
      ),
    );

  if (jobTimeLineDetails)
    editContent = jobTimeLineDetails?.data?.map((data, index) => (
      <div
        className="mb-2 ml-6 flex w-[60%] flex-wrap items-center justify-between rounded-md p-3 dark:bg-dark-box"
        key={data?.id}
      >
        <div className="border-r border-dashed border-slate-500 border-opacity-35 px-3 py-2">
          {++index}
        </div>
        <div>
          <h2>{data?.jobTitle}</h2>
          <p className="mt-1 text-sm">{data?.company_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-green-400 p-2 text-white"
            onClick={() => handleEditId(data?.id)}
          >
            <Link>
              <CiEdit size={20} />
            </Link>
          </div>

          {/* delete button  */}
          <div
            onClick={() => handleJobTimeLine(data?.id)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center text-white"
          >
            <AiOutlineDelete size={20} />
          </div>
        </div>
      </div>
    ));

  const onClose = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleJobTimeLine = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                await deleteJobTimeLine(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.msg);
                  } else {
                    toast.success("Job deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete job");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Job"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  return (
    <div className="relative mt-3 w-[39%] rounded-md bg-white p-6 dark:bg-dark-card">
      {/* Timeline View  */}
      <ul
        className={`align timeline timeline-vertical left-[-150px] ${viewStatus ? "hidden" : "block"}`}
      >
        {content}
      </ul>

      {/* edit board  */}
      <div className={`w-full ${!viewStatus ? "hidden" : "block"}`}>
        {editContent}

        <div
          className="absolute right-5 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 text-center"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          // onClick={() => handleOpen()}
        >
          <Link>
            <IoAdd color="#fff" />
          </Link>
        </div>
        <div className="mt-7 flex justify-end">
          <button
            className="rounded-[5px] border border-red-500 px-3 py-[6px] text-sm text-red-500 transition-all hover:bg-red-500 hover:text-white"
            onClick={() => handleEdit()}
          >
            Cancel
          </button>
        </div>
      </div>

      {isPopupOpen && <JobTimeLineForm onClose={onClose} jobId={editId} />}

      {!viewStatus && (
        <div
          className="absolute right-1 top-2 mr-2 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#85858512] align-middle"
          onClick={() => handleEdit()}
        >
          <FiEdit className="text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default JobTimeLine;
