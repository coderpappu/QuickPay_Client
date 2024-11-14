import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateJobTimeLineMutation,
  useGetCompanyIdQuery,
  useGetJobTimeLineDetailsQuery,
  useUpdateJobTimelineMutation,
} from "../../features/api";
import FormSkeleton from "../../skeletons/FormSkeleton";
import { InputBox } from "../company/BrandInput";
import InputTitle from "../company/InputTitle";

const JobTimeLineForm = ({ onClose, jobId }) => {
  const id = useParams().id;

  const { data: company_id } = useGetCompanyIdQuery();
  const [createJobTimeLine] = useCreateJobTimeLineMutation();
  const [updateJobTimeLine] = useUpdateJobTimelineMutation();

  const {
    data: jobDetails,
    isLoading,
    isError,
    error,
  } = useGetJobTimeLineDetailsQuery(jobId);

  if (isLoading && !isError) return <FormSkeleton />;
  if (!isLoading && isError) return <ErrorMessage message={error?.message} />;

  const initialValues = {
    jobTitle: jobDetails?.data?.jobTitle || "",
    jobDescription: jobDetails?.data?.jobDescription || "",
    company_name: jobDetails?.data?.company_name || "",
    jobType: jobDetails?.data?.jobType || "",
    jobStart: jobDetails?.data?.jobStart || "",
    jobEnd: jobDetails?.data?.jobEnd || "",
  };

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required("Job title is required"),
    jobDescription: Yup.string().optional(),
    company_name: Yup.string().required("Company name is required"),
    jobType: Yup.string().required("Job type is required"),
    jobStart: Yup.date().required("Job start date is required"),
    jobEnd: Yup.date().required("Job end date is required"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold dark:text-dark-heading-color mb-4">
          Add Your Job
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!jobId) {
              try {
                const addTimeLine = await createJobTimeLine({
                  ...values,
                  employee_id: id,
                  company_id,
                }).unwrap();
                onClose();
                toast.success(addTimeLine?.message);
              } catch (error) {
                toast.error(error.message);
              }
            } else {
              try {
                const addTimeLine = await updateJobTimeLine({
                  ...values,
                  id: jobId,
                  employee_id: id,
                  company_id,
                }).unwrap();
                onClose();
                toast.success(addTimeLine?.message);
              } catch (error) {
                toast.error(error.message);
              }
            }
            // onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <InputTitle title="Job Title" />
                <InputBox name="jobTitle" placeholder="Software Developer" />
              </div>

              <div className="mb-4">
                <InputTitle title="Company Name" />
                <InputBox name="company_name" placeholder="Codex Devware" />
              </div>

              <div className="mb-4">
                <InputTitle title="Job Description" />
                <InputBox name="jobDescription" placeholder="" />
              </div>

              <div className="mb-4">
                <InputTitle title="Job Type" />
                <InputBox
                  name="jobType"
                  placeholder="Full Time | Part Time | Intern"
                />
              </div>
              <div className="mb-4">
                <InputTitle title="Start Date" />
                <InputBox name="jobStart" type="date" />
              </div>

              <div className="mb-4">
                <InputTitle title="End Date" />
                <InputBox name="jobEnd" type="date" />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 rounded-md text-sm font-medium text-white"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default JobTimeLineForm;
