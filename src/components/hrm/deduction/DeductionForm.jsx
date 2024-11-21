import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateDeductionTypeMutation,
  useGetCompanyIdQuery,
  useGetDeductionTypeDetailsQuery,
  useGetTypeListQuery,
  useUpdateDeductionTypeMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/FormSkeleton";
import { InputBox } from "../../company/BrandInput";
const deductionTypeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const DeductionTypeForm = ({ typeId, onClose }) => {
  const navigate = useNavigate();

  const { data: companyId } = useGetCompanyIdQuery();
  const [createDeductionType] = useCreateDeductionTypeMutation();
  const [updateDeductionType] = useUpdateDeductionTypeMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  const { data: deductionDetails, isLoading: isWeekendLoading } =
    useGetDeductionTypeDetailsQuery(typeId, { skip: !typeId });

  useEffect(() => {
    if (deductionDetails?.data) {
      setInitialValues({
        name: deductionDetails?.data?.name,
      });
    }
  }, [deductionDetails]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold  dark:text-dark-heading-color mb-4">
          {typeId ? "Edit Deduction" : "Add Deduction"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={deductionTypeSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name } = values;
            try {
              if (!typeId) {
                await createDeductionType({
                  name,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Deduction added successfully");
                    navigate("/company/allowance");
                    onClose();
                  }
                });
              } else {
                await updateDeductionType({
                  id: typeId,
                  name,

                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Deduction updated successfully");
                    navigate("/company/allowance");
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-800 border border-dark-border-color dark:border-opacity-10 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3686FF] rounded-md text-sm font-medium text-white "
                >
                  {typeId ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeductionTypeForm;
