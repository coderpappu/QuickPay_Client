import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  useGetTypeListQuery,
  useCreateHolidayMutation,
  useUpdateWeekendMutation,
  useGetWeekendDetailsQuery,
  useGetCompanyIdQuery,
} from "../../features/api";
import FormSkeleton from "../../skeletons/FormSkeleton";

const HolidaySchema = Yup.object().shape({
  type: Yup.string().required("Holiday Type is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  reason: Yup.string().required("Reason is required"),
});

const LeaveForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();
  const [createHoliday] = useCreateHolidayMutation();
  const [updateWeekend] = useUpdateWeekendMutation();

  const {
    data: types,
    isLoading,
    isError,
  } = useGetTypeListQuery(companyId, {
    skip: !companyId,
  });

  const [initialValues, setInitialValues] = useState({
    type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const { data: weekend, isLoading: isWeekendLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        name: weekend?.data?.name,
        type: weekend?.data?.holiday_type_id,
        start_date: weekend?.data?.start_date || "",
        end_date: weekend?.data?.end_date || "",
        description: weekend?.data?.description || "",
      });
    }
  }, [weekend]);

  if (companyId == null) {
    navigate("/");
  }

  if (isWeekendLoading || isLoading) {
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
          {id ? "Edit Holiday" : "Add Holiday"}
        </h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={HolidaySchema}
          onSubmit={async (values, { setSubmitting }) => {
            const { name, type, start_date, end_date, description } = values;

            try {
              if (!id) {
                await createHoliday({
                  name,
                  holiday_type_id: type,
                  from_date: start_date,
                  to_date: end_date,
                  description,
                  company_id: companyId,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Holiday added successfully");
                    navigate("/holiday");
                    onClose();
                  }
                });
              } else {
                await updateWeekend({
                  id,
                  type,
                  company_id: companyId,
                  start_date,
                  end_date,
                  description,
                }).then((res) => {
                  if (res.error) {
                    toast.error(res?.error?.data?.message);
                  } else {
                    toast.success("Holiday updated successfully");
                    navigate("/holiday");
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
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                >
                  <option value="">Select Type</option>
                  {types?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <Field
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <Field
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6D28D9] focus:border-[#6D28D9] sm:text-sm"
                />
                <ErrorMessage
                  name="description"
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
                  {id ? "Update" : "Apply"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveForm;