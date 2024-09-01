import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import {
  useGetDesignationDetailsQuery,
  useUpdateDesignationMutation,
  useGetCompanyIdQuery,
  useCreateWeekendMutation,
  useGetWeekendDetailsQuery,
  useUpdateWeekendMutation,
  useCreateHolidayTypeMutation,
  useDeleteTypeMutation,
  useGetTypeListQuery,
  useCreateHolidayMutation,
} from "../../../features/api";

import FormSkeleton from "../../../skeletons/ListSkeleton";

const HolidaySchema = Yup.object().shape({
  type: Yup.string().required("Weekend Name is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
});

const HolidayForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: companyId } = useGetCompanyIdQuery();

  const [createHoliday] = useCreateHolidayMutation();
  const [updateWeekend] = useDeleteTypeMutation();

  // holiday type load from db
  const {
    data: types,
    isLoading,
    isError,
    error,
  } = useGetTypeListQuery(companyId, {
    skip: companyId == null,
  });

  const [initialValues, setInitialValues] = useState({ type: "" });

  const { data: weekend, isLoading: isDesignationLoading } =
    useGetWeekendDetailsQuery(id, { skip: !id });

  useEffect(() => {
    if (weekend?.data) {
      setInitialValues({
        type: weekend?.data?.name, // Renamed to 'type' for form consistency
      });
    }
  }, [weekend]);

  if (companyId == null) {
    navigate("/");
  }

  if (isDesignationLoading) {
    return <FormSkeleton />;
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={HolidaySchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { type, start_date, end_date, description } = values;

          if (id == null) {
            await createHoliday({
              holiday_type_id: type,
              from_date: start_date,
              to_date: end_date,
              description,
              company_id: companyId,
            })
              .then((res) => {
                if (res.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Holiday added successfully");
                  navigate("/holiday");
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                toast.error(error);
              });
          } else {
            await updateWeekend({
              id,
              type,
              company_id: companyId,
              start_date,
              end_date,
              description,
            })
              .then((res) => {
                if (res?.error != null) {
                  toast.error(res?.error?.data?.message);
                } else {
                  toast.success("Weekend updated successfully");
                  navigate("/designation/list");
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                toast.error(error);
              });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-lg">
            <div className=" ">
              <div className="flex-grow">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Holiday Type
                </label>
                <Field
                  as="select"
                  name="type"
                  id="type"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

              <div className="flex-grow">
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
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <Field
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex-none mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HolidayForm;
