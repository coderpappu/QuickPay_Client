import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateGradeMutation,
  useGetCompanyIdQuery,
  useGetGradeDetailsQuery,
  useUpdateGradeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";

const gradeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  basic_salary: Yup.string().required("Basic salary is required"),
  overtime_rate: Yup.number().required("Overtime rate is required"),
});

const GradeForm = ({ gradeId, onClose }) => {
  const navigate = useNavigate();

  const { data: companyId } = useGetCompanyIdQuery();
  const [createGrade] = useCreateGradeMutation();
  const [updateGrade] = useUpdateGradeMutation();

  const [initialValues, setInitialValues] = useState({
    name: "",
    basic_salary: "",
    overtime_rate: "",
  });

  const { data: gradeDetails, isLoading: gradeLoading } =
    useGetGradeDetailsQuery(gradeId, { skip: !gradeId });

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

  if (gradeLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-dark-card">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="mb-4 text-xl font-semibold dark:text-dark-heading-color">
          {gradeId ? "Edit Grade" : "Add Grade"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={gradeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, basic_salary, overtime_rate } = values;

            try {
              if (!gradeId) {
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

                    onClose();
                  }
                });
              } else {
                await updateGrade({
                  id: gradeId,
                  name,
                  basic_salary,
                  overtime_rate,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Grade updated successfully");
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
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Name
                </label>

                <InputBox name="name" type="text" placeholder="Name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="basic_salary"
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Basic Salary
                </label>

                <InputBox
                  name="basic_salary"
                  type="number"
                  placeholder="Basic Salary"
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
                  className="block text-sm font-medium dark:text-dark-text-color"
                >
                  Over Rate
                </label>

                <InputBox
                  name="overtime_rate"
                  type="number"
                  placeholder="Basic Percentage"
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
                  className="mr-4 rounded-md border border-dark-border-color bg-white px-4 py-2 text-sm font-medium text-gray-800 dark:border-opacity-10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-[#3686FF] px-4 py-2 text-sm font-medium text-white"
                >
                  {gradeId ? "Update" : "Add"}
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
