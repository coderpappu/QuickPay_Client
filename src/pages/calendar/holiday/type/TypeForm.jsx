import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
    useCreateHolidayTypeMutation,
    useDeleteTypeMutation,
    useGetCompanyIdQuery,
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

  const { data: companyId } = useGetCompanyIdQuery();

  if (companyId == null) {
    navigate("/");
  }

  if (isDesignationLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <Field
                  type="text"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#6D28D9] rounded-md text-sm font-medium text-white hover:bg-[#5A21B3]"
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
