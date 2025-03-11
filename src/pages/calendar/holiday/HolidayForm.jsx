import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateHolidayMutation,
  useGetTypeListQuery,
  useUpdateWeekendMutation,
} from "../../../features/api";

const HolidaySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Holiday Type is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
});

const HolidayFormPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const companyId = useSelector((state) => state.company.companyId);
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
    name: "",
    type: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  if (companyId == null) {
    navigate("/");
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
                  htmlFor="name"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  Holiday Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
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
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  Start Date
                </label>
                <Field
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  End Date
                </label>
                <Field
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-dark-text-color"
                >
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="dark:text-dark-text-colo h-10 w-full rounded-md border border-dark-box border-opacity-5 px-2 py-1 text-sm focus:border focus:border-button-bg focus:outline-none dark:bg-dark-box"
                />
                <ErrorMessage
                  name="description"
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

export default HolidayFormPopup;
