import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateHolidayTypeMutation,
  useDeleteTypeMutation,
  useGetWeekendDetailsQuery,
} from "../../../../features/api";
import FormSkeleton from "../../../../skeletons/FormSkeleton";

const WeekendSchema = Yup.object().shape({
  type: Yup.string().required("Weekend Name is required"),
});

const TypeForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [createHolidayType] = useCreateHolidayTypeMutation();
  const [updateWeekend] = useDeleteTypeMutation();
  const [initialValues, setInitialValues] = useState({ type: "" });

  const { data: weekend, isLoading: isDesignationLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        name: weekend?.data?.name,
      });
    }
  }, [weekend]);

  const companyId = useSelector((state) => state.company.companyId);

  if (companyId == null) {
    navigate("/");
  }

  if (isDesignationLoading) {
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
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Holiday Type
        </h2>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={WeekendSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { type } = values;
            if (id == null) {
              await createHolidayType({ type, company_id: companyId })
                .then((res) => {
                  if (res.error != null) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Holiday Type added successfully");
                    navigate("/holiday");
                    setSubmitting(false);
                    onClose(); // Close the popup after submission
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            } else {
              await updateWeekend({ id, name, company_id: companyId, status })
                .then((res) => {
                  if (res?.error != null) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Holiday Type updated successfully");
                    navigate("/designation/list");
                    setSubmitting(false);
                    onClose(); // Close the popup after submission
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  Type
                </label>
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
                />
                <ErrorMessage
                  name="type"
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

export default TypeForm;
