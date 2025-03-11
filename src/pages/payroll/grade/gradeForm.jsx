import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateGradeMutation,
  useGetGradeDetailsQuery,
  useGetTypeListQuery,
  useUpdateGradeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";

const LeaveTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  basic_salary: Yup.number().required("Basic Salary is required"),
  overtime_rate: Yup.number().required("Over Time is required"),
});

const GradeForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const companyId = useSelector((state) => state.company.companyId);
  const [createGrade] = useCreateGradeMutation();
  const [updateGrade] = useUpdateGradeMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    basic_salary: "",
    overtime_rate: "",
  });

  const { data: gradeDetails, isLoading: isWeekendLoading } =
    useGetGradeDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (gradeDetails?.data) {
      setInitialValues({
        name: gradeDetails?.data?.name,
        basic_salary: gradeDetails?.data?.basic_salary,
        overtime_rate: gradeDetails?.data?.overtime_rate,
      });
    }
  }, [gradeDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {id ? "Edit Grade" : "Add Grade"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={LeaveTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, basic_salary, overtime_rate } = values;

            try {
              if (!id) {
                await createGrade({
                  name,
                  basic_salary,
                  overtime_rate,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Grade added successfully");
                    navigate("/company/grade");
                    onClose();
                  }
                });
              } else {
                await updateGrade({
                  id,
                  name,
                  basic_salary,
                  overtime_rate,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Grade updated successfully");
                    navigate("/company/grade");
                    onClose();
                  }
                });
              }
            } catch (error) {
              toast.error("An error occurred while submitting the form.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="basic_salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Salary
                </label>
                <Field
                  type="number"
                  name="basic_salary"
                  id="basic_salary"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="basic_salary"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="overtime_rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Over Time Rate
                </label>
                <Field
                  type="number"
                  name="overtime_rate"
                  id="overtime_rate"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#3686FF] focus:outline-none focus:ring-[#3686FF] sm:text-sm"
                />
                <ErrorMessage
                  name="overtime_rate"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5A21B3]"
                >
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GradeForm;
